import { NextFunction, Request, Response } from "express";

import * as loginServices from "../../services/auth/loginServices";
import { LoginUser } from "../../interfaces/userInterfaces";

export default async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password }: LoginUser = req.body;
    if (!(email && password)) return res.sendStatus(400);

    const token = await loginServices.login({ email, password });
    res.status(200).send({ token });

  } catch (e) {
    next(e);
  }
}
