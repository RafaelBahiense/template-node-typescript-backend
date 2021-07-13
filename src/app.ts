import express, { Application } from "express";
import cors from "cors";

import { MainRouter } from "./routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api", MainRouter);

export default app;
