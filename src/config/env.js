import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const {
  PORT,
  DB_URI,
  NODE_ENV,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  ARCJET_KEY,
  ARCJET_ENV,
  SALT_ROUNDS,
} = process.env;
