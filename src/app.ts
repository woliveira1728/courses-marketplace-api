import "reflect-metadata";
import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import { HandleErrors } from "./errors/handleErrors.middleware";
import { userRouter } from "./routes/users.routes";

export const app = express();
app.use(helmet());

app.use(json());

app.use("/api/users", userRouter);

app.use(HandleErrors.execute);