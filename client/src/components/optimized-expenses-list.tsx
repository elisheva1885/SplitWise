import { useState } from "react";
import type { GroupData } from "../types/group.types";
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
import type { OptimizedExpense } from "../types/expense.type";
import type { SnackbarState } from "../types/snackbar.types";

type OptimizedExpensesListProps = {
  expenses: OptimizedExpense[] | null;
  groupId: number | undefined;
  setGroup: (group: GroupData) => void;
};

export const OptimizedExpensesList = ({
  expenses,
  groupId,
  setGroup,
}: OptimizedExpensesListProps) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "success",
    message: "",
  });

  // const deleteGroupMember = async (userId: number) => {
  //     setSnackbar({
  //         open: true,
  //         severity: "error",
  //         message: "Group not loaded",
  //     });

  //     if (!groupId) {
  //         return;
  //     }

  //     try {
  //         const data = await deleteUserFromGroup(groupId, userId)
  //         setGroup(data);

  //         setSnackbar({
  //             open: true,
  //             severity: "success",
  //             message: "User removed successfully",
  //         });
  //     }
  //     catch (err) {
  //         setSnackbar({
  //             open: true,
  //             severity: "error",
  //             message: handleApiError(err),
  //         });
  //     }
  // }

  const handleClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Value</TableCell>
            <TableCell align="center">Paid By</TableCell>
            <TableCell align="center">Paid On</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {expenses?.map((expense) => (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell align="center">
                {expense.value}
              </TableCell>

              <TableCell align="center">
                {expense.paidByUser.username}
              </TableCell>

              <TableCell align="center">
                {expense.paidOnUser.username}
              </TableCell>

              <TableCell align="center">
                {/* <IconButton
                    onClick={() => deleteGroupMember(member.id)}
                    sx={{
                        backgroundColor: "white",
                        padding: 0.2,
                    }}
                >
                    <DeleteIcon />
                </IconButton> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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