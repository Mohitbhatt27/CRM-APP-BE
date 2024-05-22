import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app: Application = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import { PORT } from "./config/server_config";
import apiRouter from "./routes";

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api", apiRouter);

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
});
