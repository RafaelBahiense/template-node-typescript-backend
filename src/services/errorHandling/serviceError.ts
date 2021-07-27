import { ServiceError } from "../../types/errorTypes";
import logger from "../../utilities/logger";

enum ServiceCodes {
  notExistent,
  wrongPassword,
}

export default function databaseError(err: ServiceError) {
  switch (err.code) {
    case ServiceCodes.notExistent:
      logger.info(err);
      return 409;

    case ServiceCodes.wrongPassword:
      logger.info(err);
      return 401;

    default:
      logger.error(err);
      return 500;
  }
}
