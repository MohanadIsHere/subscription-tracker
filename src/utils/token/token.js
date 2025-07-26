import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
} from "../../config/env.js";

export const generateToken = ({ payload, secret, options } = {}) => {
  return jwt.sign(payload, secret, options);
};

export const verifyToken = ({ token, secret } = {}) => {
  return jwt.verify(token, secret);
};

// access token
export const generateAccessToken = (payload) =>
  generateToken({
    payload,
    secret: ACCESS_TOKEN_SECRET,
    options: { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
  });

export const verifyAccessToken = (token) =>
  verifyToken({ token, secret: ACCESS_TOKEN_SECRET });

// refresh token
export const generateRefreshToken = (payload) =>
  generateToken({
    payload,
    secret: REFRESH_TOKEN_SECRET,
    options: { expiresIn: REFRESH_TOKEN_EXPIRES_IN },
  });

export const verifyRefreshToken = (token) =>
  verifyToken({ token, secret: REFRESH_TOKEN_SECRET });
