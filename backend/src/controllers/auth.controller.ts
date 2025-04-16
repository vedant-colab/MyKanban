import type { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";

export const signup = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Simulate saving user
  res.status(201).json({
    success: true,
    message: `User ${name} registered successfully!`,
  });
});
