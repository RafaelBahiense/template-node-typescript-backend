import { NextFunction, Request, Response } from "express";

import * as loginServices from "../../services/auth/loginServices";

export default async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    if (!(email && password)) return res.sendStatus(400);

    const login = await loginServices.login(email, password);

    if (login) res.status(200).send(login);
    if (login === undefined) res.sendStatus(404);
    else res.sendStatus(401);

  } catch (e) {
    next(e);
  }
}
