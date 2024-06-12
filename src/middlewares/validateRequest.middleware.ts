import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

interface IRequestSchemas {
    params?: AnyZodObject;
    body?: AnyZodObject;
    query?: AnyZodObject;
}

export class ValidateRequest {
    static execute(schemas: IRequestSchemas){
        return (req: Request, res: Response, next: NextFunction) => {
            if(schemas.body){
                req.body = schemas.body.parse(req.body);
            }

            if(schemas.params){
                req.params = schemas.params.parse(req.params);
            }
            
            if(schemas.query){
                req.query = schemas.query.parse(req.query);
            }

            next();
        }
    }
}