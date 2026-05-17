import { useEffect} from "react";
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
import { useGroupContext } from "../store/use-group.context";
import { useExpenses } from "../hooks/use-expenses";

export const OptimizedExpensesList = () => {
  const { snackbar, handleCloseSnackbar, actions } = useExpenses();
  const { optimizedExpenses, group } = useGroupContext();
  const getGroupOptimizedExpense = actions.getGroupOptimizedExpense;

useEffect(() => {
  if (!group?.id) return;

  getGroupOptimizedExpense(group.id);
}, [group?.id, getGroupOptimizedExpense]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Value</TableCell>
            <TableCell align="center">Paid By</TableCell>
            <TableCell align="center">Paid On</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {optimizedExpenses.map((expense) => (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell align="center">{expense.value}</TableCell>

              <TableCell align="center">
                {expense.paidByUser.username}
              </TableCell>

              <TableCell align="center">
                {expense.paidOnUser.username}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbar.severity}>
          <AlertTitle>
            {snackbar.severity === "success" ? "Success" : "Error"}
          </AlertTitle>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </TableContainer>
  );
};
