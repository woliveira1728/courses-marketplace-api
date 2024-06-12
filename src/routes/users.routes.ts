import { Router } from "express";
import { container } from "tsyringe";
import { UsersServices } from "../services";
import { IsEmailAlready, ValidateRequest, VerifyToken } from "../middlewares";
import { createUserSchema, userLogin } from "../schemas";
import { UsersControllers } from "../controllers";


export const userRouter = Router();

container.registerSingleton("UsersServices", UsersServices);
const userController = container.resolve(UsersControllers);

userRouter.post("/", ValidateRequest.execute({ body: createUserSchema }), IsEmailAlready.execute, (req, res) => userController.register (req, res));