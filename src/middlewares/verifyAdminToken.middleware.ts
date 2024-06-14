import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../database/prisma";

export class VerifyAdminToken {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;

        if(!authorization){
            throw new AppError(401, "Token is required");
        }

        const [ _ , token ] = authorization.split(" ");

        if(!token){
            throw new AppError(401, "Token is required");
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        const admin = await prisma.admin.findFirst({ where: { id } });

        if (!admin) {
            throw new AppError(403, "You are not authorized to perform this action");
        }

        res.locals = { ...res.locals, id };

        next();
    }
}