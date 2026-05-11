import type { OptimizedExpense } from "../types/expense.type";
import api from "./client.api";

export async function getOptimizedExpenses(
  groupId: number,
): Promise<OptimizedExpense[]> {
  const { data } = await api.get(`/expense/${groupId}`);
  console.log(data);
  return data;
}
