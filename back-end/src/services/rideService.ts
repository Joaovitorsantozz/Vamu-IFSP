import pool from "../database.js";
export async function offerRide(
  userId: number,
  ownerName: String,
  carModel: String,
  carSign: String,
  carColor: String,
  boarding: String,
  destination: String,
  boardingTime: Date
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
      boarding_time
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *; -- Isso retorna a carona recém-criada, incluindo o ID gerado
  `;

  const values = [
    userId,
    ownerName,
    carModel,
    carSign,
    carColor,
    boarding,
    destination,
    boardingTime
  ];

  try {
    const res = await pool.query(query, values);
    return res.rows[0]; 
  } catch (err) {
    console.error("Erro ao inserir carona:", err);
    throw new Error("Erro ao registrar a carona no banco de dados.");
  }
}
