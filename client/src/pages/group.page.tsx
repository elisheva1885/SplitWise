import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import { useGroupContext } from "../store/use-group.context";
import { getUserDetails } from "../api/user.api";
import { Outlet, useNavigate, useParams } from "react-router";
import { AddGroupForm } from "../components/add-group-form";
import { createGroup } from "../api/group.api";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import type { AddGroupData } from "../schemas/group.schemas";
import { handleApiError } from "../helpers/handle-api-error.helper";
import CircularProgress from "@mui/material/CircularProgress";
import { GroupDrawerList } from "../components/group-drawer";
import { FormDialog } from "../components/form-dialog";
import { useSnackbar } from "../hooks/use-snackbar";
export const GroupPage = () => {
  const { groups, setGroups } = useGroupContext();
  const navigate = useNavigate();
  const {id} = useParams();
  const [open, setOpen] = useState(false);
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [getLoading, setGetLoading] = useState<boolean>(false);

  const {
    snackbar,
    showError,
    showSuccess,
    handleCloseSnackbar,
  } = useSnackbar();

  const addGroup = async (groupData: AddGroupData) => {
    try {
      setAddLoading(true);
      const data = await createGroup(groupData);
      setGroups([...groups, data]);
      showSuccess("Group created successfully!")
    } catch (err) {
        showError(handleApiError(err));
      } finally {
      setAddLoading(false);
      setOpen(false);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getGroups = async () => {
      try {
        setGetLoading(true);
        const data = await getUserDetails();
        setGroups(data.groups);
      }catch (err) {
        showError(handleApiError(err));
      } finally {
        setGetLoading(false);
      }
    };
    getGroups();
  }, [setGroups, showError]);
useEffect(() => {
  if (!groups.length) return;

  const currentId = Number(id);

  if (!currentId) {
    navigate(`/groups/${groups[0].id}`);
  }
}, [groups, id, navigate]);
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
              marginTop: "60px",
            },
          }}
          ModalProps={{ disablePortal: true }}
        >
          <GroupDrawerList setOpen={setOpen} addLoading={addLoading} />
        </Drawer>
      )}
      <Box sx={{ marginLeft: {
        xs:'160px', md: '260px'}, padding: '16px', maxWidth: '100%' }}>
        <Outlet />
      </Box>
      <FormDialog open={open} handleCloseDialog={handleCloseDialog}>
        <AddGroupForm onSubmit={addGroup} />
      </FormDialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
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
