import bcrypt from "bcrypt";
import { Request, Response } from "express";

import { connectionDB } from "../../config/database";
import { Register } from "../../schemas/register";

export default async function register(req: Request, res: Response) {
  try {
    await Register.validateAsync(req.body);

    const { name, email, password } = req.body;
    const result = await connectionDB.query(
      `SELECT * FROM users 
      WHERE email = $1`,
      [email]
    );
    if (result.rowCount > 0) return res.sendStatus(409);

    const hash = bcrypt.hashSync(password, 12);
    await connectionDB.query(
      `INSERT INTO users (name,email,hash) 
      VALUES ($1,$2,$3)`,
      [name, email, hash]
    );
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
