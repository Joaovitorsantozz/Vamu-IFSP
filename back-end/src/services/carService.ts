import pool from "../database.js";
export async function registerCarInformationService(
  userId: number,
  carModel: string,
  placa: string,
  cor: string,
) {
  const sql = `
    INSERT INTO user_cars (user_id, modelo, placa, cor)
    VALUES ($1,$2,$3,$4)
    ON CONFLICT (user_id)
    DO UPDATE SET
      modelo = EXCLUDED.modelo,
      placa = EXCLUDED.placa,
      cor = EXCLUDED.cor
    RETURNING *
  `;
  const values = [userId,carModel, placa, cor];
  const result = await pool.query(sql, values);
  return result.rows[0];
}

export async function getCarInformationService(userId:number){
    const sql = "SELECT * FROM user_cars WHERE user_id=$1";
    const { rows } = await pool.query(sql, [userId]);
    if(rows.length === 0){
      return null;
    }
    return rows[0];
}