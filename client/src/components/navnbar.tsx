import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { useUserContext } from "../store/use-user.context";
import { useNavigate } from "react-router";
import { AuthForms } from "./auth-forms";
import { FormDialog } from "./form-dialog";

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (!user) {
      setOpen(true);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setAnchorEl(null);
  };
  const handleProfile = () => {
    navigate("/user");
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#182720", height:'60px' }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton  onClick={()=> navigate('/')}>
            <Box
              component={"img"}
              src="splitwise2.png"
              sx={{ maxHeight: 40 }}
            ></Box>
            </IconButton>
            {user ? (
              <Button
                sx={{
                  display: { sm: "inline-flex" },
                }}
                onClick={() => navigate("/groups")}
              >
                My Groups
              </Button>
            ) : (
              <></>
            )}
          </Box>

          <Box>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ padding: "5px", display: { xs: "none", sm: "block" } }}
              >
                {user ? "Hello " + user?.username : ""}
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{}}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Box>
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon /> Logout
                </MenuItem>
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <FormDialog open={open} handleCloseDialog={handleCloseDialog}>
        <AuthForms setDialogOpen={setOpen} />
      </FormDialog>
    </>
  );
};
