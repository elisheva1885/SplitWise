import Box from "@mui/material/Box"
import type { GroupData } from "../types/group.types"
import { useEffect, useState } from "react"
import { useParams } from 'react-router'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { addUserToGroup, getGroupDetails, updateGroup } from "../api/group.api"
import Button from "@mui/material/Button"
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from "@mui/material/Dialog"
import CloseIcon from "@mui/icons-material/Close";
import { AddGroupMemberForm } from "./add-group-member-form"
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { UpdateGroupForm } from "./update-group-form";
import type { UserInGroup } from "../types/user.types";
import Typography from "@mui/material/Typography";
import { handleApiError } from "../helpers/handle-api-error.helper";
import { GroupMembersList } from "./group-members-list";
import { useUserContext } from "../store/use-user.context";
import type { UpdateGroupData } from "../schemas/group-schemas";
export const GroupDetails = () => {
    const { id } = useParams();
    const [group, setGroup] = useState<GroupData | null>(null);
    const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
    const [updateUserDialog, setUpdateUserDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const { user } = useUserContext();
    const [isOwner, setIsOwner] = useState<boolean>(false);

    const getGroupDetailsById = async (id: number) => {
        try {
            const data = await getGroupDetails(id);
            setGroup(data);
            setIsOwner(user?.id === data.owner.id);
        }
        catch (err) {
            setError(handleApiError(err));
            setOpenSnackbar(true);
        }
    }

    const handleCloseDialog = () => {
        setOpenAddUserDialog(false);
        setUpdateUserDialog(false);
    };
    const handleClose = () => {
        setOpenSnackbar(false);
    };
    const addGroupMember = async (userId: number) => {
        console.log(userId);

        if (!group?.id) {
            setError("Group not loaded");
            setOpenSnackbar(true);
            return;
        }
        try {
            const data = await addUserToGroup(group.id, userId)
            setGroup(data);
            setSuccess("User added successfully");
            setOpenSnackbar(true);
        }
        catch (err: unknown) {
            setError(handleApiError(err));
            setOpenSnackbar(true);
        }
    }
    const updateGroupDetails = async (groupData: UpdateGroupData) => {
        if (!group?.id) {
            setError("Group not loaded");
            setOpenSnackbar(true);
            return;
        }
        try {
            const data = await updateGroup(group?.id, groupData)
            setGroup(data);
            setSuccess("Group updated successfully");
            setOpenSnackbar(true);
        }
        catch (err: unknown) {
            setError(handleApiError(err));
            setOpenSnackbar(true);
        }
        setUpdateUserDialog(false)
    }

    const updateGroupInfo = () => {
        setUpdateUserDialog(true);

    }


    useEffect(() => {
        if (!id) return;
        getGroupDetailsById(Number(id))
    }, [id])

    return (
        <>
            <Box sx= {{display: 'flex', justifyContent: 'center',alignItems: 'center', gap: 2}}> <Typography sx={{ fontSize: 'xx-large'}}>{group?.name}</Typography>
                {isOwner && <EditIcon onClick={updateGroupInfo} />}</Box>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                    mb: 2,
                }}
            >
                <ListItem key={group?.owner.id} sx={{
                    width: "fit-content",
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    backgroundColor: "#f5f5f5",
                }}>
                    <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: 'black' }}>
                            <Typography sx={{ fontSize: 'x-small' }}>OWNER</Typography>
                        </Avatar>
                    </ListItemAvatar>
                    {group?.owner && <ListItemText primary={group?.owner.username} />}
                </ListItem>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <GroupMembersList group={group} setGroup={setGroup} isOwner={isOwner} setIsOwner={setIsOwner} />
            </Box >
            {isOwner && <Button sx={{ backgroundColor: 'black' }} onClick={() => setOpenAddUserDialog(true)} aria-label="Add group member"><GroupAddIcon /></Button>}

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
                        <UpdateGroupForm setDialogOpen={setUpdateUserDialog} onSubmit={updateGroupDetails} group={group} />
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
