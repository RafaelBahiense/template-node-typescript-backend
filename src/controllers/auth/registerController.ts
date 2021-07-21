import { NextFunction, Request, response, Response } from "express";

import * as registerServices from "../../services/auth/registerServices";

export default async function register(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) return res.sendStatus(400);

    const sucess = await registerServices.register(name, email, password);
    if (sucess) res.sendStatus(201);
    else res.sendStatus(409);
    
  } catch (e) {
    next(e);
  }
}
