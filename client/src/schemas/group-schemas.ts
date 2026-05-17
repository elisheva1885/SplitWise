import { z } from "zod";
export const AddGroupSchema = z.object({
  name: z.string().min(3, {message: "group name must be at lease 3 characters long"}),
  description: z.string(),
});

export type AddGroupData = z.infer<typeof AddGroupSchema>;

export const UpdateGroupSchema = z.object({
  name: z.string().min(3, {message: "group name must be at lease 3 characters long"}),
  description: z.string().optional(),
});

export type UpdateGroupData = z.infer<typeof UpdateGroupSchema>;
