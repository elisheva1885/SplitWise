import type { UserInGroup } from "../types/user.types"
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { deleteUserFromGroup, updateGroupOwner } from "../api/group.api";
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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Typography from "@mui/material/Typography";
type GroupMembersListProps = {
    group: GroupData | null,
    setGroup: (group: GroupData) => void,
    isOwner: boolean,
    setIsOwner: (isOwner: boolean) => void,
}
export const GroupMembersList = ({ group, setGroup, isOwner ,setIsOwner}: GroupMembersListProps) => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const deleteGroupMember = async (userId: number) => {

        if (!group?.id) {
            setError("Group not loaded");
            setOpenSnackbar(true);
            return;
        }
        try {
            const data = await deleteUserFromGroup(group?.id, userId)
            setGroup(data);
            setSuccess("User removed successfully");
            setOpenSnackbar(true);
        }
        catch (err) {
            setError(handleApiError(err));
            setOpenSnackbar(true);
        }
    }
    const updateToGroupOwner = async (userId: number) => {
        if (!group?.id) {
            setError("Group not loaded");
            setOpenSnackbar(true);
            return;
        }
        try {
            const data = await updateGroupOwner(group?.id, userId)
            if (userId !== group.owner.id){
                setIsOwner(false);
            }

                setGroup(data);
            setSuccess("group admin updated successfully");
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
                        <TableCell align="center">Username</TableCell>
                        <TableCell align="center">email</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {group?.members?.map((member) => (
                        <TableRow
                            key={member.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="member" align="center">
                                {member.username}
                            </TableCell>
                            <TableCell align="center">{member.email}</TableCell>
                            <TableCell align="center">
                                {isOwner && <IconButton
                                    onClick={() => deleteGroupMember(member.id)}
                                    sx={{
                                        backgroundColor: "white",
                                        padding: 0.2,
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>}
                            </TableCell>
                            <TableCell align="center">
                                {isOwner && <IconButton
                                    onClick={() => updateToGroupOwner(member.id)}
                                    sx={{
                                        backgroundColor: "white",
                                        padding: 0.2,
                                    }}
                                >
                                    <AdminPanelSettingsIcon />
                                    <Typography sx={{ fontSize: 'x-small' }}>to Admin</Typography>                                </IconButton>}

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
        </TableContainer >

    )
}