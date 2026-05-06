import Box from "@mui/material/Box"
import type { GroupData } from "../types/group.types"
import { useEffect, useState } from "react"
import { useParams } from 'react-router'
import { useGroupContext } from "../store/use-group.context"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { addUserToGroup, getGroupDetails } from "../api/group.api"
import Button from "@mui/material/Button"
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Dialog from "@mui/material/Dialog"
import CloseIcon from "@mui/icons-material/Close";
import { AddGroupMemberForm } from "./add-group-member-form"

export const GroupDetails = () => {
    const { id } = useParams();
    const [group, setGroup] = useState<GroupData | null>(null);
    const [open, setOpen] = useState(false);

    const getGroupDetailsById = async (id: number) => {
        const data = await getGroupDetails(id);
        console.log("the full group: ", data);
        setGroup(data)
    }

    const handleCloseDialog = () => {
        setOpen(false);
    };
    const addGroup = () => {

    }
    const addGroupMember = async (userId: number) => {
        console.log( group);

        if (group?.id == undefined) {
            console.log(group?.id, group);

            alert("no group")
        }
        const data = await addUserToGroup(group?.id, userId)
        setGroup(data);
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
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: 'flex', flexFlow: 'row warp'}}>
                {group?.members.map((member) => (
                    <ListItem key={member.id}>
                        <ListItemAvatar>
                            <Avatar>
                                <PeopleAltIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={member.username} secondary={member.email} />
                    </ListItem>
                ))}
                <Button sx={{ backgroundColor: 'black' }} onClick={() => setOpen(true)}><GroupAddIcon /></Button>
            </List>
            <Dialog open={open} onClose={handleCloseDialog}>
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
                        <AddGroupMemberForm setDialogOpen={setOpen} onSubmit={addGroupMember} />
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}