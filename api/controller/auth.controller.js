import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All field are required",
    });
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Incorrect Password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    validUser.password = undefined;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(validUser);
  } catch (error) {
    console.log(error);
  }
};
