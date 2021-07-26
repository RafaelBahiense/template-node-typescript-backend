import bcrypt from "bcrypt";

import { Register } from "../../schemas/register";
import repositories from "../../repositories/repositories";

export async function register(name: string, email: string, password: string) {
  await Register.validateAsync({ name, email, password });
  const hash = bcrypt.hashSync(password, 12);
  await repositories.user.register(name, email, hash);
}
