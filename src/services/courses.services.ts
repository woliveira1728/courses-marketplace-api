import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import { injectable } from "tsyringe";
import { 
    TCourseCreate, TCourseCreateReturn, createCourseReturnSchema, 
    TUpdatedCourse,
    updateCourseSchema
} from "../schemas";


@injectable()
export class CoursesServices {
    
    async register(ownerId: string, body: TCourseCreate): Promise<TCourseCreateReturn> {
                
        const newCourse = {...body, ownerId: ownerId as string };

        const course = await prisma.course.create({ data: newCourse });

        return createCourseReturnSchema.parse(course);
    }

    async updateCorse(id: string, body: TUpdatedCourse, ownerId: string): Promise<TCourseCreateReturn> {
        const isCourseValid = await prisma.course.findFirst({ where: { id } });
        if (!isCourseValid) {
            throw new AppError(404, "Course not found");
        }

        if (isCourseValid.ownerId != ownerId) {
            throw new AppError(403, "You are not the owner of this course");
        }

        const course = await prisma.course.update({ where: { id }, data: body });

        return course;

    }
    
    async getAllCourse(): Promise<TCourseCreateReturn[]> {
        const courseList = await prisma.course.findMany();

        return courseList;
    }


    async delete(id: string, ownerId: string ): Promise<void> {

        const course = await prisma.course.findFirst({ where: { id } });

        if (!course) {
            throw new AppError(404, "Course not found");
        }

        if (course.ownerId != ownerId) {
            throw new AppError(403, "You are not the owner of this course");
        }

        await prisma.course.delete({ where: { id }});
    }


}