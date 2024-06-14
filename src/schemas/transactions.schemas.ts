import { z } from "zod";

export const transactionSchema = z.object({
    id: z.string().min(1),
    buyerId: z.string().min(1),
    courseId: z.string().min(1),
    price: z.number(),
    ownerId: z.string().min(1),
});

export const createTransactionSchema = transactionSchema.omit({ id: true });

export type TTransactionSchema = z.infer<typeof transactionSchema>;

export type TCreateTransactionSchema = z.infer<typeof createTransactionSchema>;