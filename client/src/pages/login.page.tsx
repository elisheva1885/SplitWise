import { useState } from "react";
import { LoginForm } from "../components/login-form"
import { loginUser } from "../api/auth-api";
import type { LoginData } from "../schemas/auth-schemas";
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import { useUserContext } from "../store/use-user.context";

type LoginPageProps = {
    toRegisterMode: () => void,
    toForgetPasswordMode: () => void,
    setDialogOpen: (open: boolean) => void

}

export const LoginPage = ({ toRegisterMode, toForgetPasswordMode,setDialogOpen }: LoginPageProps) => {
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
            setDialogOpen(false)
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
            <LoginForm onSubmit={handleSubmit} toRegisterMode={toRegisterMode} toForgetPasswordMode={toForgetPasswordMode} />
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
            >
                {success ? (
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        {success}
                    </Alert>
                ) : error ? (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                ) : undefined}
            </Snackbar>
        </>
    )
}