import { Router } from "express";
import { container } from "tsyringe";
import { CoursesServices } from "../services";
import { IsCorseAlready, ValidateRequest, VerifyIsSeller, VerifyToken } from "../middlewares";
import { createCourseSchema, updateCourseSchema, userLogin } from "../schemas";
import { CoursesControllers } from "../controllers";


export const courseRouter = Router();

container.registerSingleton("CoursesServices", CoursesServices);
const courseController = container.resolve(CoursesControllers);

courseRouter.get("/", (req, res) => courseController.getAllCourse (req, res));

courseRouter.post("/register", VerifyToken.execute, VerifyIsSeller.execute, ValidateRequest.execute({ body: createCourseSchema }), IsCorseAlready.execute, (req, res) => courseController.register (req, res));

courseRouter.patch("/:id", VerifyToken.execute, VerifyIsSeller.execute, ValidateRequest.execute({ body: updateCourseSchema }), (req, res) => courseController.updateCorse (req, res));

courseRouter.delete("/:id", VerifyToken.execute, VerifyIsSeller.execute, (req, res) => courseController.delete (req, res));