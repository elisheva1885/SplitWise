import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useGroupContext } from "../store/use-group.context";
import { getUserDetails } from "../api/user.api";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
import { AddGroupForm } from "../components/add-group-form";
import Dialog from "@mui/material/Dialog";
import { createGroup } from "../api/group.api";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import type { AddGroupData } from "../schemas/group-schemas";
import type { SnackbarState } from "../types/snackbar.types";
import { handleApiError } from "../helpers/handle-api-error.helper";
export const GroupPage = () => {
  const { groups, setGroups } = useGroupContext();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "success",
    message: "",
  });
  const navigate = useNavigate();

  const goToGroup = (id: number) => {
    navigate(`${id}`);
  };
  const addGroup = async (groupData: AddGroupData) => {
    try {
      setLoading(true);
      const data = await createGroup(groupData);
      setGroups([...groups, data]);
      setSnackbar({
        open: true,
        severity: "success",
        message: "Group created successfully!",
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
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <Typography>My Groups</Typography>
        {groups.map((group) => (
          <ListItem key={group.id} disablePadding>
            <ListItemButton
              onClick={() => {
                goToGroup(group.id);
              }}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={group.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <br />
      <Button
        sx={{ background: "black" }}
        onClick={() => setOpen(true)}
        disabled={loading}
      >
        + New Group
      </Button>
    </Box>
  );

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const getGroups = async () => {
    const data = await getUserDetails();
    console.log("groups ", data);
    setGroups(data.groups);
  };
  const handleClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };
  useEffect(() => {
    getGroups();
  }, []);
  return (
    <>
      <div>
        <Drawer
          variant="permanent"
          sx={{
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              boxSizing: "border-box",
              marginTop: "64px",
            },
          }}
          ModalProps={{ disablePortal: true }}
        >
          {DrawerList}
        </Drawer>
        <div style={{ marginLeft: 260, padding: 16 }}>
          <Outlet />
        </div>
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
              <AddGroupForm onSubmit={addGroup} />
            </Box>
          </Box>
        </Dialog>
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
      </div>
    </>
  );
};
