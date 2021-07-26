import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import * as sessionRepository from "../repositories/sessionRepository";
import { Session } from "../types/sessionTypes";
import { jwtConfigs, secret } from "../config/jwt";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  try {
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
}

export async function checkExpired(sessions: Session[] | []) {
  sessions.filter((session) => {
    try {
      jwt.verify(session.token, secret);
      return true;
    } catch {
      sessionRepository.remove(session.id);
      return false;
    }
  });
  return sessions;
}

export function create(userId: number, name: string) {
  return jwt.sign({ userId, name }, secret, jwtConfigs);
}
