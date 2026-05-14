import Box from "@mui/material/Box";
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
import { GroupMembersList } from "./group-members-list";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import Fab from "@mui/material/Fab";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGroupDetails } from "../hooks/use-group-details";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { useGroupContext } from "../store/use-group.context";

export const GroupDetails = () => {
  const { id } = useParams();
  const {group} = useGroupContext()
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [updateUserDialog, setUpdateUserDialog] = useState(false);
  const {
    snackbar,
    handleCloseSnackbar,
    loadingGroup,
    loadingAddMember,
    loadingUpdateGroup,
    loadingDeleteGroup,
    isOwner,
    actions,
  } = useGroupDetails();
const getGroupDetailsById = actions.getGroupDetailsById;
  const handleCloseDialog = () => {
    setOpenAddUserDialog(false);
    setUpdateUserDialog(false);
  };


  const updateGroupInfo = () => {
    setUpdateUserDialog(true);
  };

  useEffect(() => {
    if (!id) return;
    const fetchGroup = async () => {
      await getGroupDetailsById(Number(id));
    };
    fetchGroup();
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2.5,
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 0.5,
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: "xx-large", padding: "8px" }}>
          {group?.name}
        </Typography>
        {isOwner && (
          <IconButton>
            <EditIcon
              onClick={updateGroupInfo}
              sx={{
                cursor: loadingUpdateGroup ? "default" : "pointer",
                opacity: loadingUpdateGroup ? 0.5 : 1,
              }}
            />
          </IconButton>
        )}
        {isOwner && (
          <IconButton disabled={loadingDeleteGroup}>
            <DeleteIcon
              onClick={actions.deleteGroupData}
              sx={{
                cursor: loadingUpdateGroup ? "default" : "pointer",
                opacity: loadingUpdateGroup ? 0.5 : 1,
              }}
            />
          </IconButton>
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

      <Box sx={{ width: "100%" }}>
        <GroupMembersList
          group={group}
          isOwner={isOwner}
          deleteGroupMember = {actions.deleteGroupMember}
          updateToGroupOwner = {actions.updateToGroupOwner}
          snackbar={snackbar}
          handleCloseSnackbar= {handleCloseSnackbar}
        />
      </Box>

      {isOwner && (
        <Fab
          onClick={() => setOpenAddUserDialog(true)}
          aria-label="Add group member"
          disabled={loadingAddMember}
        >
          {loadingAddMember ? <CircularProgress size={20} /> : <GroupAddIcon />}
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
              onSubmit={actions.addGroupMember}
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
              onSubmit={async (data) => {
                await actions.updateGroupDetails(data);
                setUpdateUserDialog(false);
              }}
              group={group}
            />
          </Box>
        </Box>
      </Dialog>

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
