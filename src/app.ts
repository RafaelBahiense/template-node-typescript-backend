import express, { Application } from "express";
import cors from "cors";
import "reflect-metadata";

import { MainRouter } from "./routes/mainRouter";
import errorHandler, { jsonError } from "./controllers/error/errorController";
import connectDatabase from "./config/database";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(jsonError);
app.use("/api", MainRouter);
app.use(errorHandler);

export async function init() {
  await connectDatabase();
}

export default app;
