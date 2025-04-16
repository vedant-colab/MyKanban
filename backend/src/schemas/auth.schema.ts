import { password } from "bun";
import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignupInput = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
    email : z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

export type SigninInput = z.infer<typeof signinSchema>;