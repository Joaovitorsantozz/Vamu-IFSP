import pool from "../database.js";
export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  const sql = "SELECT * FROM users WHERE email=$1";
  const { rows } = await pool.query(sql, [email]);
  if (rows.length > 0) {
    return null;
  }
  const sql2 =
    "INSERT INTO users (nome,email,senha) VALUES ($1,$2,$3) RETURNING *";

  const result = await pool.query(sql2, [name, email, password]);
  return result.rows[0];
}

export async function loginUser(email: string) {
  try {
    const sql = "SELECT * FROM users WHERE email=$1";
    const { rows } = await pool.query(sql, [email]);
    return rows;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
