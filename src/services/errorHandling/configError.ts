import { ConfigError } from "../../types/errorTypes";
import logger from "../../utilities/logger";

export default function configError(err: ConfigError) {
  logger.error(err);
  process.exit(1);
}
