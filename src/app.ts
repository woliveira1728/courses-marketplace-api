import "reflect-metadata";
import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import { HandleErrors } from "./errors/handleErrors.middleware";
import { adminRouter, courseRouter, transactionRouter, userRouter } from "./routes";
import { initSwagger } from "./configs/swagger";

export const app = express();
app.use(helmet());

app.use(json());

app.use("/api/users", userRouter);

app.use("/api/courses", courseRouter);

app.use("/api/transactions", transactionRouter);

app.use("/api/admin", adminRouter);

initSwagger(app);

app.use(HandleErrors.execute);