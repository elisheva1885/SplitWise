import { z } from "zod";
export const AddGroupSchema = z.object({
  name: z.string().min(3),
  description: z.string(),
});

export type AddGroupData = z.infer<typeof AddGroupSchema>;

export const UpdateGroupSchema = z.object({
  name: z.string().min(3),
  description: z.string(),
});

export type UpdateGroupData = z.infer<typeof UpdateGroupSchema>;
