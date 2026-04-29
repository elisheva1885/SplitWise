import { useState } from "react";
import { LoginForm } from "../components/login-form"
import type { LoginFormData } from "../types/auth.types"
import { loginUser, registerUser } from "../api/auth-api";
import type { LoginData, RegisterData } from "../schemas/auth-schemas";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Button from "@mui/material/Button";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import { useUserContext } from "../store/user.context";
import { RegisterForm } from "../components/register-form";


export const RegisterPage = () => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [open, setOpen] = useState(false);
    const { setUser } = useUserContext();

    const handleSubmit = async (data: RegisterData) => {
        setError('');
        setSuccess('');
        try {
            const userData = await registerUser(data)
            setSuccess('Register success');
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
            <RegisterForm onSubmit={handleSubmit} />
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