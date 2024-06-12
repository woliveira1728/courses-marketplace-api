import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import jwt, { JwtPayload } from "jsonwebtoken";


export class VerifyToken {
    static execute(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;

        if(!authorization){
            throw new AppError(401, "Token is required");
        }

        const [ _ , token ] = authorization.split(" ");

        if(!token){
            throw new AppError(401, "Token is required");
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        res.locals = { ...res.locals, id };

        next();
    }
}