import { Router } from "express";
import { container } from "tsyringe";
import { ValidateRequest, VerifyToken } from "../middlewares";
import { TransactionsControllers } from "../controllers";
import { TransactionsServices } from "../services";
import { createTransactionSchema } from "../schemas";

export const transactionRouter = Router();

container.registerSingleton("TransactionsServices", TransactionsServices);
const transactionController = container.resolve(TransactionsControllers);

transactionRouter.post("/", VerifyToken.execute, ValidateRequest.execute({ body: createTransactionSchema }), (req, res) => transactionController.register (req, res));