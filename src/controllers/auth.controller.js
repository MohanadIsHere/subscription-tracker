import User from "../database/models/user.model.js";

import { JWT_EXPIRES_IN, JWT_SECRET, SALT_ROUNDS } from "../config/env.js";
import { compare, hash } from "../utils/hashing/hashing.js";
import { generateToken } from "../utils/token/token.js";
export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};

    const hashedPassword = await hash({
      plainText: password,
      saltRounds: Number(SALT_ROUNDS),
    });
    if (await User.findOne({ email })) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken({
      payload: { userId: user._id },
      secret: JWT_SECRET,
      options: { expiresIn: JWT_EXPIRES_IN },
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

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const isPasswordValid = await compare({
      plainText: password,
      hashed: user.password,
    });
    if (!isPasswordValid) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    const token = generateToken({
      payload: { userId: user._id },
      secret: JWT_SECRET,
      options: { expiresIn: JWT_EXPIRES_IN },
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
