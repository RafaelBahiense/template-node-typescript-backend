import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

import { Login } from "../../schemas/login";
import * as userRepository from "../../repositories/userRepository";
import * as sessionRepository from "../../repositories/sessionRepository";
import { QueryResult } from "pg";

export async function login(email: string, password: string) {
  await Login.validateAsync({ email, password });

  const auth = await userRepository.getByEmail(email);
  if (auth.rowCount === 0) return undefined;
  const { hash, id: userId, name } = auth.rows[0];

  if (!bcrypt.compareSync(password, hash)) return null;

  let session = await sessionRepository.get(userId);

  if (session.rowCount === 0) {
    const secret: Secret = process.env.JWT_SECRET as string;
    const configs = { expiresIn: 60 * 60 * 24 * 30 };
    const token = jwt.sign({ userId, name }, secret, configs);
    session = await sessionRepository.register(userId, token);
  }

  const { token } = session.rows[0];
  return { userId, name, token };
}
