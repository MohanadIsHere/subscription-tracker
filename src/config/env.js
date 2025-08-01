import dotenv from "dotenv";

dotenv.config({ path: "./.env.dev" });

export const {
  PORT,
  DB_URI,
  NODE_ENV,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  ARCJET_KEY,
  ARCJET_ENV,
  SALT_ROUNDS,
} = process.env;
