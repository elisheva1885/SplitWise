import { useState } from "react";
import { loginUser, registerUser } from "../api/auth-api";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import { RegisterForm } from "../components/register-form";
import { useUserContext } from "../store/use-user.context";
import { LoginForm } from "./login-form";
type AuthMode = "register" | "login";


export const Auth = ({ mode }: { mode: AuthMode }) => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const { setUser } = useUserContext();

    const handleSubmit = async (data: any) => {
        setError("");
        setSuccess("");
        try {
            const userData =
                mode === "login"
                    ? await loginUser(data)
                    : await registerUser(data);

            setUser(userData);
            setSuccess(
                mode === "login"
                    ? "Logged in successfully"
                    : "Registered successfully"
            );
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
            {mode === "register" ? (
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
