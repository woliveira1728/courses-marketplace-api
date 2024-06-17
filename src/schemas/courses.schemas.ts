import { z } from "zod";

export const courseSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    price: z.number(),
    img: z.string().min(1),
    instructor: z.string().min(1),
    ownerId: z.string().min(1).optional(),
    status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
    adminId: z.string().optional(),
});

export const createCourseSchema = courseSchema.omit({ id: true, adminId: true, instructor: true });

export const updateCourseSchema = courseSchema.omit({ id: true, adminId: true, ownerId: true }).partial();

export const createCourseReturnSchema = courseSchema.omit({ adminId: true });

export const courseReturn = courseSchema.omit({ adminId: true });

export type TCourse = z.infer<typeof courseReturn>;

export type TCourseCreate = z.infer<typeof createCourseSchema>;

export type TUpdatedCourse = z.infer<typeof updateCourseSchema>;

export type TCourseCreateReturn = z.infer<typeof createCourseReturnSchema>;