import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { CoursesServices } from "../services";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

@injectable()
export class CoursesControllers {

    constructor(@inject("CoursesServices") private courseServices: CoursesServices){};

    async register(req: Request, res: Response): Promise<Response> {

        const ownerId = res.locals.id;

        const response = await this.courseServices.register(ownerId, req.body);

        return res.status(201).json(response);
    }

    async getAllCourse(req: Request, res: Response): Promise<Response> {
        
        const response = await this.courseServices.getAllCourse();

        return res.status(200).json(response);
    }

    async updateCorse(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const ownerId = res.locals.id;

        const response = await this.courseServices.updateCorse(id, req.body, ownerId);

        return res.status(200).json(response);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const ownerId = res.locals.id;

        const response = await this.courseServices.delete(id, ownerId);

        return res.status(204).json();
    }

}