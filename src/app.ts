import express, { Application } from "express";
import cors from "cors";

import { MainRouter } from "./routes/mainRouter";
import errorHandler from "./controllers/error/errorController";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api", MainRouter);
app.use(errorHandler);

export default app;
