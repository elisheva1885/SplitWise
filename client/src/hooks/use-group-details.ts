import { useCallback, useState } from "react";
import { handleApiError } from "../helpers/handle-api-error.helper";
import {
  addUserToGroup,
  deleteGroup,
  deleteUserFromGroup,
  getGroupDetails,
  updateGroup,
  updateGroupOwner,
} from "../api/group.api";
import type { UpdateGroupData } from "../schemas/group-schemas";
import { useUserContext } from "../store/use-user.context";
import { useGroupContext } from "../store/use-group.context";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "./use-snackbar";

export const useGroupDetails = () => {
  const [loadingGroup, setLoadingGroup] = useState<boolean>(false);
  const [loadingAddMember, setLoadingAddMember] = useState<boolean>(false);
  const [loadingUpdateGroup, setLoadingUpdateGroup] = useState<boolean>(false);
  const [loadingDeleteGroup, setLoadingDeleteGroup] = useState<boolean>(false);
  const [loadingUpdateOwner, setLoadingUpdateOwner] = useState<boolean>(false);
  const [loadingDeleteMember, setLoadingDeleteMember] = useState<boolean>(false);
  const {
    snackbar,
    showError,
    showSuccess,
    handleCloseSnackbar,
  } = useSnackbar();

  const { groups, setGroups, group, setGroup, updateGroups } =
    useGroupContext();
  const { user } = useUserContext();

  const isOwner = user?.id === group?.owner?.id;

  const navigate = useNavigate();

  const getGroupDetailsById = useCallback(
    async (id: number) => {
      try {
        setLoadingGroup(true);
        const data = await getGroupDetails(id);
        setGroup(data);
      } catch (err) {
        showError(handleApiError(err));
      } finally {
        setLoadingGroup(false);
      }
    },
    [setGroup, showError],
  );

  const addGroupMember = async (userId: number) => {
    if (!group?.id) {
      showError("Group not loaded")
      return;
    }
    try {
      setLoadingAddMember(true);
      const data = await addUserToGroup(group.id, userId);
      setGroup(data);
      updateGroups(data);
      showSuccess("User added successfully!")
    } catch (err) {
      showError(handleApiError(err));
    } finally {
      setLoadingAddMember(false);
    }
  };

  const deleteGroupData = async () => {
    if (!group?.id) {
      showError("Group not loaded")
      return;
    }
    try {
      setLoadingDeleteGroup(true);
      const data = await deleteGroup(group.id);
      showError("Group deleted successfully!")
      const filteredGroups = groups.filter((group) => group.id !== data);
      setGroups(filteredGroups);
      navigate("/groups");
    } catch (err) {
      showError(handleApiError(err));
    } finally {
      setLoadingDeleteGroup(false);
    }
  };

  const updateGroupDetails = async (groupData: UpdateGroupData) => {
    if (
      groupData.name === group?.name &&
      groupData.description === group.description
    ) {
      showError("you need to change one of the inputs before saving!");
      return;
    }
    if (!group?.id) {
      showError("Group not loaded")
      return;
    }

    try {
      setLoadingUpdateGroup(true);
      const data = await updateGroup(group.id, groupData);
      updateGroups(data);
      showSuccess("Group updated successfully!")
    } catch (err) {
      showError(handleApiError(err));
    }
    finally {
      setLoadingUpdateGroup(false);
    }
  };

  const updateToGroupOwner = async (userId: number) => {
    if (!group?.id) {
      showError("Group not loaded")
      return;
    }
    try {
      setLoadingUpdateOwner(true);
      const data = await updateGroupOwner(group.id, userId);
      setGroup(data);
      updateGroups(data);
      showSuccess("Group admin updated successfully!")
    } catch (err) {
      showError(handleApiError(err));
    } finally {
      setLoadingUpdateOwner(false);
    }
  };

  const deleteGroupMember = async (userId: number) => {
    if (!group?.id) {
      showError("Group not loaded")
      return;
    }
    try {
      setLoadingDeleteMember(true);
      const data = await deleteUserFromGroup(group.id, userId);
      setGroup(data);
      updateGroups(data);
      showSuccess("User removed successfully!")
    } catch (err) {
      showError(handleApiError(err));
    } finally {
      setLoadingDeleteMember(false);
    }
  };



  return {
    snackbar,
    handleCloseSnackbar,
    loadingGroup,
    loadingAddMember,
    loadingUpdateGroup,
    loadingDeleteGroup,
    loadingUpdateOwner,
    loadingDeleteMember,
    isOwner,

    actions: {
      getGroupDetailsById,
      addGroupMember,
      deleteGroupData,
      updateGroupDetails,
      updateToGroupOwner,
      deleteGroupMember,
    },
  };
};
