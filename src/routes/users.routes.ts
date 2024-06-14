import { Router } from "express";
import { container } from "tsyringe";
import { UsersServices } from "../services";
import { IsEmailAlready, ValidateRequest, VerifyToken } from "../middlewares";
import { createUserSchema, userLogin, updateUserSchema } from "../schemas";
import { UsersControllers } from "../controllers";

export const userRouter = Router();

container.registerSingleton("UsersServices", UsersServices);
const userController = container.resolve(UsersControllers);

userRouter.post("/register", ValidateRequest.execute({ body: createUserSchema }), IsEmailAlready.execute, (req, res) => userController.register (req, res));

userRouter.patch("/update/:id", ValidateRequest.execute({ body: updateUserSchema }), VerifyToken.execute, (req, res) => userController.update (req, res));

userRouter.post("/login", ValidateRequest.execute({ body: userLogin }), (req, res) => userController.login (req, res));

userRouter.get("/profile", VerifyToken.execute, (req, res) => userController.getUser (req, res));

userRouter.get("/purchased-courses", VerifyToken.execute, (req, res) => userController.getPurchasedCourses(req, res));