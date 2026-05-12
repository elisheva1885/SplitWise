import { z } from "zod";
export const UpdateUserSchema = z.object({
  username: z.string().min(3).optional(),
  email: z.email().optional(),
});

export type UpdateUserSchemaData = z.infer<typeof UpdateUserSchema>;
