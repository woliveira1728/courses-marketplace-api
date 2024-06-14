import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import { injectable } from "tsyringe";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TAdminLogin, TAdminLoginReturn, TCourseCreateReturn, TCreateAdmin, TCreateAdminReturn, TUpdateUser, TUpdatedCourse, TUserCreateReturn, createAdminReturnSchema, createCourseReturnSchema, createUserReturnSchema } from "../schemas";


@injectable()
export class AdminServices {

    async register(data: TCreateAdmin): Promise<TCreateAdminReturn> {

        data.password = await bcrypt.hash(data.password, 10);

        const newAdmin = await prisma.admin.create({ data });

        return createAdminReturnSchema.parse(newAdmin);

    }

    async login(body: TAdminLogin ): Promise<TAdminLoginReturn> {

        const admin = await prisma.admin.findFirst({ where: { email: body.email } });

        if (!admin) {
            throw new AppError(404, "User not registered");
        }

        const compare = await bcrypt.compare(body.password, admin.password);

        if (!compare) {
            throw new AppError(401, "E-mail and password doesn't match");
        }

        const token = jwt.sign(
            { id: admin.id },
            process.env.JWT_SECRET!,
            { expiresIn: process.env.EXPIRES_IN || "1h" }
        );

        return {
            accessToken: token,
            admin: createAdminReturnSchema.parse(admin)
        };
    }

    async updateCourseStatus(id: string, data: TUpdatedCourse): Promise<void> {

        const course = await prisma.course.findFirst({ where: { id } });
        if (!course) {
            throw new AppError(404, "Course not found");
        }

        await prisma.course.update({ where: { id }, data });

    }

    async manageUser(id: string, data: TUpdateUser): Promise<TUserCreateReturn> {
        
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new AppError(404, "User not found");
        }

        const updatedUser = await prisma.user.update({ where: { id }, data });

        return createUserReturnSchema.parse(updatedUser);
    }

    async deleteUser(id: string): Promise<void> {

        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new AppError(404, "User not found");
        }

        await prisma.user.delete({ where: { id } });

    }

    async getAllUser(): Promise<TUserCreateReturn[]> {
        const users = await prisma.user.findMany();

        return users.map(user => createUserReturnSchema.parse(user));
    }

    async getAllCourses(): Promise<TCourseCreateReturn[]> {
        const courses = await prisma.course.findMany();

        return courses.map(course => createCourseReturnSchema.parse(course));
    }

}