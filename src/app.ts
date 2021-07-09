import express, { Application } from "express";
import cors from "cors";

import { MainRouter } from "./routes";
import { setEnv } from "./config/env";

setEnv();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api", MainRouter);

export default app;
