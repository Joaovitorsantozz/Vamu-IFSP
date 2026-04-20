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
      available_seats
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9)
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
    "4",
  ];

  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error("Erro ao inserir carona:", err);
    throw new Error("Erro ao registrar a carona no banco de dados.");
  }
}

export async function getRideById(rideId: Number) {
  const query = `SELECT * FROM offered_rides WHERE id=$1`;
  try {
    const result = await pool.query(query, [rideId]);
    return result.rows[0];
  } catch (error) {
    console.error("Erro ao buscar carona:", error);
    throw new Error("Erro ao buscar a carona no banco de dados.");
  }
}

export async function getDriverRaceInformationsService(userid: number) {
  const query = `SELECT 
    r.id,
    r.boarding,
    r.destination,
    r.boarding_time,
    r.is_active,
    r.available_seats,
    COUNT(p.id) FILTER (WHERE p.status = 'accepted') AS passengers_count
  FROM offered_rides r
  LEFT JOIN ride_passengers p ON p.ride_id = r.id
  WHERE r.user_id = $1
  AND r.is_active = true
  GROUP BY r.id;`;
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
