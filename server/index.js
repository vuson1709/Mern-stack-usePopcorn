import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import { UserRouter } from "./routes/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const corsOptions = {
  origin: "http://localhost:3006",
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/auth", UserRouter);

mongoose.connect("mongodb://127.0.0.1:27017/authentication");

app.listen(process.env.PORT, () => {
  console.log("Sever is Running");
});
