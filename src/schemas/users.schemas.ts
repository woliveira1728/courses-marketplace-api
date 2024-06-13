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
    isSeller: z.boolean()
  });

export const userLogin = usersSchema.pick({ email: true, password: true });

export const updateUserSchema = usersSchema.pick({ password: true, isSeller: true }).partial();

export type TUpdateUser = z.infer<typeof updateUserSchema>;

export type TUser = z.infer<typeof usersSchema>;

export type TUserCreate = z.infer<typeof createUserSchema>;

export type TUserCreateReturn = z.infer<typeof createUserReturnSchema>;

export type TUserLogin = z.infer<typeof userLogin>;

export type TUserLoginReturn = {
    accessToken: string,
    user: TUserCreateReturn
}