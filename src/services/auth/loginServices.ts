import bcrypt from "bcrypt";

import { Login } from "../../schemas/login";
import repositories from "../../repositories/repositories";
import * as auth from "../../utilities/authentication";
import * as error from "../../types/errorTypes";

export async function login(email: string, password: string) {
  await Login.validateAsync({ email, password });

  const user = await repositories.user.getByEmail(email);
  if (!user) throw error.service.notExistent();
  const { hash, id: userId, name } = user;

  if (!bcrypt.compareSync(password, hash)) throw error.service.wrongPassword();

  const sessions = await auth.checkExpired(await repositories.session.get(userId));

  if (sessions.length > 0) {
    const { token } = sessions[0];
    return { userId, name, token };
  }

  const token = auth.create(userId, name);
  await repositories.session.register(userId, token);
  return { userId, name, token };
}
