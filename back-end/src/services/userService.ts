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
export async function registerAboutUserService(
  idade: number | null,
  curso: string | null,
  semestre: number | null,
  telefone: string | null,
  localidade: string | null,
  descricao: string | null,
  id: number,
) {
  const sql = `
    UPDATE users
    SET age = COALESCE($1, age),
        course = COALESCE($2, course),
        semester = COALESCE($3, semester),
        phone_number = COALESCE($4, phone_number),
        city = COALESCE($5, city),
        description = COALESCE($6, description)
    WHERE id = $7
    RETURNING *
  `;

  const values = [idade, curso, semestre, telefone, localidade, descricao, id];

  const result = await pool.query(sql, values);

  return result.rows[0];
}


export async function getUserSerivce(userId:number){
  const sql = "SELECT * FROM users WHERE id=$1";
  const { rows } = await pool.query(sql, [userId]);
  return rows[0];
}