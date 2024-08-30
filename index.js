import express from "express";
import mongoose from "mongoose";
import path, { dirname } from "path";
import courseRoutes from "./routes/coursesRoute.js";
import userRoutes from "./routes/userRoutes.js";
import authUser from "./routes/authUser.js";
import dotenv from "dotenv";
import cors from "cors";
import { ERROR } from "./utils/httpStatusText.js";
import { fileURLToPath } from "url";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(dirname(fileURLToPath(import.meta.url)), "uploads")));

const url = process.env.DB_URI;

app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authUser);

app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: ERROR,
    message: "This Resource Not Available",
    statusCode: 404,
    data: null,
  });
});

app.use((error, req, res, next) => {
  res.status(500).json({
    status: ERROR,
    message: error.message,
    statusCode: error.statusCode,
    data: null,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Port ${process.env.PORT}`);
  mongoose.connect(url).then(() => {
    console.log("MongoDB Connecting Done");
  });
});
