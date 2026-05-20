import { z } from "zod";
export const AddExpenseSchema = z.object({
  cause: z.string().max(100, "Cause must be less than 100 characters").optional(),
  value: z
    .number({ message: "value must be bigger than zero" })
    .min(1, { message: "value must be bigger than zero" }),
  paidOn: z.number({ message: "you must choose a user for the expense" }),
});

export type AddExpenseData = z.infer<typeof AddExpenseSchema>;

export const UpdateExpenseSchema = z.object({
  cause: z.string().optional(),
  value: z
    .number({ message: "value must be bigger than zero" })
    .min(1, { message: "value must be bigger than zero" }),
  paidOn: z.number(),
  paidBy: z.number(),
});

export type UpdateExpenseData = z.infer<typeof UpdateExpenseSchema>;
