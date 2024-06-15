import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import { injectable } from "tsyringe";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TCourseCreateReturn, TUpdateUser, TUserCreate, TUserCreateReturn, TUserLogin, TUserLoginReturn, createUserReturnSchema,  } from "../schemas";


@injectable()
export class UsersServices {
    
    public register = async (body: TUserCreate): Promise<TUserCreateReturn> => {

        body.password = await bcrypt.hash(body.password, 10);

        const data = await prisma.user.create({ data: body });

        return createUserReturnSchema.parse(data);
    }

    public update = async (id: string, body: TUpdateUser): Promise<TUserCreateReturn> => {
        const isUserValid = await prisma.user.findFirst({ where: { id } });
        if (!isUserValid) {
            throw new AppError(404, "User not found");
        }

        const user = await prisma.user.update({ where: { id }, data: body });

        return createUserReturnSchema.parse(user);

    }

    public login = async (body: TUserLogin ): Promise<TUserLoginReturn> => {

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

    public getUser = async ( id: string ): Promise<TUserCreateReturn> => {
        const user = await prisma.user.findFirst({ where: { id } });

        return createUserReturnSchema.parse(user);
    }

    public getMyCoursesForSale = async (id: string): Promise<TCourseCreateReturn[]> => {

        const owner = await prisma.user.findFirst({ where: { id } });
        if (!owner) {
            throw new AppError(404, "Owner not found");
        }

        const courseList = await prisma.course.findMany({ where: { ownerId: owner.id }});

        return courseList;

    }

    public getPurchasedCourses = async (id: string): Promise<TCourseCreateReturn[]> => {

        const user = await prisma.user.findFirst({ where: { id } });
        if (!user) {
            throw new AppError(404, "User not found");
        }

        const transactions = await prisma.transaction.findMany({
            where: { buyerId: id },
            include: { course: true }
        });

        const purchasedCourses = transactions.map(transaction => transaction.course);

        return purchasedCourses;

    }

}