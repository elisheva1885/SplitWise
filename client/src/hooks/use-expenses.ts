import { useCallback, useState } from "react";
import { useGroupContext } from "../store/use-group.context";
import type { SnackbarState } from "../types/snackbar.types";
import {
  createExpense,
  deleteExpense,
  getOptimizedExpenses,
  updateExpense,
} from "../api/expense.api";
import { handleApiError } from "../helpers/handle-api-error.helper";
import type { AddExpenseData } from "../schemas/expense-schema";
import { useUserContext } from "../store/use-user.context";
import type { ExpenseInGroup, UpdateExpenseData } from "../types/expense.type";

export const useExpenses = () => {
  const { group, setOptimizedExpenses, setGroup } = useGroupContext();
  const { user } = useUserContext();
  const [loadingOptimizedExpense, setLoadingOptimizedExpense] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "success",
    message: "",
  });
  const getGroupOptimizedExpense =useCallback( async (id: number) => {
    if (!group?.id) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Group not loaded",
      });

      return;
    }
    try {
      setLoadingOptimizedExpense(true);
      const data = await getOptimizedExpenses(id);
      setOptimizedExpenses(data);
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message: handleApiError(err),
      });
    } finally {
      setLoadingOptimizedExpense(false);
    }
  },[setOptimizedExpenses, group?.id]);
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };
  const addExpenseToGroup = async (expenseData: AddExpenseData) => {
    if (!group?.id) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Group not loaded",
      });
      return;
    }

    if (!user?.id) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "User not connected",
      });
      return;
    }

    try {
      const data = await createExpense({
        cause: expenseData.cause,
        value: expenseData.value,
        paidBy: user?.id,
        paidOn: expenseData.paidOn,
        groupId: group.id,
      });

      setGroup({
        ...group,
        expenses: [...group.expenses, data],
      });

      setSnackbar({
        open: true,
        severity: "success",
        message: "New Expense added successfully",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message: handleApiError(err),
      });
    }
  };

  const deleteExpenseFromGroup = async (expenseId: number) => {
    if (!group?.id) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Group not loaded",
      });
      return;
    }

    try {
      await deleteExpense(expenseId);

      const filteredExpenses = group.expenses.filter(
        (expense) => expense.id !== expenseId,
      );

      setGroup({
        ...group,
        expenses: filteredExpenses,
      });

      setSnackbar({
        open: true,
        severity: "success",
        message: "Expense deleted successfully",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message: handleApiError(err),
      });
    }
  };

  const updateGroupExpense = async (
    expense: ExpenseInGroup,
    expenseData: UpdateExpenseData,
  ) => {
    if (!group?.id) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Group not loaded",
      });
      return;
    }
    if (
      expenseData.cause === expense.cause &&
      expenseData.value === expense.value &&
      expenseData.paidBy === expense.paidBy.id &&
      expenseData.paidOn === expense.paidOn.id
    ) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "you need to change one of the inputs before saving!",
      });
      return;
    }
    try {
      const data = await updateExpense(expense.id, expenseData);
      const filteredExpenses = group.expenses.filter(
        (expense) => expense.id !== data.id,
      );
      setGroup({
        ...group,
        expenses: [...filteredExpenses, data],
      });

      setSnackbar({
        open: true,
        severity: "success",
        message: "Expense updated successfully",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message: handleApiError(err),
      });
    }
  };

  return {
    loadingOptimizedExpense,
    snackbar,
    handleCloseSnackbar,
    actions: {
      getGroupOptimizedExpense,
      addExpenseToGroup,
      deleteExpenseFromGroup,
      updateGroupExpense,
    },
  };
};
