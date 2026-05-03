import { useState } from "react";
import { loginUser, registerUser } from "../api/auth-api";
import type { LoginData, RegisterData } from "../schemas/auth-schemas";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import { RegisterForm } from "../components/register-form";
import { useUserContext } from "../store/use-user.context";
import { LoginForm } from "./login-form";
type AuthMode = "register" | "login";

type FormValues = {
  username: string;
  password: string;
  email?: string;
};
export const Auth = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<AuthMode>("register");
  const { setUser } = useUserContext();

  const handleSubmit = async (data: FormValues) => {
    setError("");
    setSuccess("");
    try {
      const userData =
        mode === "register" ? await registerUser(data) : await loginUser(data);
      setSuccess("Register success");
      setUser(userData);
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
      {mode === "login" ? (
        <RegisterForm onSubmit={handleSubmit} />
      ) : (
        <LoginForm onSubmit={handleSubmit} />
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
