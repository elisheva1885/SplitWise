import type { UserInExpense, UserInGroup } from "./user.types";

export type ExpenseInGroup = {
  id: number;
  cause: string;
  value: number;
  paidBy: UserInGroup;
  paidOn: UserInGroup;
};

export type OptimizedExpense = {
  value: number;
  paidByUser: UserInExpense;
  paidOnUser: UserInExpense;
};

export type CreateExpenseDto = {
  cause: string | undefined;
  value: number;
  paidBy: number;
  paidOn: number;
  groupId: number;
};

export type UpdateExpenseData = {
  cause?: string;
  value: number;
  paidBy: number;
  paidOn: number;
};
