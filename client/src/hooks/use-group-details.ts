import { useState } from "react";
import { handleApiError } from "../helpers/handle-api-error.helper";
import { addUserToGroup, deleteGroup, deleteUserFromGroup, getGroupDetails, updateGroup, updateGroupOwner } from "../api/group.api";
import type { UpdateGroupData } from "../schemas/group-schemas";
import { useUserContext } from "../store/use-user.context";
import { useGroupContext } from "../store/use-group.context";
import { useNavigate } from "react-router-dom";
import type { SnackbarState } from "../types/snackbar.types";
import type { GroupData } from "../types/group.types";

export const useGroupDetails = () => {
    const [group, setGroup] = useState<GroupData | null>(null);
    const [loadingGroup, setLoadingGroup] = useState(false);
    const [loadingAddMember, setLoadingAddMember] = useState(false);
    const [loadingUpdateGroup, setLoadingUpdateGroup] = useState(false);
    const [loadingDeleteGroup, setLoadingDeleteGroup] = useState(false);
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        severity: "success",
        message: "",
    });
    const { groups, setGroups } = useGroupContext()
    const { user } = useUserContext()
    const isOwner = user?.id === group?.owner?.id;
    const navigate = useNavigate()

    const getGroupDetailsById = async (id: number) => {
        try {
            setLoadingGroup(true);
            const data = await getGroupDetails(id);
            setGroup(data);

        } catch (err) {
            setSnackbar({
                open: true,
                severity: "error",
                message: handleApiError(err),
            });
        } finally {
            setLoadingGroup(false);
        }
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
    const deleteGroupData = async () => {
        if (!group?.id) {
            setSnackbar({
                open: true,
                severity: "error",
                message: "Group not loaded",
            });
            return;
        }
        try {
            setLoadingDeleteGroup(true);
            const data = await deleteGroup(group?.id);
            setSnackbar({
                open: true,
                severity: "success",
                message: "group deleted successfully!",
            });
            const filteredGroups = groups.filter(group =>
                group.id !== data
            )
            setGroups(filteredGroups);
            navigate('/groups')
        } catch (err) {
            setSnackbar({
                open: true,
                severity: "error",
                message: handleApiError(err),
            });
        } finally {
            setLoadingDeleteGroup(false);
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
     const updateToGroupOwner = async (userId: number) => {
        alert('in')    
        try {
                if (!group?.id) {
                    setSnackbar({
                        open: true,
                        severity: "error",
                        message: "Group not loaded",
                    });
                    return;
                }
                // setLoading(true);
    
                const data = await updateGroupOwner(group?.id, userId);
                setGroup(data);
                setSnackbar({
                    open: true,
                    severity: "success",
                    message: "group admin updated successfully!",
                });
            } catch (err) {
                setSnackbar({
                    open: true,
                    severity: "error",
                    message: handleApiError(err),
                });
            } finally {
                // setLoading(false);
            }
        };
           const deleteGroupMember = async (userId: number) => {
                try {
                    if (!group?.id) {
                        setSnackbar({
                            open: true,
                            severity: "error",
                            message: "Group not loaded",
                        });
                        return;
                    }
                    // setLoading(true);
                    const data = await deleteUserFromGroup(group?.id, userId);
                    setSnackbar({
                        open: true,
                        severity: "success",
                        message: "User removed successfully!",
                    });
                    // group = data;
                    setGroup(data);
                } catch (err) {
                    setSnackbar({
                        open: true,
                        severity: "error",
                        message: handleApiError(err),
                    });
                } finally {
                    // setLoading(false);
                }
            };

    return {
        snackbar, setSnackbar,
        group,
        loadingGroup,
        loadingAddMember,
        loadingUpdateGroup,
        loadingDeleteGroup,
        isOwner,
        actions: {
            getGroupDetailsById,
            addGroupMember,
            deleteGroupData,
            updateGroupDetails,
            updateToGroupOwner,
            deleteGroupMember
        }
    }

}  
