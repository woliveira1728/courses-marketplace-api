import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import { injectable } from "tsyringe";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TUpdateUser, TUserCreate, TUserCreateReturn, TUserLogin, TUserLoginReturn, createUserReturnSchema,  } from "../schemas";


@injectable()
export class UsersServices {
    
    async register(body: TUserCreate): Promise<TUserCreateReturn> {

        body.password = await bcrypt.hash(body.password, 10);

        const data = await prisma.user.create({ data: body });

        return createUserReturnSchema.parse(data);
    }

    async update(id: string, body: TUpdateUser): Promise<TUserCreateReturn> {
        const isUserValid = await prisma.user.findFirst({ where: { id } });
        if (!isUserValid) {
            throw new AppError(404, "User not found");
        }

        const user = await prisma.user.update({ where: { id }, data: body });

        return createUserReturnSchema.parse(user);

    }

    async login(body: TUserLogin ): Promise<TUserLoginReturn> {

        const user = await prisma.user.findFirst({ where: { email: body.email } });

        if (!user) {
            throw new AppError(404, "User not registered");
        }

        const compare = await bcrypt.compare(body.password, user.password);

        if (!compare) {
            throw new AppError(401, "E-mail and password doesn't match");
        }

        const token = jwt.sign(
            { id: user.id, isSeller: user.isSeller },
            process.env.JWT_SECRET!,
            { expiresIn: process.env.EXPIRES_IN || "1h" }
        );

        return {
            accessToken: token,
            user: createUserReturnSchema.parse(user)
        };
    }

    async getUser( id: string ): Promise<TUserCreateReturn> {
        const user = await prisma.user.findFirst({ where: { id } });

        return createUserReturnSchema.parse(user);
    }

}