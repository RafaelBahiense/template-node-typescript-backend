import path from "path";
import dotenv from "dotenv";

export function setEnv(): void {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === "development" || NODE_ENV === "test") {
    const envPath: string = NODE_ENV === "test" ? ".env.test.local" : ".env";
    dotenv.config({ path: path.resolve(".", envPath) });
  }
}