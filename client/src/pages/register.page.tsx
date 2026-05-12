import { useState } from "react";
import { registerUser } from "../api/auth.api";
import type { RegisterData } from "../schemas/auth-schemas";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import { RegisterForm } from "../components/register-form";
import { useUserContext } from "../store/use-user.context";
import type { SnackbarState } from "../types/snackbar.types";

type RegisterPageProps = {
  toLoginMode: () => void;
  setDialogOpen: (open: boolean) => void;
};

export const RegisterPage = ({
  toLoginMode,
  setDialogOpen,
}: RegisterPageProps) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "success",
    message: "",
  });

  const { setUser } = useUserContext();

  const handleSubmit = async (
    data: RegisterData,
  ) => {
    try {
      const userData = await registerUser(data);

      setUser(userData);

      setSnackbar({
        open: true,
        severity: "success",
        message: "Register successfully!",
      });

      setTimeout(() => {
        setDialogOpen(false);
      }, 450);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message || err.message;

        setSnackbar({
          open: true,
          severity: "error",
          message,
        });
      } else {
        setSnackbar({
          open: true,
          severity: "error",
          message: "Something went wrong",
        });
      }
    }
  };

  const handleClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <>
      <RegisterForm
        onSubmit={handleSubmit}
        toLoginMode={toLoginMode}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleClose}
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