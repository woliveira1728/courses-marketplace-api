import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { AdminServices } from "../services";


@injectable()
export class AdminControllers {

    constructor(@inject("AdminServices") private adminServices: AdminServices){};

    async register(req: Request, res: Response): Promise<Response> {

        console.log(req.body);
        
        const response = await this.adminServices.register(req.body);

        return res.status(201).json(response);

    }

    async login(req: Request, res: Response): Promise<Response> {

        const response = await this.adminServices.login(req.body);

        return res.status(200).json(response);
    }

    async updateCourseStatus(req: Request, res: Response): Promise<Response> {

        const courseId = req.params.id;

        await this.adminServices.updateCourseStatus(courseId, req.body);
        
        return res.status(200).json({ message: "Course status updated successfully" });

    }

    async manageUser(req: Request, res: Response): Promise<Response> {

        const userId = req.params.id;

        const user = await this.adminServices.manageUser( userId, req.body);

        return res.status(200).json(user);

    }

    async deleteUser(req: Request, res: Response): Promise<Response> {

        const userId = req.params.id;

        await this.adminServices.deleteUser(userId);

        return res.status(200).json({ message: "User deleted successfully" });

    }

    async getAllUser(req: Request, res: Response): Promise<Response> {

        const response = await this.adminServices.getAllUser();

        return res.status(200).json(response);

    }

    async getAllCourses(req: Request, res: Response): Promise<Response> {

        const response = await this.adminServices.getAllCourses();

        return res.status(200).json(response);

    }

}