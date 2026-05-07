import { z } from 'zod'
export const AddGroupSchema = z.object({
    name: z.string().min(3),
    description: z.string(),

})

export type AddGroupData = z.infer<typeof AddGroupSchema>;


export const LoginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(1)
})

export type LoginData = z.infer<typeof LoginSchema>;


export const ForgetPasswordSchema = z.object({
    email: z.email(),
})

export type ForgetPasswordData = z.infer<typeof ForgetPasswordSchema>;
