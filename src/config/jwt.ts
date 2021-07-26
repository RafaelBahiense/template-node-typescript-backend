import { Secret } from "jsonwebtoken";

export const secret: Secret = process.env.JWT_SECRET as string;
export const jwtConfigs = { expiresIn: 60 * 60 * 24 * 30 };