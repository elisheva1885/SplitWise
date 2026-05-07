import type { UserInGroup } from "../types/user.types"
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { deleteUserFromGroup } from "../api/group.api";
import type { GroupData } from "../types/group.types";
import { handleApiError } from "../helpers/handle-api-error.helper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

type GroupMembersListProps = {
    groupMembers: UserInGroup[] | undefined,
    groupId: number | undefined,
    setGroup: (group: GroupData) => void
}
export const GroupMembersList = ({ groupMembers, groupId, setGroup }: GroupMembersListProps) => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const deleteGroupMember = async (userId: number) => {
        setError("");
        setSuccess("");
        if (!groupId) {
            setError("Group not loaded");
            setOpenSnackbar(true);
            return;
        }
        try {
            const data = await deleteUserFromGroup(groupId, userId)
            setGroup(data);
            setSuccess("User removed successfully");
            setOpenSnackbar(true);
        }
        catch (err) {
            setError(handleApiError(err));
            setOpenSnackbar(true);
        }
    }
    const handleClose = () => {
        setOpenSnackbar(false);
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="right">email</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {groupMembers?.map((member) => (
                        <TableRow
                            key={member.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="member">
                                {member.username}
                            </TableCell>
                            <TableCell align="right">{member.email}</TableCell>
                            <TableCell align="right">
                                <IconButton
                                    onClick={() => deleteGroupMember(member.id)}
                                    sx={{
                                        backgroundColor: "white",
                                        padding: 0.2,
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleClose}>
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
        </TableContainer>

    )
}