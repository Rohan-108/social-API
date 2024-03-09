import express, { Application } from "express";
import http from "http";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import connectDB from "./db/connect";
import userRouter from "./routes/userRouter";
import postRouter from "./routes/postRouter";
import { UserType } from "db/user/users";

declare global {
  namespace Express {
    interface Request {
      user: UserType;
    }
  }
}

const app: Application = express();
dotenv.config();
app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: "1mb" }));
app.use("/api/v1/post", postRouter);
app.use("/api/v1/user", userRouter);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(5000, () =>
      console.log("server started at http://localhost:5000")
    );
  } catch (error) {
    console.log(error.message);
  }
};
startServer();
