import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsCorseAlready {
    static async execute(req: Request, res: Response, next: NextFunction){

        const title: string = req.body.title;

        const course = await prisma.course.findFirst({ where: { title } })

        if(course) {
            throw new AppError(409, "Course already registered");
        }

        next();
    }
}