import Box from "@mui/material/Box";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import EditIcon from "@mui/icons-material/Edit";
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
import { FormDialog } from "./form-dialog";
import { OptimizedExpensesList } from "./optimized-expenses-list";
import { ExpensesList } from "./expenses-list";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useRef } from "react";

export const GroupDetails = () => {
  const { id } = useParams();
  const { group } = useGroupContext();
  const owner = group?.owner;
  const [dialogType, setDialogType] = useState<
    "addUser" | "updateGroup" | null
  >(null);
  const {
    snackbar,
    handleCloseSnackbar,
    loadingGroup,
    loadingAddMember,
    loadingDeleteGroup,
    isOwner,
    actions,
  } = useGroupDetails();

  const { getGroupDetailsById } = actions;
  const groupMembersRef = useRef<HTMLDivElement | null>(null);
  const groupExpensesRef = useRef<HTMLDivElement | null>(null);
  const groupOptimizedExpensesRef = useRef<HTMLDivElement | null>(null);
  const handleScrollTogroupExpenses = () => {
    groupExpensesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };
  const handleScrollTogroupOptimizedExpenses = () => {
    groupOptimizedExpensesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };
  const handleScrollTogroupMembers = () => {
    groupMembersRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const handleCloseDialog = () => {
    setDialogType(null);
  };
  const [alignment, setAlignment] = useState("left");

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    if (!id) return;
    const fetchGroup = async () => {
      await getGroupDetailsById(Number(id));
    };
    fetchGroup();
  }, [id, getGroupDetailsById]);

  if (loadingGroup) {
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
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          top: 0,
          display: "flex",
          justifyContent: "center",
          py: 1.5,
          backgroundColor: "background.default",
          backdropFilter: "blur(6px)",
        }}
      >
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          sx={{ position: "fixed", backgroundColor: "white" }}
        >
          <ToggleButton
            value="Group_members"
            onClick={handleScrollTogroupMembers}
          >
            Group members
          </ToggleButton>
          <ToggleButton
            value="Group_Expenses"
            onClick={handleScrollTogroupExpenses}
          >
            Group Expenses
          </ToggleButton>
          <ToggleButton
            value="Group_Optimized_expenses"
            onClick={handleScrollTogroupOptimizedExpenses}
          >
            Group Optimized expenses
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 0.5,
          textAlign: "center",
          marginTop: 5
        }}
        ref={groupMembersRef}
      >
        <Typography sx={{ fontSize: "xx-large", padding: "8px" }}>
          {group?.name}
        </Typography>
        {isOwner && (
          <>
            <IconButton onClick={() => setDialogType("updateGroup")}>
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={actions.deleteGroupData}
              disabled={loadingDeleteGroup}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Card>

      {owner && (
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
                OWN
              </Typography>
            </Avatar>
          }
          label={owner.username}
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

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          gap: 3,
        }}
      >
        <GroupMembersList
          group={group}
          isOwner={isOwner}
          deleteGroupMember={actions.deleteGroupMember}
          updateToGroupOwner={actions.updateToGroupOwner}
        />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {isOwner && (
            <Fab
              onClick={() => setDialogType("addUser")}
              aria-label="Add group member"
              disabled={loadingAddMember}
            >
              <GroupAddIcon />
            </Fab>
          )}
        </Box>
        <Box ref={groupExpensesRef}>
          <ExpensesList />
        </Box>
        <Box ref={groupOptimizedExpensesRef}>
          <OptimizedExpensesList />
        </Box>
      </Box>

      <FormDialog
        open={dialogType === "addUser"}
        handleCloseDialog={handleCloseDialog}
      >
        <AddGroupMemberForm
          onSubmit={async (id) => {
            await actions.addGroupMember(id);
            setDialogType(null);
          }}
        />
      </FormDialog>
      <FormDialog
        open={dialogType === "updateGroup"}
        handleCloseDialog={handleCloseDialog}
      >
        <UpdateGroupForm
          onSubmit={async (data) => {
            await actions.updateGroupDetails(data);
            setDialogType(null);
          }}
        />
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
