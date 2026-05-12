import Box from "@mui/material/Box";
import type { GroupData } from "../types/group.types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { addUserToGroup, getGroupDetails, updateGroup } from "../api/group.api";
import Button from "@mui/material/Button";
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
import { useUserContext } from "../store/use-user.context";
import type { UpdateGroupData } from "../schemas/group-schemas";
import type { SnackbarState } from "../types/snackbar.types";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import Fab from "@mui/material/Fab";
import Chip from "@mui/material/Chip";
import { getOptimizedExpenses } from "../api/expense.api";
import { ExpensesList } from "./expenses-list";
import { OptimizedExpensesList } from "./optimized-expenses-list";
import type { OptimizedExpense } from "../types/expense.type";

export const GroupDetails = () => {
  const { id } = useParams();

  const [group, setGroup] = useState<GroupData | null>(null);
  const [expenses, setExpenses] = useState<OptimizedExpense[] | null>(null);

  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [updateUserDialog, setUpdateUserDialog] = useState(false);

  const { user } = useUserContext();

  const [isOwner, setIsOwner] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "success",
    message: "",
  });

  const getGroupDetailsById = async (id: number) => {
    try {
      setLoading(true);
      const data = await getGroupDetails(id);
      setGroup(data);
      setIsOwner(user?.id === data.owner.id);
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
      setLoading(true);

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
      setLoading(false);
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
      setLoading(true);

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
      setLoading(false);
    }
  };

  const updateGroupInfo = () => {
    setUpdateUserDialog(true);
  };

  const getGroupOptimizedExpense = async () => {
    if (!group?.id) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Group not loaded",
      });

      return;
    }
    try {
      setLoading(true);
      const data = await getOptimizedExpenses(group?.id);
      setExpenses(data);
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

  useEffect(() => {
    if (!id) return;

    getGroupDetailsById(Number(id));
  }, [id]);
  useEffect(() => {
    if (group?.id) {
      getGroupOptimizedExpense();
    }
  }, [group?.id]);

  if (loading && !group) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
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
        <Typography sx={{ fontSize: "xx-large" }}>{group?.name}</Typography>

        {isOwner && (
          <EditIcon
            onClick={updateGroupInfo}
            sx={{
              cursor: loading ? "default" : "pointer",
              opacity: loading ? 0.5 : 1,
            }}
          />
        )}
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
  
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent:'center' }}>
        <GroupMembersList
          group={group}
          setGroup={setGroup}
          isOwner={isOwner}
          setIsOwner={setIsOwner}
        />
        
      {isOwner && (
        <Fab
          onClick={() => setOpenAddUserDialog(true)}
          aria-label="Add group member"
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : <GroupAddIcon />}
        </Fab>
      )}
        <ExpensesList group={group} setGroup={setGroup} />

        <OptimizedExpensesList
          expenses={expenses}
          groupId={group?.id}
          setGroup={setGroup}
        />
      </Box>


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

          <br />

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

          <br />

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
            {snackbar.severity === "success" ? "Success" : "Error"}
          </AlertTitle>

          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
