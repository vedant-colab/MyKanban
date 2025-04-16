import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new AppError("Not authorized", 401))
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return next(new AppError("User not found", 404));
        }
        (req as any).user = user;
        next()
    } catch (error: any) {
        return next(new AppError("Invalid or expired token", 401));
    }
}