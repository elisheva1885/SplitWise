import { useState } from "react";
import { loginUser, registerUser } from "../api/auth.api";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import { RegisterForm } from "../components/register-form";
import { useUserContext } from "../store/use-user.context";
import { LoginForm } from "../components/login-form";
import type { LoginData, RegisterData } from "../schemas/auth-schemas";
import type { AuthPagemMode } from "../types/auth.types";
type AuthPageProps = {
  mode: AuthPagemMode;
  toRegisterMode: () => void;
  toForgetPasswordMode: () => void;
  toLoginMode: () => void;
  setDialogOpen: (open: boolean) => void;
};

export const AuthPage = ({
  mode,
  toRegisterMode,
  toForgetPasswordMode,
  setDialogOpen,
  toLoginMode,
}: AuthPageProps) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const { setUser } = useUserContext();

  const handleSubmit = async (data: LoginData | RegisterData) => {
    try {
      if (mode === "Login") {
        const userData = await loginUser(data as LoginData);
        setUser(userData);
        setSuccess("Logged in successfully");
      } else {
        const userData = await registerUser(data as RegisterData);
        setUser(userData);
        setSuccess("Registered successfully");
      }
      setTimeout(() => {
        setDialogOpen(false);
      }, 450);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || err.message;
        setError(message);
      } else {
        setError("Something went wrong");
      }
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {mode === "Register" ? (
        <RegisterForm onSubmit={handleSubmit} toLoginMode={toLoginMode} />
      ) : (
        <LoginForm
          onSubmit={handleSubmit}
          toForgetPasswordMode={toForgetPasswordMode}
          toRegisterMode={toRegisterMode}
        />
      )}
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        {success ? (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {success}{" "}
          </Alert>
        ) : (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}{" "}
          </Alert>
        )}
      </Snackbar>
    </>
  );
};
