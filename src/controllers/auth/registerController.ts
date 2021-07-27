import { NextFunction, Request, Response } from "express";

import * as registerServices from "../../services/auth/registerServices";
import { RegisterUser } from "../../types/userTypes";

export default async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, email, password }: RegisterUser = req.body;
    if (!(name && email && password)) return res.sendStatus(400);

    await registerServices.register(name, email, password);
    res.sendStatus(201);
    
  } catch (e) {
    next(e);
  }
}
