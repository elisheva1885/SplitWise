import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import type { User } from '../types/user';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useUserContext } from '../store/use-user.context';
import { LoginPage } from '../pages/login.page';
import { useNavigate } from 'react-router';

export const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { user, logout } = useUserContext();
    const navigate  = useNavigate();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setUserConnected(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        if (!user) {
            setOpen(true);
        }
        else {
            setAnchorEl(event.currentTarget);
        }

    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        // if(user){
        //     handleMenu()
        // }
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

     const toGroups = () => {
        navigate('/groups')
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const email = formJson.email;
        console.log(email);
        handleClose();
    };
    const handleLogout = () => {
        logout();
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={userConnected}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={userConnected ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            {/* <MenuIcon /> */}
                            {user ? <Button onClick={toGroups}>My Groups</Button> : <></>}
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Photos
                        </Typography>

                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    {user ? user?.username : ''}
                                </Typography>
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <div aria-disabled={user ? true : false}>
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleLogout}><LogoutIcon /> Logout</MenuItem>
                                </div>
                            </Menu>
                        </div>

                    </Toolbar>
                </AppBar>
            </Box>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Open form dialog
                </Button>
                <Dialog open={open} onClose={handleCloseDialog}>
                    {/* <DialogTitle>Subscribe</DialogTitle> */}
                    <LoginPage />
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button type="submit" form="subscription-form">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

        </>
    );
}
