import bcrypt from "bcrypt";
import { Request } from "express";

import { Register } from "../../schemas/register";
import * as userRepository from "../../repositories/userRepository";

export async function register(
  name: string,
  email: string,
  password: string
): Promise<Boolean> {
  
  await Register.validateAsync({ name, email, password });
  const result = await userRepository.getByEmail(email);
  if (result.rowCount > 0) return false;

  const hash = bcrypt.hashSync(password, 12);
  await userRepository.register(name, email, hash);
  return true;
}
