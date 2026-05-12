import { useState } from "react";
import { UpdateUserForm } from "../components/update-user-form";
import { useUserContext } from "../store/use-user.context";
import Snackbar from "@mui/material/Snackbar";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { deleteUser, updateUser } from "../api/user-api";
import type { UpdateUserDto } from "../types/user.types";
import { useNavigate } from "react-router";
import { handleApiError } from "../helpers/handle-api-error.helper";
import type { SnackbarState } from "../types/snackbar.types";
import { Box } from "@mui/material";

export const UserPage = () => {
  const { setUser, logout } = useUserContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "success",
    message: "",
  });
  const handleSubmit = async (data: UpdateUserDto) => {
    setLoading(true);

    try {
      const userData = await updateUser(data);
      setSnackbar({
        open: true,
        severity: "success",
        message: "Updated successfully!",
      });
      setUser(userData);
    } catch (err: unknown) {
      setSnackbar({
        open: true,
        severity: "error",
        message: handleApiError(err),
      });
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };
  const onDelete = async () => {
    setLoading(true);

    try {
      await deleteUser();
      setSnackbar({
        open: true,
        severity: "success",
        message: "Deleted successfully!",
      });
      logout();
      navigate("/");
    } catch (err: unknown) {
      setSnackbar({
        open: true,
        severity: "error",
        message: handleApiError(err),
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box>
      <UpdateUserForm
        onSubmit={handleSubmit}
        onDelete={onDelete}
        loading={loading}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert severity={snackbar.severity}>
          <AlertTitle>
            {" "}
            {snackbar.severity === "success" ? "Success" : "Error"}
          </AlertTitle>
          {snackbar.message}{" "}
        </Alert>
      </Snackbar>
    </Box>
  );
};
