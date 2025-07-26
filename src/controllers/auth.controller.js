import User from "../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET, SALT_ROUNDS } from "../config/env.js";
export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "name,email and password are required fields",
      });
    }
    const salt = bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = bcrypt.hashSync(password, salt);
    if (await User.findOne({ email })) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user,
        token,
      },
    });
  } catch (err) {
   
    next(err);
  }
};
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      const error = new Error("email and password are required fields");
      error.statusCode = 400;
      throw error;
    }
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    return res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
