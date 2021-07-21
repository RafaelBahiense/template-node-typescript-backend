import { QueryResult } from "pg";
import { connectionDB } from "../config/database";

export async function get(userId: string): Promise<QueryResult<any>> {
  return await connectionDB.query(
    `SELECT * 
        FROM sessions  
        WHERE "userId" = $1`,
    [userId]
  );
}

export async function register(
  userId: number,
  token: string
): Promise<QueryResult<any>> {
  return await connectionDB.query(
    `INSERT INTO sessions ("userId", token) 
        VALUES ($1,$2) RETURNING *`,
    [userId, token]
  );
}
