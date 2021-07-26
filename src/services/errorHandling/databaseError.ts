import { DatabaseError } from "pg";

import logger from "../../utilities/logger";

enum DbCodes {
  uniqueViolation = 23505,
}

export default function databaseError(err: DatabaseError) {
  switch (parseInt(err.code as string)) {
      
    case DbCodes.uniqueViolation:
      logger.info(err);
      return 409;

    default:
      logger.error(err);
      return 500;
  }
}
