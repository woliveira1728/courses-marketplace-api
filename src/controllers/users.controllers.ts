import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { UsersServices } from "../services";

@injectable()
export class UsersControllers {

    constructor(@inject("UsersServices") private userServices: UsersServices){};

    async register(req: Request, res: Response): Promise<Response> {

        const response = await this.userServices.register(req.body);

        return res.status(201).json(response);
    }

    async login(req: Request, res: Response): Promise<Response> {

        const response = await this.userServices.login(req.body);

        return res.status(200).json(response);
    }

    async getUser(req: Request, res: Response): Promise<Response> {

        const { id } = res.locals;

        const response = await this.userServices.getUser(id);

        return res.status(200).json(response);
    }

}