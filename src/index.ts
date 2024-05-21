import express, { Express, Request, Response, Application } from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app: Application = express();
app.use(cors());

import { PORT } from "./config/server_config";
import { log } from "console";

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, async () => {
  console.log("Server started on port 3000");
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "X9Xp7@example.com",
      password: "123456",
    },
  });

  console.log(user);
});
