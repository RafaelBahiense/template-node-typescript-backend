import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

import { connectionDB } from "../../config/database";
import { Login } from "../../schemas/login";

export default async function login(req: Request, res: Response, next: NextFunction) {
  try {
    await Login.validateAsync(req.body);

    const { email, password } = req.body;
    const auth = await connectionDB.query(
      `SELECT hash, id, name FROM users 
      WHERE email = $1`,
      [email]
    );
    if (auth.rowCount === 0) return res.sendStatus(404);

    const { hash, id: userId, name } = auth.rows[0];
    if (email && bcrypt.compareSync(password, hash)) {
      let session = await connectionDB.query(
        `SELECT sessions.token, users.email 
        FROM sessions JOIN users ON sessions."userId" = users.id 
        WHERE users.email = $1`,
        [email]
      );
      if (session?.rowCount === 0) {
        const secret: Secret = process.env.JWT_SECRET as string;
        const configs = { expiresIn: 60 * 60 * 24 * 30 };
        const token = jwt.sign({ userId, name }, secret, configs);
        await connectionDB.query(
          `INSERT INTO sessions ("userId", token) 
          VALUES ($1,$2)`,
          [userId, token]
        );
        session = await connectionDB.query(
          `SELECT sessions.token, users.email, users.id 
          FROM sessions JOIN users ON sessions."userId" = users.id 
          WHERE users.email = $1`,
          [email]
        );
      }
      res
        .status(200)
        .send({
          token: session.rows[0].token,
          name: auth.rows[0].name,
          id: auth.rows[0].id,
        });
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    next(e);
  }
}
