import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import Listing from "../models/listing.model.js";
export const test = async (req, res, next) => {
  return res.status(200).json({
    message: "api is working",
  });
};
export const updateUser = async (req, res, next) => {
  if (req.user.id != req.params.id) {
    return next(errorHandler(401, "You can update only your account"));
  }
  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    updatedUser.password = undefined;
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.user.id != req.params.id) {
    return next(errorHandler(401, "You can delete only your account"));
  }
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token").status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

export const listing = async (req, res, next) => {
  try {
    if (req.user.id == req.params.id) {
      const getlisting = await Listing.find({ useRef: req.user.id });
      return res.status(200).json(getlisting);
    }
    return next(errorHandler(401, "You can only view your own listing"));
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found"));
    user.password = undefined;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
