import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

import UserRoute from "./routes/UserRoute.js";

const PORT = 3001;

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(UserRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB is connected!");
  })
  .catch((e) => {
    console.log("MongoDB Connection is failed", e);
  });

app.listen(PORT).on("listening", () => {
  console.log("Backend server is running!");
});
