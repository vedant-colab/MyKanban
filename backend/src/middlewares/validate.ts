import { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from 'express';
import { AppError } from "../utils/appError";

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next()
    } catch(err : any){
        const message = err.errors?.[0]?.message || "Invalid input"
        next(new AppError(message, 400))
    }

}