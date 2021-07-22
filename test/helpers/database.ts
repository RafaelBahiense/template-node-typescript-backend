import bcrypt from "bcrypt";

import { connectionDB } from "../../src/config/database";
import { RegisterUser } from "../factories/user";

export async function addUser(): Promise<void> {
  const { name, email, password } = new RegisterUser({});
  const hash = bcrypt.hashSync(password as string, 12);
  await connectionDB.query(
    `INSERT INTO users (name, email, hash) 
        VALUES ($1, $2, $3)`,
    [name, email, hash]
  );
}

export async function truncateTable(table: string): Promise<void> {
  await connectionDB.query(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`);
}

export function endConnection(): void {
  connectionDB.end();
}
