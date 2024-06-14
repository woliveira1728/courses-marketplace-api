import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { AdminServices } from "../services";


@injectable()
export class AdminControllers {

    constructor(@inject("AdminServices") private adminServices: AdminServices){};

    public register = async (req: Request, res: Response): Promise<Response> => {

        console.log(req.body);
        
        const response = await this.adminServices.register(req.body);

        return res.status(201).json(response);

    }

    public login = async (req: Request, res: Response): Promise<Response> => {

        const response = await this.adminServices.login(req.body);

        return res.status(200).json(response);
    }

    public updateCourseStatus = async (req: Request, res: Response): Promise<Response> => {

        const courseId = req.params.id;

        await this.adminServices.updateCourseStatus(courseId, req.body);
        
        return res.status(200).json({ message: "Course status updated successfully" });

    }

    public manageUser = async (req: Request, res: Response): Promise<Response> => {

        const userId = req.params.id;

        const user = await this.adminServices.manageUser( userId, req.body);

        return res.status(200).json(user);

    }

    public deleteUser = async (req: Request, res: Response): Promise<Response> => {

        const userId = req.params.id;

        await this.adminServices.deleteUser(userId);

        return res.status(200).json({ message: "User deleted successfully" });

    }

    public getAllUser = async (req: Request, res: Response): Promise<Response> => {

        const response = await this.adminServices.getAllUser();

        return res.status(200).json(response);

    }

    public getAllCourses = async (req: Request, res: Response): Promise<Response> => {

        const response = await this.adminServices.getAllCourses();

        return res.status(200).json(response);

    }

}