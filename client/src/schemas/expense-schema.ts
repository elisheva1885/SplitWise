import { z } from "zod";
export const AddExpenseSchema = z.object({
  cause: z.string().optional(),
  value: z.number().min(1),
  paidOn: z.number(),
});

export type AddExpenseData = z.infer<typeof AddExpenseSchema>;
