import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { addUserToGroup, deleteUserFromGroup } from "../api/group.api";
import type { GroupData } from "../types/group.types";
import { handleApiError } from "../helpers/handle-api-error.helper";
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
import { useUserContext } from "../store/use-user.context";
import { AddExpensesFrom } from "./add-expense-form";
import type { AddExpenseData } from "../schemas/expense-schema";
import { createExpense, deleteExpense } from "../api/expense.api";

type ExpensesListProps = {
    group: GroupData | null;
    setGroup: (group: GroupData) => void;
};
export const ExpensesList = ({
    group,
    setGroup,
}: ExpensesListProps) => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { user } = useUserContext();

    const addExpenseToGroup = async (expenseData: AddExpenseData) => {
        if (!group?.id) {
            setError("Group not loaded");
            setOpenSnackbar(true);
            return;
        }
        if (!user?.id) {
            setError("user not connected");
            setOpenSnackbar(true);
            return;
        }
        console.log({ cause: expenseData.cause, value: expenseData.value, paidBy: user?.id, paidOn: expenseData.paidOn, groupId: group.id });

        try {
            const data = await createExpense({ cause: expenseData.cause, value: expenseData.value, paidBy: user?.id, paidOn: expenseData.paidOn, groupId: group.id });
            console.log(data);

            setGroup({
                ...group,
                expenses: [...group.expenses, data],
            });
            setGroup(group);
            setSuccess("New Expense added successfully");
            setOpenSnackbar(true);
        } catch (err) {
            setSuccess("");
            setError(handleApiError(err));
            setOpenSnackbar(true);
        }
    }
    const deleteExpenseFromGroup = async (expenseId: number) => {
        if (!group?.id) {
            setError("Group not loaded");
            setOpenSnackbar(true);
            return;
        }
        try {
            const data = await deleteExpense(expenseId);
            const filteredExpenses = group.expenses.filter(expense=> 
                 expense.id!== expenseId 
            )
            setGroup({
                ...group,
                expenses: filteredExpenses,
            });
            setSuccess("Expense deleted successfully");
            setOpenSnackbar(true);
        } catch (err) {
            setError(handleApiError(err));
            setOpenSnackbar(true);
        }
    };

    const updateExpense = async (userId: number) => {
        if (!group?.id) {
            setError("Group not loaded");
            setOpenSnackbar(true);
            return;
        }
        try {
            const data = await deleteUserFromGroup(group.id, userId);
            setGroup(data);
            setSuccess("User removed successfully");
            setOpenSnackbar(true);
        } catch (err) {
            setError(handleApiError(err));
            setOpenSnackbar(true);
        }
    };
    const handleClose = () => {
        setOpenSnackbar(false);
    };
    return (
        <TableContainer component={Paper}>
            <AddExpensesFrom group={group} onSubmit={addExpenseToGroup} />
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Cause</TableCell>
                        <TableCell align="center">Value</TableCell>
                        <TableCell align="center">Paid By</TableCell>
                        <TableCell align="center">Paid On</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {group?.expenses?.map((expense) => (
                        <TableRow
                            key={expense.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            {/* {setExpenseOwner(
                expense.paidBy.id === user?.id ||
                  expense.paidOn.id === user?.id,
              )}  */}
                            <TableCell component="th" scope="member" align="center">
                                {expense.cause}
                            </TableCell>
                            <TableCell align="center">{expense.value}</TableCell>
                            <TableCell align="center">{expense.paidBy.username}</TableCell>
                            <TableCell align="center">{expense.paidOn.username}</TableCell>
                            <TableCell align="center">
                                {(expense.paidBy.id === user?.id ||
                                    expense.paidOn.id === user?.id) && (
                                        <IconButton
                                            onClick={() => updateExpense(expense.id)}
                                            sx={{
                                                backgroundColor: "white",
                                                padding: 0.2,
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
                                            onClick={() => deleteExpenseFromGroup(expense.id)}
                                            sx={{
                                                backgroundColor: "white",
                                                padding: 0.2,
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>

            </Table>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={handleClose}
            >
                {success ? (
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        {success}{" "}
                    </Alert>
                ) : (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {error}{" "}
                    </Alert>
                )}
            </Snackbar>
        </TableContainer >
    );
};
