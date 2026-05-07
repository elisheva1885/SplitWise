

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useGroupContext } from '../store/use-group.context';
import { getUserDetails } from '../api/user-api';
import { useNavigate } from 'react-router';
import { Outlet } from 'react-router'
export const GroupPage = () => {
    const { groups, setGroups } = useGroupContext();
    const navigate = useNavigate();
    const goToGroup = (id: number) => {
        navigate(`${id}`)
    }
    const DrawerList =
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                <Typography>My Groups</Typography>
                {groups.map((group) => (
                    <ListItem key={group.id} disablePadding>
                        <ListItemButton onClick={() => { goToGroup(group.id) }}>
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText primary={group.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <Button sx={{ background: 'black' }}>Add Group</Button>
        </Box>

    const getGroups = async () => {
        const data = await getUserDetails();
        console.log("groups ", data);
        setGroups(data.groups)
    }
    useEffect(() => {
        getGroups()
    }, [])
    return (
        <>
            <div>
                <Drawer
                    variant="permanent"
                    sx={{
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { boxSizing: 'border-box', marginTop: '64px' },
                    }}
                    ModalProps={{ disablePortal: true }}
                >
                    {DrawerList}
                </Drawer>
                <div style={{ marginLeft: 260, padding: 16 }}>
                    <Outlet />
                </div>

            </div>

        </>
    );
}





