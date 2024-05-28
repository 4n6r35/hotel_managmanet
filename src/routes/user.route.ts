import { Router } from "express";
import { AuthController, RegisterUserController } from "../controller";


export const userRouter = Router();

userRouter.post('/register', RegisterUserController)

userRouter.post('/auth', AuthController)