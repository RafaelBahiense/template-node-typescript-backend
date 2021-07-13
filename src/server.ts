import "./config/env";
import app from "./app";

const { NODE_ENV, PORT } = process.env;
const dev: string = NODE_ENV === "development" ? " on Dev mode" : "";

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT + dev}`);
});
