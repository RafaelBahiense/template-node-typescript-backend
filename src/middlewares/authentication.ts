import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { jwtConfigs, secret } from "../config/jwt";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    res.locals.user = user
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
}

export function create(userId: number, name: string) {
  return jwt.sign({ userId, name }, secret, jwtConfigs);
}
