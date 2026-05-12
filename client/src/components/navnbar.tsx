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
import Dialog from "@mui/material/Dialog";
import { useUserContext } from "../store/use-user.context";
import { useNavigate } from "react-router";
import { AuthForms } from "./auth-forms";
import CloseIcon from "@mui/icons-material/Close";

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
      <AppBar
        position="static"
        style={{ backgroundColor: "#182720", marginBottom: "15px" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              component={"img"}
              src="splitwise2.png"
              sx={{ maxHeight: 40 }}
            ></Box>
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
      <Dialog open={open} onClose={handleCloseDialog}>
        <Box
          style={{
            backgroundColor: "#2e3136",
            paddingBottom: "10px",
            paddingLeft: "15px",
            paddingRight: "15px",
          }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "end", marginTop: "8px" }}
          >
            <IconButton>
              <CloseIcon
                onClick={handleCloseDialog}
                sx={{
                  backgroundColor: "#2e3136",
                  color: "white",
                  insetInlineEnd: 3,
                }}
              />
            </IconButton>
          </Box>
          <Box
            sx={{
              textAlign: "center",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              justifyContent: "space-between",
            }}
          >
            <AuthForms setDialogOpen={setOpen} />
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
