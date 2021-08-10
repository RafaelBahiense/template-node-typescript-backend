import bcrypt from "bcrypt";
import { getRepository } from "typeorm";

import { RegisterUser } from "../../interfaces/userInterfaces";
import { Register } from "../../schemas/register";
import User from "../../entities/User";

export async function register({ name, email, password }: RegisterUser) {
  await Register.validateAsync({ name, email, password });

  const hash = bcrypt.hashSync(password, 12);
  await getRepository(User).insert({ name, email, hash });
}
