import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import { Login } from "../../schemas/login";
import { LoginUser, AuthUser } from "../../interfaces/userInterfaces";
import User from "../../entities/User";
import Sessions from "../../entities/Sessions";
import * as auth from "../../middlewares/authentication";
import * as error from "../../types/errorTypes";

export async function login({ email, password }: LoginUser) {
  await Login.validateAsync({ email, password });

  const user = await getRepository(User).findOne({ email });
  if (!user) throw error.service.notExistent();

  const { hash, id: userId, name } = user;
  if (!bcrypt.compareSync(password, hash)) throw error.service.wrongPassword();

  const token = auth.create(userId, email);
  await getRepository(Sessions).insert({ userId, token });

  return { userId, name, token };
}
