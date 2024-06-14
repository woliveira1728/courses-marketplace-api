import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { TransactionsServices } from "../services";


@injectable()
export class TransactionsControllers {

    constructor(@inject("TransactionsServices") private transactionsServices: TransactionsServices){};

    async register(req: Request, res: Response): Promise<Response> {

        const response = await this.transactionsServices.register(req.body);

        return res.status(201).json(response);
    }

}