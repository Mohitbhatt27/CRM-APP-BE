import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app: Application = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import CONFIG from "./config/server_config";
import apiRouter from "./routes";
import { isLoggedIn } from "./middlewares/auth_middleware";
import mailsender from "./config/email_config";

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", isLoggedIn, (req: Request, res: Response) => {
  console.log(req.user);
  res.send("Hello World!");
});

app.use("/api", apiRouter);

app.listen(CONFIG.PORT, async () => {
  console.log(`Server started on port ${CONFIG.PORT}`);
  try {
    const response = await mailsender.sendMail({
      from: CONFIG.GMAIL_EMAIL,
      to: "mohit.peak@gmail.com",
      subject: "Is the service running?",
      text: "Yes, it is running",
    });

    console.log(response);
  } catch (error) {
    console.log(error);
  }
});
