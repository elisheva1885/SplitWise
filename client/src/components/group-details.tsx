import Box from "@mui/material/Box";
import type { GroupData } from "../types/group.types";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import Avatar from "@mui/material/Avatar";
import {
  addUserToGroup,
  getGroupDetails,
  updateGroup,
} from "../api/group.api";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import { AddGroupMemberForm } from "./add-group-member-form";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { UpdateGroupForm } from "./update-group-form";
import Typography from "@mui/material/Typography";
import { handleApiError } from "../helpers/handle-api-error.helper";
import { GroupMembersList } from "./group-members-list";
import type { UpdateGroupData } from "../schemas/group-schemas";
import type { SnackbarState } from "../types/snackbar.types";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import Fab from "@mui/material/Fab";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";

export const GroupDetails = () => {
  const { id } = useParams();
  const [group, setGroup] = useState<GroupData | null>(null);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [updateUserDialog, setUpdateUserDialog] = useState(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [loadingGroup, setLoadingGroup] = useState(false);
  const [loadingAddMember, setLoadingAddMember] = useState(false);
  const [loadingUpdateGroup, setLoadingUpdateGroup] = useState(false);

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "success",
    message: "",
  });

  const getGroupDetailsById = useCallback(async (id: number) => {
    try {
      setLoadingGroup(true);
      const data = await getGroupDetails(id);
      setGroup(data);
      setIsOwner(id === data.owner.id);
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message: handleApiError(err),
      });
    } finally {
      setLoadingGroup(false);
    }
  }, []);

  const handleCloseDialog = () => {
    setOpenAddUserDialog(false);
    setUpdateUserDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const addGroupMember = async (userId: number) => {
    if (!group?.id) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Group not loaded",
      });
      return;
    }
    try {
      setLoadingAddMember(true);
      const data = await addUserToGroup(group.id, userId);
      setGroup(data);
      setSnackbar({
        open: true,
        severity: "success",
        message: "User added successfully!",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message: handleApiError(err),
      });
    } finally {
      setLoadingAddMember(false);
    }
  };

  const updateGroupDetails = async (groupData: UpdateGroupData) => {
    if (!group?.id) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Group not loaded",
      });

      return;
    }
    try {
      setLoadingUpdateGroup(true);
      const data = await updateGroup(group.id, groupData);
      setGroup(data);
      setSnackbar({
        open: true,
        severity: "success",
        message: "Group updated successfully!",
      });
      setUpdateUserDialog(false);
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message: handleApiError(err),
      });
    } finally {
      setLoadingUpdateGroup(false);
    }
  };

  const updateGroupInfo = () => {
    setUpdateUserDialog(true);
  };

  useEffect(() => {
    if (!id) return;
      const fetchGroup = async () => {
    await getGroupDetailsById(Number(id));
  };
  fetchGroup()
  }, [id, getGroupDetailsById]);

  if (loadingGroup && !group) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: "xx-large" }}>
          {group?.name}
        </Typography>
        <IconButton>
          {isOwner && (
            <EditIcon
              onClick={updateGroupInfo}
              sx={{
                cursor: loadingUpdateGroup ? "default" : "pointer",
                opacity: loadingUpdateGroup ? 0.5 : 1,
              }}
            />
          )}
        </IconButton>
      </Card>

      {group?.owner && (
        <Chip
          avatar={
            <Avatar
              sx={{
                backgroundColor: "black",
                width: "70px",
                height: "70px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "x-small",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                OWNER
              </Typography>
            </Avatar>
          }
          label={group?.owner.username}
          sx={{
            height: "44px",
            px: 1,
            "& .MuiChip-avatar": {
              width: 38,
              height: 38,
              borderRadius: "16px",
            },
          }}
          variant="outlined"
        ></Chip>
      )}

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        <GroupMembersList
          group={group}
          setGroup={setGroup}
          isOwner={isOwner}
          setIsOwner={setIsOwner}
        />
      </Box>

      {isOwner && (
        <Fab
          onClick={() => setOpenAddUserDialog(true)}
          aria-label="Add group member"
          disabled={loadingAddMember}
        >
          {loadingAddMember ? (
            <CircularProgress size={20} />
          ) : (
            <GroupAddIcon />
          )}
        </Fab>
      )}

      <Dialog open={openAddUserDialog} onClose={handleCloseDialog}>
        <Box style={{ backgroundColor: "#2e3136" }}>
          <CloseIcon
            onClick={handleCloseDialog}
            sx={{
              backgroundColor: "#2e3136",
              color: "white",
              position: "absolute",
              insetInlineEnd: 3,
              cursor: "pointer",
            }}
          />

          <Box sx={{ textAlign: "center", padding: "8px" }}>
            <AddGroupMemberForm
              setDialogOpen={setOpenAddUserDialog}
              onSubmit={addGroupMember}
            />
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
              cursor: "pointer",
            }}
          />
          <Box sx={{ textAlign: "center", padding: "8px" }}>
            <UpdateGroupForm
              setDialogOpen={setUpdateUserDialog}
              onSubmit={updateGroupDetails}
              group={group}
            />
          </Box>
        </Box>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbar.severity}>
          <AlertTitle>
            {snackbar.severity === "success"
              ? "Success"
              : "Error"}
          </AlertTitle>

          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};