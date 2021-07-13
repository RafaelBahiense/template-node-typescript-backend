import express, { Application } from "express";
import cors from "cors";

import { MainRouter } from "./routes";
import errorHandler from "./utilities/errorHandler";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api", MainRouter);
app.use(errorHandler);

export default app;
