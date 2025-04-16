import { Router } from "express";
import { signup } from "../controllers/auth.controller";
import { SignupSchema } from "../schemas/auth.schema";
import { validate } from "../middlewares/validate";

const authRoutes = Router();

authRoutes.post("/signup", validate(SignupSchema), signup);

export default authRoutes;
