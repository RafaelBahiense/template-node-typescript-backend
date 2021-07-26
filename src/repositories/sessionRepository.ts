import { QueryResult } from "pg";
import { connectionDB } from "../config/database";
import { Session } from "../types/sessionTypes";

export async function get(userId: number): Promise<Session[] | []> {
  return (await connectionDB.query(
    `SELECT * 
        FROM sessions  
        WHERE "userId" = $1`,
    [userId]
  )).rows;
}

export async function register(
  userId: number,
  token: string
): Promise<Session[]> {
  return (await connectionDB.query(
    `INSERT INTO sessions ("userId", token) 
        VALUES ($1,$2) RETURNING *`,
    [userId, token]
  )).rows;
}

export async function remove(sessionId: number) {
  await connectionDB.query(
    `DELETE
    FROM sessions
    WHERE id = $1`,
    [sessionId]
  )
}
