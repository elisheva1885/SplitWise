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

export const Navbar = () => {
    const [userConnected, setUserConnected] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [user, setUser] = React.useState<User| null>({
            username: 'elisheva',
            email: 'elisheva@gmail.com'
        });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserConnected(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        if (userConnected) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getUser = () => {
        //get the userData from the context 
        // setUserConnected(false);
        // const user: User = {
        //     username: 'elisheva',
        //     email: 'elisheva@gmail.com'
        // }
        // setUser(user)
        // console.log(user);

    }
    React.useEffect(() => {
        getUser()
    }, [])
    return (
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
                        {user? <button>My Groups</button>: <></>}
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Photos
                    </Typography>
                    {userConnected && (
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
                                    {user?user?.username: ''}
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
                                <div aria-disabled={user? true: false}>
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}><LogoutIcon/> Logout</MenuItem>
                                </div>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
