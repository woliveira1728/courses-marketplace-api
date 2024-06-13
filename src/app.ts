import "reflect-metadata";
import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import { HandleErrors } from "./errors/handleErrors.middleware";
import { courseRouter, userRouter } from "./routes";

export const app = express();
app.use(helmet());

app.use(json());

app.use("/api/users", userRouter);

app.use("/api/courses", courseRouter);

app.use(HandleErrors.execute);