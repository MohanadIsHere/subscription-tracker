import bcrypt from "bcrypt";
export const hash = async ({ plainText, saltRounds } = {}) => {
  return await bcrypt.hash(plainText, saltRounds);
}
export const compare = async ({ plainText, hashed } = {}) => {
  return await bcrypt.compare(plainText, hashed);
}