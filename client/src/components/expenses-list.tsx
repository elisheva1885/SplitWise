import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useUserContext } from "../store/use-user.context";
import { AddExpensesFrom } from "./add-expense-form";
import type { AddExpenseData } from "../schemas/expense-schema";
import {
    createExpense,
    deleteExpense,
    updateExpense,
} from "../api/expense.api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import type { GroupData } from "../types/group.types";
import type { ExpenseInGroup, UpdateExpenseData } from "../types/expense.type";
import { handleApiError } from "../helpers/handle-api-error.helper";
import { UpdateExpenseForm } from "./update-expense-form";
import type { SnackbarState } from "../types/snackbar.types";

type ExpensesListProps = {
    group: GroupData | null;
    setGroup: (group: GroupData) => void;
};

export const ExpensesList = ({ group, setGroup }: ExpensesListProps) => {
    const { user } = useUserContext();

    const [updateExpenseDialog, setUpdateExpenseDialog] = useState(false);
    const [expenseForUpdate, setExpenseForUpdate] =
        useState<ExpenseInGroup>();

    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        severity: "success",
        message: "",
    });

    const handleClose = () => {
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
        expenseId: number,
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

        try {
            const data = await updateExpense(expenseId, expenseData);

            const filteredExpenses = group.expenses.filter(
                (expense) => expense.id !== expenseId,
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
        } finally {
            setUpdateExpenseDialog(false);
        }
    };

    const handleCloseDialog = () => {
        setUpdateExpenseDialog(false);
    };

    return (
        <TableContainer component={Paper}>
            <AddExpensesFrom group={group} onSubmit={addExpenseToGroup} />

            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Cause</TableCell>
                        <TableCell align="center">Value</TableCell>
                        <TableCell align="center">Paid By</TableCell>
                        <TableCell align="center">Paid On</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {group?.expenses?.map((expense) => (
                        <TableRow key={expense.id}>
                            <TableCell align="center">
                                {expense.cause}
                            </TableCell>
                            <TableCell align="center">
                                {expense.value}
                            </TableCell>
                            <TableCell align="center">
                                {expense.paidBy.username}
                            </TableCell>
                            <TableCell align="center">
                                {expense.paidOn.username}
                            </TableCell>

                            <TableCell align="center">
                                {(expense.paidBy.id === user?.id ||
                                    expense.paidOn.id === user?.id) && (
                                        <IconButton
                                            onClick={() => {
                                                setUpdateExpenseDialog(true);
                                                setExpenseForUpdate(expense);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    )}
                            </TableCell>

                            <TableCell align="center">
                                {(expense.paidBy.id === user?.id ||
                                    expense.paidOn.id === user?.id) && (
                                        <IconButton
                                            onClick={() =>
                                                deleteExpenseFromGroup(
                                                    expense.id,
                                                )
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={updateExpenseDialog} onClose={handleCloseDialog}>
                <Box style={{ backgroundColor: "#2e3136" }}>
                    <Box sx={{ textAlign: "center", padding: "8px" }}>
                        <UpdateExpenseForm
                            setDialogOpen={setUpdateExpenseDialog}
                            onSubmit={updateGroupExpense}
                            expense={expenseForUpdate}
                            groupMembers={group?.members}
                        />
                    </Box>
                </Box>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={handleClose}
            >
                <Alert severity={snackbar.severity}>
                    <AlertTitle>
                        {snackbar.severity === "success"
                            ? "Success"
                            : "Error"}
                    </AlertTitle>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </TableContainer>
    );
};