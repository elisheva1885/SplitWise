import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useGroupContext } from "../store/use-group.context";
import { getUserDetails } from "../api/user.api";
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
import CircularProgress from "@mui/material/CircularProgress";
import { GroupDrawerList } from "../components/group-drawer";
export const GroupPage = () => {
  const { groups, setGroups } = useGroupContext();
  const [open, setOpen] = useState(false);
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [getLoading, setGetLoading] = useState<boolean>(false);

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "success",
    message: "",
  });


  const addGroup = async (groupData: AddGroupData) => {
    try {
      setAddLoading(true);
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
      setAddLoading(false);
      setOpen(false);
    }
  };


  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };
  useEffect(() => {
    const getGroups = async () => {
      try {
        setGetLoading(true);
        const data = await getUserDetails();
        setGroups(data.groups);
      } catch (err) {
        setSnackbar({
          open: true,
          severity: "error",
          message: handleApiError(err),
        });
      } finally {
        setGetLoading(false);
      }
    };

    getGroups();
  }, [setGroups]);
  return (
    <Box>
      {getLoading ? (
        <CircularProgress aria-label="Loading…" />
      ) : (
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
          <GroupDrawerList groups= {groups} setOpen= {setOpen} addLoading= {addLoading} />
        </Drawer>
      )}
      <Box style={{ marginLeft: 260, padding: 16 }}>
        <Outlet />
      </Box>
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
autoHideDuration={2500}
        onClose={handleClose}
      >
        <Alert severity={snackbar.severity}>
          <AlertTitle>
            {snackbar.severity === "success" ? "Success" : "Error"}
          </AlertTitle>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
