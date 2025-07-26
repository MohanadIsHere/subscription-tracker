import User from "../database/models/user.model.js";
import {  SALT_ROUNDS } from "../config/env.js";
import { hash, compare } from "../utils/hashing/hashing.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/token/token.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};

    if (await User.findOne({ email })) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await hash({
      plainText: password,
      saltRounds: Number(SALT_ROUNDS),
    });

    const user = await User.create({ name, email, password: hashedPassword });

    const payload = { userId: user._id };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: true,
      // sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
   

    

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user,
        accessToken,
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

    const isValid = await compare({
      plainText: password,
      hashed: user.password,
    });
    if (!isValid) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const payload = { userId: user._id };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: true,
      // sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        accessToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const refreshAccessToken = (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);

    const payload = verifyRefreshToken(token);
    const accessToken = generateAccessToken({ userId: payload._id });

    return res.status(200).json({
      success: true,
      message: "Access token refreshed",
      data: {
        accessToken,
      },
    });
  } catch (err) {
    return res.sendStatus(403);
  }
};

export const logoutUser = (req, res, next) => {
  res.clearCookie("refreshToken");
  return res.status(204).end();
};
