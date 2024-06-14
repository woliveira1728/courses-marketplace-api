import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsEmailAdminAlready {
    static async execute(req: Request, res: Response, next: NextFunction){

        const email: string = req.body.email;

        const admin = await prisma.admin.findFirst({ where: { email } });
        if(admin) {
            throw new AppError(409, "E-mail already registered");
        }

        next();
    }
}