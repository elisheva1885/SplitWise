import Box from "@mui/material/Box"
import type { GroupData } from "../types/group.types"
import { useEffect, useState } from "react"
import { useParams } from 'react-router'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { addUserToGroup, deleteUserFromGroup, getGroupDetails } from "../api/group.api"
import Button from "@mui/material/Button"
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Dialog from "@mui/material/Dialog"
import CloseIcon from "@mui/icons-material/Close";
import { AddGroupMemberForm } from "./add-group-member-form"
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import { UpdateGroupMemberForm } from "./update-group-member-form";
import type { UserInGroup } from "../types/user.types";
import Typography from "@mui/material/Typography";
export const GroupDetails = () => {
    const { id } = useParams();
    const [group, setGroup] = useState<GroupData | null>(null);
    const [updateMember, setUpdateMember] = useState<UserInGroup | null>(null);
    const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
    const [updateUserDialog, setUpdateUserDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const getGroupDetailsById = async (id: number) => {
        setError("");
        setSuccess("");
        try {
            const data = await getGroupDetails(id);
            setGroup(data)
        }
        catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message || err.message;
                setError(message);
            } else {
                setError("Something went wrong");
            }
            setOpenSnackbar(true);
        }
    }

    const handleCloseDialog = () => {
        setOpenAddUserDialog(false);
    };
    const handleClose = () => {
        setOpenSnackbar(false);
    };
    const addGroupMember = async (userId: number) => {
        setError("");
        setSuccess("");
        if (group?.id == undefined) {
            console.log(group?.id, group);
            alert("no group")
        }
        try {
            const data = await addUserToGroup(group.id, userId)
            setGroup(data);
            setSuccess("User added successfully");
            setOpenSnackbar(true);
        }
        catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message || err.message;
                setError(message);
            } else {
                setError("Something went wrong");
            }
            setOpenSnackbar(true);
        }
    }
    const deleteGroupMember = async (userId: number) => {
        setError("");
        setSuccess("");
        if (group?.id == undefined) {
            console.log(group?.id, group);
            alert("no group")
        }
        try {
            const data = await deleteUserFromGroup(group.id, userId)
            setGroup(data);
            setSuccess("User removed successfully");
            setOpenSnackbar(true);
        }
        catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message || err.message;
                setError(message);
            } else {
                setError("Something went wrong");
            }
            setOpenSnackbar(true);
        }
    }

    const updateMemberInfo = (member: UserInGroup) => {
        setUpdateUserDialog(true);
        setUpdateMember(member);
    }

    useEffect(() => {
        console.log('GroupDetails');
        if (id) {
            getGroupDetailsById(Number(id))
        }
    }, [id])

    return (
        <>
            {group?.name}
            <List sx={{
                width: '100%',
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 1,
            }}>
                {group?.members.map((member) => (
                    <Box
                        key={member.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 1,
                            py: 0.5,
                            border: '1px solid #ddd',
                            borderRadius: 2,
                            fontSize: 13,
                            width: 'fit-content',
                        }}
                    >
                        <Avatar sx={{ width: 24, height: 24 }}>
                            <PeopleAltIcon sx={{ fontSize: 16 }} />
                        </Avatar>

                        <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                            <span style={{ fontSize: 13 }}>{member.username}</span>
                            <span style={{ fontSize: 11, opacity: 0.6 }}>{member.email}</span>
                        </Box>

                        <IconButton
                            onClick={() => updateMemberInfo(member)
                            }
                            sx={{
                                backgroundColor: "white",
                                padding: 0.2,
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => deleteGroupMember(member.id)}
                            sx={{
                                backgroundColor: "white",
                                padding: 0.2,
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}

            </List >
            <Button sx={{ backgroundColor: 'black' }} onClick={() => setOpenAddUserDialog(true)}><GroupAddIcon /></Button>
            <Typography sx={{alignItems:'left'}}>OWNER</Typography>
            <ListItem key={group?.owner.id} sx={{
                width: 'auto',
                flex: '0 0 auto',
                padding: '4px 8px',
            }}>
                <ListItemAvatar>
                    <Avatar>
                        <PeopleAltIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={group?.owner.username} />
            </ListItem>
            <Dialog open={openAddUserDialog} onClose={handleCloseDialog}>
                <Box style={{ backgroundColor: "#2e3136" }}>
                    <CloseIcon
                        onClick={handleCloseDialog}
                        sx={{
                            backgroundColor: "#2e3136",
                            color: "white",
                            position: "absolute",
                            insetInlineEnd: 3,
                        }}
                    />
                    <br />
                    <Box sx={{ textAlign: "center", padding: "8px" }}>
                        <AddGroupMemberForm setDialogOpen={setOpenAddUserDialog} onSubmit={addGroupMember} />
                    </Box>
                </Box>
            </Dialog>
            <Dialog open={updateUserDialog} onClose={handleCloseDialog}>
                <Box style={{ backgroundColor: "#2e3136" }}>
                    <CloseIcon
                        onClick={handleCloseDialog}
                        sx={{
                            backgroundColor: "#2e3136",
                            color: "white",
                            position: "absolute",
                            insetInlineEnd: 3,
                        }}
                    />
                    <br />
                    <Box sx={{ textAlign: "center", padding: "8px" }}>
                        <UpdateGroupMemberForm setDialogOpen={setUpdateUserDialog} onSubmit={addGroupMember} user={updateMember} />
                    </Box>
                </Box>
            </Dialog>
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
        </>
    )
}
