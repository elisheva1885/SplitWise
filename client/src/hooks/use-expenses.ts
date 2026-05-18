import { useCallback, useState } from "react";
import { useGroupContext } from "../store/use-group.context";
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
import { useSnackbar } from "./use-snackbar";

export const useExpenses = () => {
    const { group, setOptimizedExpenses, setGroup } = useGroupContext();
    const { user } = useUserContext();
    const [loadingOptimizedExpenses, setLoadingOptimizedExpenses] = useState(false);

    const {
        snackbar,
        showError,
        showSuccess,
        handleCloseSnackbar,
    } = useSnackbar();
    const isExpenseChanged = (
  expense: ExpenseInGroup,
  data: UpdateExpenseData,
) => {
  return (
    data.cause !== expense.cause ||
    data.value !== expense.value ||
    data.paidBy !== expense.paidBy.id ||
    data.paidOn !== expense.paidOn.id
  );
};
    const getGroupOptimizedExpense = useCallback(
        async (id: number) => {
            if (!group?.id) {
                showError("Group not loaded");
                return;
            }

            try {
                setLoadingOptimizedExpenses(true);

                const data = await getOptimizedExpenses(id);

                setOptimizedExpenses(data);
            } catch (err) {
                showError(handleApiError(err));
            } finally {
                setLoadingOptimizedExpenses(false);
            }
        },
        [setOptimizedExpenses, group?.id, showError],
    );

    const addExpenseToGroup = async (expenseData: AddExpenseData) => {
        if (!group?.id) {
            showError("Group not loaded");
            return;
        }

        if (!user?.id) {
            showError("User not connected");
            return;
        }

        try {
            const data = await createExpense({
                cause: expenseData.cause,
                value: expenseData.value,
                paidBy: user.id,
                paidOn: expenseData.paidOn,
                groupId: group.id,
            });

            setGroup({
                ...group,
                expenses: [...group.expenses, data],
            });

            showSuccess("New Expense added successfully");
        } catch (err) {
            showError(handleApiError(err));
        }
    };

    const deleteExpenseFromGroup = async (expenseId: number) => {
        if (!group?.id) {
            showError("Group not loaded");
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

            showSuccess("Expense deleted successfully");
        } catch (err) {
            showError(handleApiError(err));
        }
    };

    const updateGroupExpense = async (
        expense: ExpenseInGroup,
        expenseData: UpdateExpenseData,
    ) => {
        if (!group?.id) {
            showError("Group not loaded");
            return;
        }

        if (
            isExpenseChanged(expense,expenseData)
        ) {
            showError("you need to change one of the inputs before saving!");
            return;
        }

        try {
            const data = await updateExpense(expense.id, expenseData);

            const mappedExpenses = group.expenses.map((expense) =>
                expense.id === data.id ? data : expense,
            );
            setGroup({
                ...group,
                expenses: mappedExpenses,
            });

            showSuccess("Expense updated successfully");
        } catch (err) {
            showError(handleApiError(err));
        }
    };

    return {
        loadingOptimizedExpenses,
        snackbar,
        handleCloseSnackbar,
        actions: {
            getGroupOptimizedExpense,
            addExpenseToGroup,
            deleteExpenseFromGroup,
            updateGroupExpense,
        },
    };
}
