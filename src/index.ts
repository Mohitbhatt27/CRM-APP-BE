import express, { Express, Request, Response, Application } from "express";
import cors from "cors";

const app: Application = express();
app.use(cors());

import { PORT } from "./config/server_config";

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
