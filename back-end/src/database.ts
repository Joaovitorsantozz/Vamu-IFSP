import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

export default pool;
