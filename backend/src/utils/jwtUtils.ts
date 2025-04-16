import jwt from "jsonwebtoken";

export const signToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN!,
    issuer : process.env.JWT_ISSUER!
  } as jwt.SignOptions);
};