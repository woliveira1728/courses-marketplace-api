import { z } from "zod";

export const transactionSchema = z.object({
    id: z.string().min(1),
    buyerId: z.string().min(1),
    courseId: z.string().min(1),
    price: z.number(),
    ownerId: z.string().min(1),
    createdAt: z.string(), // ISO date string
});