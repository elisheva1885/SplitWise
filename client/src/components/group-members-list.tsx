import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
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
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Typography from "@mui/material/Typography";
import { useGroupDetails } from "../hooks/use-group-details";
type GroupMembersListProps = {
  group: GroupData | null;
  // setGroup: (group: GroupData) => void;
  isOwner: boolean;
};
export const GroupMembersList = ({ group, isOwner }: GroupMembersListProps) => {
  const [loading] = useState<boolean>(false);

  const { snackbar,handleCloseSnackbar, actions } = useGroupDetails();

  
  return (
    <TableContainer
      component={Paper}
      sx={{
        overflowX: "auto",
        width: "100%",
      }}
    >
      <Table
        sx={{
          minWidth: 650,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">email</TableCell>
            {isOwner && <TableCell align="center"></TableCell>}
            {isOwner && <TableCell align="center"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {group?.members?.map((member) => (
            <TableRow
              key={member.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="member" align="center">
                {member.username}
              </TableCell>
              <TableCell align="center">{member.email}</TableCell>
              {isOwner && (
                <TableCell align="center">
                  <IconButton
                    onClick={() => actions.deleteGroupMember(member.id)}
                    disabled={loading}
                    sx={{
                      backgroundColor: "white",
                      padding: 0.2,
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              )}
              {isOwner && (
                <TableCell align="center">
                  <IconButton
                    onClick={() => actions.updateToGroupOwner(member.id)}
                    disabled={loading || member.id === group?.owner.id}
                    sx={{
                      backgroundColor: "white",
                      padding: 0.2,
                    }}
                  >
                    <AdminPanelSettingsIcon />
                    <Typography sx={{ fontSize: "x-small" }}>
                      to Admin
                    </Typography>
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    </TableContainer>
  );
};
