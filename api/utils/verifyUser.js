import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return next(errorHandler(401, "You need to login"));
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return next(errorHandler(403, "Forbidden"));
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).json("Error occured during verifying token");
  }
};
