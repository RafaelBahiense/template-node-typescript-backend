import { QueryResult } from "pg";
import { connectionDB } from "../config/database";

export async function register(
  name: string,
  email: string,
  hash: string
): Promise<void> {
  await connectionDB.query(
    `INSERT INTO users (name,email,hash) 
      VALUES ($1,$2,$3)`,
    [name, email, hash]
  );
}

export async function getByEmail(email: string): Promise<QueryResult<any>> {
  return await connectionDB.query(
    `SELECT * FROM users 
    WHERE email = $1`,
    [email]
  );
}
