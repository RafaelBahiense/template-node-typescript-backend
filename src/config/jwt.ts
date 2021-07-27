import dayjs from "dayjs";

import { Secret } from "jsonwebtoken";
import * as error from "../types/errorTypes";
import configError from "../services/errorHandling/configError";

interface Expiration {
  months: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

let getSecret: Secret | undefined = undefined;
let getJwtConfigs: object | undefined = undefined ;

try {
  getSecret = process.env.JWT_SECRET as string;
  if (!getSecret) throw error.jwtConfig.secretError();

  const { months, days, hours, minutes, seconds }: Expiration = JSON.parse(
    process.env.JWT_EXPIRATION as string
  ) as Expiration;
  if (!(months && days && hours && minutes && seconds)) throw error.jwtConfig.expirationError();

  getJwtConfigs = { expiresIn: dayjs(`1970-${months}-${days}T${hours}:${minutes}:${seconds}`).unix() }
} catch (e) {
    configError(e);
}

export const secret = getSecret as Secret;
export const jwtConfigs = getJwtConfigs;
