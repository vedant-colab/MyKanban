import express from "express";
import { AppError } from "../utils/appError";
import logger from "../config/logger";

export function errorHandler(
    err: AppError | Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
) {
    let statusCode = 500;
    let message = "something went wrong";

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    logger.error(`[${statusCode}] ${err.message}`);
    res.status(statusCode).json({success : false, message})
}
