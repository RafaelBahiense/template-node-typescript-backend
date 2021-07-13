import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi"

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {

    if (err instanceof ValidationError)
        joiError(err, res);
    else
        return res.sendStatus(500);
}

function joiError(err: ValidationError, res: Response) {
    console.log(err.details[0].type)
    switch (err.details[0].type) {
        case "string.empty":
        case "string.min":
        case "string.max":
        case "string.length":
        case "string.base":
        case "string.email":
        case "number.min":
        case "number.base":
          res.status(400).send(err.details[0].message);
          break;
        default:
          res.status(500).send(err.details[0].message);
          break;
      }
}