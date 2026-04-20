import pool from "../database.js";

export async function registerPassengerRace(
  userId: number,
  raceId: number,
  status: string,
) {
  const query = `INSERT INTO ride_passengers (ride_id,user_id,status) VALUES ($1,$2,$3)`;
  const values = [raceId, userId, status];
  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (error) {
    console.log("Erro ao cadastrar passageiro na corrida", error);
  }
}

export async function findPassengerInRace(raceId: number, userid: number) {
  const query = `SELECT * FROM ride_passengers WHERE ride_id=$1 AND user_id=$2`;
  const values = [raceId, userid];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log("Erro ao buscar passageiro na corrida", error);
  }
}

export async function howManyInRace(rideId: number) {
  const query = `
    SELECT COUNT(*) 
    FROM ride_passengers
    WHERE ride_id = $1
    AND status = 'accepted'
  `;

  const result = await pool.query(query, [rideId]);

  return Number(result.rows[0].count);
}
