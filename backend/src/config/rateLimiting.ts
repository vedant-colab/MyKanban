import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
    windowMs : 10 * 60 * 1000,
    max : 100,
    standardHeaders : true,
    legacyHeaders : false,
    message : "Too many requests from this ip, please try again after some time.",
    keyGenerator: (req) => {
        return req.ip || req.headers["x-forwarded-for"]?.toString() || "unknown-ip";
      },
})