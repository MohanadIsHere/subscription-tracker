import { SALT_ROUNDS } from "../config/env.js";
import User from "../database/models/user.model.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({
      message: "User Retrieved Successfully",
      data: { user },
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({
      message: "Users Retrieved Successfully",
      data: { users },
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
export const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { user } = req.user;
    const isPasswordMatch = await bcrypt.compare(password, req.user.password);
    if (isPasswordMatch) {
      const error = new Error("Password cannot be the same as the old one");
      error.statusCode = 409;
      throw error;
    }
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
    await User.updateOne({ _id: user._id }, { password: hashedPassword });
    return res
      .status(200)
      .json({ message: "Password updated successfully", success: true });
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const { user } = req.user;
    await User.deleteOne({ _id: user._id });
    return res.status({
      message: "User deleted successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
