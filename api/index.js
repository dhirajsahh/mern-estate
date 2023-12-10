import express from "express";
import connectdb from "./config/connectdb.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
connectdb();
app.listen(3000, () => {
  console.log("app is running in port 3000!!");
});
