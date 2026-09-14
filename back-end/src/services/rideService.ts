import pool from "../database.js";
export async function offerRide(
  userId: number,
  ownerName: String,
  carModel: String,
  carSign: String,
  carColor: String,
  boarding: String,
  destination: String,
  boardingTime: Date,
  cityDestination: String, // 9º parâmetro
  cityBoarding: String, // 10º parâmetro
) {
  const query = `
    INSERT INTO offered_rides (
      user_id, 
      owner_name, 
      car_model, 
      car_sign, 
      car_color, 
      boarding, 
      destination, 
      boarding_time,
      available_seats,
      city_destination,
      city_boarding
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *; 
  `;

  const values = [
    userId,
    ownerName,
    carModel,
    carSign,
    carColor,
    boarding,
    destination,
    boardingTime,
    4,
    cityDestination,
    cityBoarding,
  ];

  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error("Erro ao inserir carona:", err);
    throw err;
  }
}

export async function getRideById(rideId: Number) {
  const query = `
    SELECT 
      r.*,
      COALESCE(
        COUNT(p.id) FILTER (WHERE LOWER(p.status) = 'accepted'), 
        0
      )::INT AS passengers_count
    FROM offered_rides r
    LEFT JOIN ride_passengers p ON p.ride_id = r.id
    WHERE r.id = $1
    GROUP BY r.id;
  `;
  try {
    const result = await pool.query(query, [rideId]);
    return result.rows[0];
  } catch (error) {
    console.error("Erro ao buscar carona:", error);
    throw new Error("Erro ao buscar a carona no banco de dados.");
  }
}

export async function getActiveRacesService(userid: number) {
  const query = `SELECT 
  r.id,
  r.user_id,
  r.boarding,
  r.destination,
  r.boarding_time,
  r.is_active,
  r.available_seats,
  'MOTORISTA' AS role,
  'accepted' AS passenger_status, -- O motorista sempre tem status confirmado
  COUNT(p_count.id) FILTER (WHERE p_count.status = 'accepted') AS passenger_count,
  r.city_destination,
  r.city_boarding 
FROM offered_rides r 
LEFT JOIN ride_passengers p_count ON p_count.ride_id = r.id
WHERE r.user_id = $1 AND r.is_active = true
GROUP BY r.id

UNION ALL

SELECT 
  r.id,
  r.user_id,
  r.boarding,
  r.destination,
  r.boarding_time,
  r.is_active,
  r.available_seats,
  'PASSAGEIRO' AS role,
  p.status AS passenger_status, -- Retorna 'pending', 'accepted' ou 'rejected'
  COUNT(p_count.id) FILTER (WHERE p_count.status = 'accepted') AS passenger_count,
  r.city_destination,
  r.city_boarding
FROM ride_passengers p 
JOIN offered_rides r ON r.id = p.ride_id
LEFT JOIN ride_passengers p_count ON p_count.ride_id = r.id
WHERE p.user_id = $1 
  AND p.status IN ('pending', 'accepted') -- Mostra pendentes e aceitos (descarta rejeitados se quiser)
  AND r.is_active = true
GROUP BY r.id, p.status;
  `;

  const result = await pool.query(query, [userid]);
  return result.rows;
}

export async function deleteRaceService(params: {
  rideId: number;
  userId: number;
}) {
  const { rideId, userId } = params;

  const query = `DELETE FROM offered_rides WHERE id=$1 AND user_id=$2`;
  return await pool.query(query, [rideId, userId]);
}

export async function updateRaceStatusService(
  status: string,
  ride_id: number,
  user_id: number,
) {
  console.log("status service", status);
  console.log("ride", ride_id);
  console.log("userid", user_id);
  const query = `UPDATE ride_passengers SET status = $1 WHERE user_id = $2 AND ride_id = $3;`;
  const result = await pool.query(query, [status, user_id, ride_id]);
  console.log(result.rowCount);
  return result.rows[0];
}
interface FilteredSearch {
  boarding?: string;
  destination?: string;
  date?: string;
  timeFilter?: string | string[];
}

interface TimeRange {
  start: string;
  end: string;
}

const TIME_MAP: Record<string, TimeRange> = {
  morning: { start: "06:00:00", end: "11:59:59" },
  afternoon: { start: "12:00:00", end: "17:59:59" },
  night: { start: "18:00:00", end: "23:59:59" },
};

export async function resultRidesServices(
  filter: FilteredSearch,
  passengerId?: number,
) {
  const { destination, boarding, date, timeFilter } = filter;

  const rawTimes =
    typeof timeFilter === "string"
      ? timeFilter.split(",").map((t) => t.trim())
      : Array.isArray(timeFilter)
        ? timeFilter
        : [];

  const selectedRanges: TimeRange[] = rawTimes
    .map((period) => TIME_MAP[period])
    .filter(Boolean);

  const cleanBoarding =
    boarding && boarding.trim() !== "" ? boarding.trim() : null;
  const cleanDestination =
    destination && destination.trim() !== "" ? destination.trim() : null;
  const cleanDate = date && date.trim() !== "" ? date.trim() : null;

  const values: any[] = [
    cleanBoarding,
    cleanDestination,
    passengerId ?? null,
    cleanDate,
  ];

  let timeClause = "TRUE";

  if (selectedRanges.length > 0) {
    const conditions = selectedRanges.map((range) => {
      values.push(range.start, range.end);
      const startIdx = values.length - 1;
      const endIdx = values.length;
      return `(r.boarding_time::time BETWEEN $${startIdx} AND $${endIdx})`;
    });

    timeClause = `(${conditions.join(" OR ")})`;
  }

  const query = `
    SELECT 
      r.id, 
      r.owner_name, 
      r.car_sign, 
      r.boarding, 
      r.destination, 
      r.city_boarding, 
      r.city_destination, 
      r.boarding_time, 
      r.available_seats
    FROM offered_rides r 
    WHERE r.is_active = true 
      AND r.available_seats > 0
      AND ($1::text IS NULL OR r.city_boarding ILIKE '%' || $1 || '%') 
      AND ($2::text IS NULL OR r.city_destination ILIKE '%' || $2 || '%')
      AND ($3::int IS NULL OR r.id NOT IN (
        SELECT ride_id 
        FROM ride_passengers 
        WHERE user_id = $3
      ))
      AND ($4::date IS NULL OR r.boarding_time::date = $4::date)
      AND ${timeClause}
    ORDER BY r.boarding_time ASC;
  `;

  const result = await pool.query(query, values);
  return result.rows;
}
