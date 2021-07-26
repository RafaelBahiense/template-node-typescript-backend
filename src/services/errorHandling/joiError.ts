import { ValidationError } from "joi";

import logger from "../../utilities/logger";

export default function joiError(err: ValidationError) {
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
      logger.info(err);
      return 400;
    default:
      logger.error(err);
      return 500;
  }
}
