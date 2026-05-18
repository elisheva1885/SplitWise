import { useState } from "react";
import type { SnackbarState } from "../types/snackbar.types";

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "success",
    message: "",
  });

  const showSnackbar = (
    severity: SnackbarState["severity"],
    message: string,
  ) => {
    setSnackbar({
      open: true,
      severity,
      message,
    });
  };

  const showError = (message: string) => {
    showSnackbar("error", message);
  };

  const showSuccess = (message: string) => {
    showSnackbar("success", message);
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return {
    snackbar,
    showSnackbar,
    showError,
    showSuccess,
    handleCloseSnackbar,
  };
};