import type {
  CreateExpenseDto,
  ExpenseInGroup,
  OptimizedExpense,
  UpdateExpenseData,
} from "../types/expense.type";
import api from "./client.api";

export async function getOptimizedExpenses(
  groupId: number,
): Promise<OptimizedExpense[]> {
  const { data } = await api.get(`/expense/${groupId}`);
  return data;
}

export async function createExpense(
  expenseData: CreateExpenseDto,
): Promise<ExpenseInGroup> {
  const { data } = await api.post("/expense", expenseData);
  return data;
}

export async function deleteExpense(
  expenseId: number,
): Promise<{ message: string }> {
  const { data } = await api.delete(`/expense/${expenseId}`);
  return data;
}

export async function updateExpense(
  expenseId: number,
  expenseData: UpdateExpenseData,
): Promise<ExpenseInGroup> {
  const { data } = await api.patch(`/expense/${expenseId}`, expenseData);
  return data;
}
