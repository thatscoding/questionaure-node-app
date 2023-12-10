import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db.js";
import errorMiddleware from "../api/middlewares/error.js";
import QuestionRouter from "../api/routes/question.route.js";

dotenv.config();

const server = express();
const DB_URL = process.env.DB_URL;

server.use(cors());
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

connectDB(DB_URL);

server.get("/", (req, res) => {
  res.send("Welcome to Questionuire 💐");
});

// routes
server.use("/v1/question", QuestionRouter);

server.use(errorMiddleware);

export default server;
