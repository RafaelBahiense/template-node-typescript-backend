import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";
import { DatabaseError } from "pg";

import logger from "../../utilities/logger";
import joiError from "../../services/errorHandling/joiError";
import databaseError from "../../services/errorHandling/databaseError";
import configError from "../../services/errorHandling/configError";
import serviceError from "../../services/errorHandling/serviceError";
import * as error from "../../types/errorTypes";

export default function errorHandler(
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
) {
  let statusCode: number;

  if (err instanceof SyntaxError) statusCode = 400;
  else if (err instanceof ValidationError) statusCode = joiError(err);
  else if (err instanceof error.ServiceError) statusCode = serviceError(err);
  else if (err instanceof DatabaseError) statusCode = databaseError(err as any);
  else {
    logger.error(err);
    statusCode = 500;
  }

  if (err instanceof error.ConfigError) {
    res.sendStatus(statusCode);
    configError(err);
  }

  return res.sendStatus(statusCode);
}

export function jsonError(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response<number> | undefined {
  if (err instanceof SyntaxError) {
    return res.sendStatus(400);
  } else {
    next();
  }
}
