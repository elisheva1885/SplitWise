import { useState } from "react";
import { registerUser } from "../api/auth-api";
import type { RegisterData } from "../schemas/auth-schemas";
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import { RegisterForm } from "../components/register-form";
import { useUserContext } from "../store/use-user.context";

type RegisterPageProps = {
    toLoginMode: () => void,
    setDialogOpen: (open: boolean) => void
}
export const RegisterPage = ({ toLoginMode, setDialogOpen }: RegisterPageProps) => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [open, setOpen] = useState(false);
    const { setUser } = useUserContext();

    const handleSubmit = async (data: RegisterData) => {
        setError('');
        setSuccess('');
        try {
            const userData = await registerUser(data);
            setSuccess("Register successfully!");
            setUser(userData);
            setTimeout(() => {
                setDialogOpen(false);
            }, 450);

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
            <RegisterForm onSubmit={handleSubmit} toLoginMode={toLoginMode} />
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