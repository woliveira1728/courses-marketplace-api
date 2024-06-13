import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";


export class VerifyIsSeller {
    static execute(req: Request, res: Response, next: NextFunction) {
        const checkSeller = res.locals.isSeller

        if(!checkSeller){
            throw new AppError(403, "You need to be a seller to register or update a course");
        }

        next();
    }
}