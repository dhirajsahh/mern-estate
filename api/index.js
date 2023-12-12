import express from "express";
import connectdb from "./config/connectdb.js";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
connectdb();

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.listen(3000, () => {
  console.log("app is running in port 3000!!");
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Eerver Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
