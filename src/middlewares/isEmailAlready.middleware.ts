import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsEmailAlready {
    static async execute(req: Request, res: Response, next: NextFunction){

        const email: string = req.body.email;

        const user = await prisma.user.findFirst({ where: { email } })

        if(user) {
            throw new AppError(409, "E-mail already registered");
        }

        next();
    }
}