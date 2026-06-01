import { z } from "zod";
export const UpdateUserSchema = z.object({
  username: z
    .string()
    .min(3, { message: "username must be at lease 3 characters" })
    .optional(),
  email: z.email().optional(),
});

export type UpdateUserSchemaData = z.infer<typeof UpdateUserSchema>;
