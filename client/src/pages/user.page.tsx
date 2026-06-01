import { useState } from "react";
import { UpdateUserForm } from "../components/update-user-form";
import { useUserContext } from "../store/use-user.context";
import Snackbar from "@mui/material/Snackbar";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { deleteUser, updateUser } from "../api/user.api";
import type { UpdateUserDto } from "../types/user.types";
import { useNavigate } from "react-router";
import { handleApiError } from "../helpers/handle-api-error.helper";
import { Box } from "@mui/material";
import { useSnackbar } from "../hooks/use-snackbar";

export const UserPage = () => {
  const { setUser, logout, user } = useUserContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { snackbar, showError, showSuccess, handleCloseSnackbar } =
    useSnackbar();
  const handleSubmit = async (data: UpdateUserDto) => {
    setLoading(true);
    if (data.username === user?.username && data.email === user?.email) {
      showError("you need to change one of the inputs before saving!");
      setLoading(false);
      return;
    }
    try {
      const userData = await updateUser(data);
      showSuccess("Updated successfully!");
      setUser(userData);
    } catch (err) {
      showError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    setLoading(true);

    try {
      await deleteUser();
      showSuccess("Deleted successfully!");
      logout();
      navigate("/");
    } catch (err) {
      showError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box sx={{ marginTop: "50px" }}>
      <UpdateUserForm
        onSubmit={handleSubmit}
        onDelete={onDelete}
        loading={loading}
      />
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
    </Box>
  );
};
