import { useState } from "react";
import { LoginForm } from "../components/login-form"
import type { LoginFormData } from "../types/auth.types"
import { loginUser } from "../api/auth-api";
import type { LoginData } from "../schemas/auth-schemas";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Button from "@mui/material/Button";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import { useUserContext } from "../store/user.context";


export const LoginPage = () => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [open, setOpen] = useState(false);
    const { setUser } = useUserContext();

    const handleSubmit = async (data: LoginData) => {
        setError('');
        setSuccess('');
        try {
            const userData = await loginUser(data)
            setSuccess('Logged in succesfully');
            setUser(userData);
        }
        catch (err: unknown) {
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
        setOpen(false)
    }
    return (
        <>
            <LoginForm onSubmit={handleSubmit} />
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
            >
                {success ? (< Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {success}        </Alert >) :
                    (< Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {error}        </Alert >)}
            </Snackbar>
        </>
    )
}