import { z } from 'zod'
export const AddGroupSchema = z.object({
    name: z.string().min(3),
    description: z.string(),

})

export type AddGroupData = z.infer<typeof AddGroupSchema>;


export const UpdateGroupMemberSchema = z.object({
    username: z.string().min(3),
    email: z.email()
})

export type UpdateGroupMemberData = z.infer<typeof UpdateGroupMemberSchema>;


// export const ForgetPasswordSchema = z.object({
//     email: z.email(),
// })

// export type ForgetPasswordData = z.infer<typeof ForgetPasswordSchema>;
