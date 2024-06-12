import { z } from "zod";

export const courseSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    price: z.number(),
    img: z.string().min(1),
    ownerId: z.string().min(1),
    status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
    adminId: z.string().nullish(),
});

export const createCourseSchema = courseSchema.omit({ id: true });