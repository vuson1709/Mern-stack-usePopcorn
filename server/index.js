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

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
);

app.listen(process.env.PORT || 4000, () => {
  console.log("Sever is Running");
});
