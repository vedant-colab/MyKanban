import jwt from "jsonwebtoken";

export const signToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
    issuer : "kanban-personalized"
  });
};