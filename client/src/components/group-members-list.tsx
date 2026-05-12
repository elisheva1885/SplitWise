import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { deleteUserFromGroup, updateGroupOwner } from "../api/group.api";
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
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Typography from "@mui/material/Typography";
import type { SnackbarState } from "../types/snackbar.types";
type GroupMembersListProps = {
    group: GroupData | null;
    setGroup: (group: GroupData) => void;
    isOwner: boolean;
    setIsOwner: (isOwner: boolean) => void;
};
export const GroupMembersList = ({
    group,
    setGroup,
    isOwner,
    setIsOwner,
}: GroupMembersListProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        severity: "success",
        message: "",
    });
    const deleteGroupMember = async (userId: number) => {
        try {
            if (!group?.id) {
                setSnackbar({
                    open: true,
                    severity: "error",
                    message: "Group not loaded",
                });
                return;
            }
            setLoading(true);
            const data = await deleteUserFromGroup(group?.id, userId);
            setSnackbar({
                open: true,
                severity: "success",
                message: "User removed successfully!",
            });
            setGroup(data);
        } catch (err) {
            setSnackbar({
                open: true,
                severity: "error",
                message: handleApiError(err),
            });
        } finally {
            setLoading(false);
        }
    };
    const updateToGroupOwner = async (userId: number) => {
        try {
            if (!group?.id) {
                setSnackbar({
                    open: true,
                    severity: "error",
                    message: "Group not loaded",
                });
                return;
            }
            setLoading(true);

            const data = await updateGroupOwner(group?.id, userId);
            setIsOwner(group.owner.id === userId);
            setGroup(data);
            setSnackbar({
                open: true,
                severity: "success",
                message: "group admin updated successfully!",
            });
        } catch (err) {
            setSnackbar({
                open: true,
                severity: "error",
                message: handleApiError(err),
            });
        } finally {
            setLoading(false);
        }
    };
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
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell component="th" scope="member" align="center">
                                {member.username}
                            </TableCell>
                            <TableCell align="center">{member.email}</TableCell>
                            <TableCell align="center">
                                {isOwner && (
                                    <IconButton
                                        onClick={() => deleteGroupMember(member.id)}
                                        disabled={loading}
                                        sx={{
                                            backgroundColor: "white",
                                            padding: 0.2,
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </TableCell>
                            <TableCell align="center">
                                {isOwner && (
                                    <IconButton
                                        onClick={() => updateToGroupOwner(member.id)}
                                        disabled={loading || member.id === group.owner.id}
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
                                )}
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
                        {snackbar.severity === "success" ? "Success" : "Error"}
                    </AlertTitle>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </TableContainer>
    );
};
