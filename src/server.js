import express, { urlencoded } from "express";
import { initRoutes } from "./routes/index.js";
const app = express();

app.use(urlencoded({ extended: true }));

initRoutes(app);

const port = 48080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
