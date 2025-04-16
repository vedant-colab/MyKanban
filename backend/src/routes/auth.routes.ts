import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller";
import { signinSchema, signupSchema } from "../schemas/auth.schema";
import { validate } from "../middlewares/validate";

const authRoutes = Router();

authRoutes.post("/signup", validate(signupSchema), signup);
authRoutes.post("/signin", validate(signinSchema), signin);

export default authRoutes;
