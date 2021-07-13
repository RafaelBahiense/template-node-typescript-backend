import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";
import { DatabaseError } from "pg";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err)
  if (err instanceof ValidationError) joiError(err, res);
  if (err instanceof DatabaseError) pgError(err, res);
  else return res.sendStatus(500);
}

function joiError(err: ValidationError, res: Response) {
  switch (err.details[0].type) {
    case "string.empty":
    case "string.min":
    case "string.max":
    case "string.length":
    case "string.base":
    case "string.email":
    case "number.min":
    case "number.base":
    case "any.required":
      res.status(400).send(err.details.map((details) => details.message));
      break;
    default:
      res.status(500).send(err.details.map((details) => details.message));
      break;
  }
}

function pgError(err: DatabaseError, res: Response) {
  console.log("pg error");
}
