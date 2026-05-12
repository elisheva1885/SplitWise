import { z } from "zod";
export const AddExpenseSchema = z.object({
  cause: z.string().optional(),
  value: z.number().min(1),
  paidOn: z.number(),
});

export type AddExpenseData = z.infer<typeof AddExpenseSchema>;

export const UpdateExpenseSchema = z.object({
  cause: z.string(),
  value: z.number().min(1),
  paidOn: z.number(),
  paidBy: z.number(),

});

export type UpdateExpenseData = z.infer<typeof UpdateExpenseSchema>;
