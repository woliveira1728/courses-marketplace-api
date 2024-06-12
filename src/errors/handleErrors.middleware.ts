import { NextFunction, Request, Response } from "express";
import { AppError } from "./appError";
import { ZodError } from "zod";

export class HandleErrors{
    static execute(err: Error, req: Request, res: Response, next: NextFunction){
        if(err instanceof AppError){
            return res.status(err.statusCode).json({ error: err.message });
        }
        
        if(err instanceof ZodError){
            return res.status(400).json(err);
        }
        
        console.log(err);
        return res.status(500).json({ error: "Internal server error." });
        
    }
}