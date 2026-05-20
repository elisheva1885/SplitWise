import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useUserContext } from "../store/use-user.context";
import { AddExpensesForm } from "./add-expense-form";
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
import type { ExpenseInGroup } from "../types/expense.type";
import { UpdateExpenseForm } from "./update-expense-form";
import { useGroupContext } from "../store/use-group.context";
import { FormDialog } from "./form-dialog";
import { useExpenses } from "../hooks/use-expenses";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export const ExpensesList = () => {
  const { user } = useUserContext();
  const { group } = useGroupContext();
  const [updateExpenseDialog, setUpdateExpenseDialog] = useState(false);
  const [expenseForUpdate, setExpenseForUpdate] = useState<ExpenseInGroup>();

  const { snackbar, handleCloseSnackbar, loadingAddExpenses, loadingDeleteExpenses, loadingUpdateExpenses, actions } = useExpenses();
  const openUpdateDialog = (expense: ExpenseInGroup) => {
    setExpenseForUpdate(expense);
    setUpdateExpenseDialog(true);
  };
  const handleCloseDialog = () => {
    setUpdateExpenseDialog(false);
    setExpenseForUpdate(undefined);
  };


  return (
    <>
      <TableContainer component={Paper}>
        <Typography sx={{marginTop:'5px'}}>Total expenses</Typography>
        <AddExpensesForm onSubmit={actions.addExpenseToGroup} loadingAddExpense={loadingAddExpenses} />
        {!group?.expenses?.length ? (
          <Box>No expenses in this group</Box>
        ) : (

          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Cause</TableCell>
                <TableCell align="center">Value</TableCell>
                <TableCell align="center">Paid By</TableCell>
                <TableCell align="center">Paid On</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {group?.expenses?.map((expense) => {
                const canEdit =
                  expense?.paidBy.id === user?.id ||
                  expense?.paidOn.id === user?.id;
                return (
                  <TableRow key={expense?.id}>
                    <TableCell align="center" sx={{
                      wordBreak: 'break-word',
                    }}>{expense.cause}</TableCell>
                    <TableCell align="center">{expense.value}</TableCell>
                    <TableCell align="center">
                      {expense.paidBy.username}
                    </TableCell>
                    <TableCell align="center">
                      {expense.paidOn.username}
                    </TableCell>
                    <TableCell align="center">
                      {canEdit && (
                        <Tooltip title="Edit Expense">
                          <IconButton onClick={() => openUpdateDialog(expense)} disabled={loadingUpdateExpenses}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>

                    <TableCell align="center">
                      {canEdit && (
                        <Tooltip title="Delete Expense">
                          <IconButton disabled={loadingDeleteExpenses}
                            onClick={() =>
                              actions.deleteExpenseFromGroup(expense.id)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
        <FormDialog
          open={updateExpenseDialog}
          handleCloseDialog={handleCloseDialog}
        >
          {expenseForUpdate && (
            <UpdateExpenseForm
              onSubmit={async (expense, expenseData) => {
                await actions.updateGroupExpense(expense, expenseData);
                handleCloseDialog();
              }}
              expense={expenseForUpdate}
            />
          )}
        </FormDialog>
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbar.severity}>
          <AlertTitle>
            {snackbar.severity === "success" ? "Success" : "Error"}
          </AlertTitle>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
