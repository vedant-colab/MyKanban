import type { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import { signupSchema } from "../schemas/auth.schema";
import User from "../models/user.model";
import { AppError } from "../utils/appError";
import { signToken } from "../utils/jwtUtils";

export const signup = catchAsync(async (req: Request, res: Response, next : NextFunction) => {
   const {name, email, password} = req.body;
   
   const existingUser = await User.findOne({email});
   if(existingUser){
    return next(new AppError("User already exists", 400));
   }

   const newUser = await User.create({name, email, password})
   const token = signToken(newUser._id as string);
   res.status(201).json({
    status: "success",
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
});

export const signin = catchAsync(async (req: Request, res: Response, next : NextFunction) => {
    const {email, password} = req.body;

    const existingUser = await User.findOne({email})
    if(!existingUser){
        return next(new AppError("User doesn't exist", 400))
    } 

    console.log(password)
    const isMatch = await existingUser.comparePassword(password);
    if(!isMatch){
        return next(new AppError("Incorrect password", 401))
    }

    const token = signToken(existingUser._id as string);
    res.status(200).json({
        status: "success",
        token,
        user: {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
        },
      });

})
