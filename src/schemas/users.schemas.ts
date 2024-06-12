import { z } from "zod";
import { courseSchema, transactionSchema } from ".";

export const usersSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    isSeller: z.boolean().optional().default(false)
});

export const createUserSchema = usersSchema.omit({ id: true });

export const createUserReturnSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    isSeller: z.boolean(),
    ownedCourses: z.array(z.any()).optional().default([]),
    boughtCourses: z.array(z.any()).optional().default([]),
    buyerTransactions: z.array(z.any()).optional().default([]),
    ownerTransactions: z.array(z.any()).optional().default([]),
  });

export const userLogin = usersSchema.pick({ email: true, password: true });

export type TUser = z.infer<typeof usersSchema>;

export type TUserCreate = z.infer<typeof createUserSchema>;

export type TUserCreateReturn = z.infer<typeof createUserReturnSchema>;

export type TUserLogin = z.infer<typeof userLogin>;

export type TUserLoginReturn = {
    accessToken: string,
    user: TUserCreateReturn
}