import bcrypt from "bcrypt";

import { Login } from "../../schemas/login";
import repositories from "../../repositories/repositories";
import * as auth from "../../utilities/authentication";
import CustomError from "../errorHandling/customError";

export async function login(email: string, password: string) {
  await Login.validateAsync({ email, password });

  const user = await repositories.user.getByEmail(email);
  if (!user) throw CustomError.notExistent();
  const { hash, id: userId, name } = user;

  if (!bcrypt.compareSync(password, hash)) throw CustomError.wrongPassword();

  const sessions = await auth.checkExpired(await repositories.session.get(userId));

  if (sessions.length > 0) {
    const { token } = sessions[0];
    return { userId, name, token };
  }

  const token = auth.create(userId, name);
  await repositories.session.register(userId, token);
  return { userId, name, token };
}
