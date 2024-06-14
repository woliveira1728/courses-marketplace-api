import { z } from "zod";

export const adminSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
});

export const createAdminSchema = adminSchema.omit({ id: true });

export const createAdminReturnSchema = adminSchema.omit({ password: true});

export const adminLogin = adminSchema.pick({ email: true, password: true });

export type TCreateAdmin = z.infer<typeof createAdminSchema>;

export type TCreateAdminReturn = z.infer<typeof createAdminReturnSchema>;

export type TAdminLogin = z.infer<typeof adminLogin>;

export type TAdminLoginReturn = {
    accessToken: string,
    admin: TCreateAdminReturn
};