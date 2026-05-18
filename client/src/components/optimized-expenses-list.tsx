import { useEffect } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const OptimizedExpensesList = () => {
  const {
    snackbar,
    handleCloseSnackbar,
    loadingOptimizedExpenses,
    actions: { getGroupOptimizedExpense },
  } = useExpenses();
  const { optimizedExpenses, group } = useGroupContext();

  useEffect(() => {
    if (!group?.id) return;
    getGroupOptimizedExpense(group.id);
  }, [group?.id, getGroupOptimizedExpense, group?.expenses]);


  if (loadingOptimizedExpenses) {    
    return <CircularProgress />;
  }
  if (!optimizedExpenses.length) {
    return <div>No optimized expenses</div>;
  }
  return (
    <>
      {loadingOptimizedExpenses ? (
        <CircularProgress />
      ) : !optimizedExpenses.length ? (
        <Box>No optimized expenses</Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Value</TableCell>
                <TableCell align="center">From</TableCell>
                <TableCell align="center">To</TableCell>
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
        </TableContainer>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
          <AlertTitle>
            {snackbar.severity === "success" ? "Success" : "Error"}
          </AlertTitle>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
