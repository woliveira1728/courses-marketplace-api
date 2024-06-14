import { Router } from "express";
import { container } from "tsyringe";
import { AdminControllers } from "../controllers";
import { IsEmailAdminAlready, ValidateRequest, VerifyAdminToken } from "../middlewares";
import { createAdminSchema, userLogin } from "../schemas";
import { AdminServices } from "../services";

export const adminRouter = Router();

container.registerSingleton("AdminServices", AdminServices);
const adminController = container.resolve(AdminControllers);

adminRouter.post("/register", ValidateRequest.execute({ body: createAdminSchema }), IsEmailAdminAlready.execute, (req, res) => adminController.register (req, res));

adminRouter.post("/login", ValidateRequest.execute({ body: userLogin }), (req, res) => adminController.login (req, res));

adminRouter.patch("/courses/:id/status", VerifyAdminToken.execute, (req, res) => adminController.updateCourseStatus(req, res));

adminRouter.patch("/users/:id", VerifyAdminToken.execute, (req, res) => adminController.manageUser(req, res));

adminRouter.delete("/users/:id", VerifyAdminToken.execute, (req, res) => adminController.deleteUser(req, res));

adminRouter.get("/users", VerifyAdminToken.execute, (req, res) => adminController.getAllUser(req, res));

adminRouter.get("/courses", VerifyAdminToken.execute, (req, res) => adminController.getAllCourses(req, res));