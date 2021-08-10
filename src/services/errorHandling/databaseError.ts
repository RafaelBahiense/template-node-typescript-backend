import { DatabaseError } from "pg";

import logger from "../../utilities/logger";

enum DbCodes {
  uniqueViolation = 23505,
  foreignKeyViolation = 23503,
}

export default function databaseError(err: DatabaseError) {
  switch (parseInt(err.code as string)) {
    case DbCodes.foreignKeyViolation:
      logger.info(err);
      return 404;

    case DbCodes.uniqueViolation:
      logger.info(err);
      return 409;

    default:
      logger.error(err);
      return 500;
  }
}
