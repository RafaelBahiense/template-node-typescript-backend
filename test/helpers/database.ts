import { connectionDB } from "../../src/config/database";

export async function addUser(): Promise<void> {
  await connectionDB.query(
    `INSERT INTO users (name, email, hash) 
        VALUES ('Jest', 'jest@jest.br','$2b$12$4iSzSqv3Cb8KsewVXCfyyu5BZOzEq2CaDh2eTHni75z/ZLvT7suuC')`
  );
}

export async function truncateTable(table: string): Promise<void> {
  await connectionDB.query(`TRUNCATE TABLE ${table} RESTART IDENTITY`);
}

export function endConnection(): void {
  connectionDB.end();
}
