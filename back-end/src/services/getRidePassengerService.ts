import pool from "../database.js";

export async function getPassengersRideService(rideId: number) {
  //selecionar da tabela onde o ride id for igual ao id
  const query = `
    SELECT
      rp.id,
      rp.ride_id,
      rp.user_id,
      rp.status,
      u.nome
      
    FROM ride_passengers rp

    JOIN users u
    ON u.id = rp.user_id

    WHERE rp.ride_id = $1
  `;

  const result = await pool.query(query, [rideId]);

  return result.rows;
}
