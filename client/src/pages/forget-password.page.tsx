import { useState } from "react";
import type { ForgetPasswordData } from "../schemas/auth-schemas";
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import { ForgetPasswordForm } from "../components/forget-password-form";


export const ForgetPasswordPage = () => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [open, setOpen] = useState(false);

    const handleSubmit = async (data: ForgetPasswordData) => {
        setError('');
        setSuccess('');
        try {
            setSuccess(`send message to your email ${data.email}`);

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
            <ForgetPasswordForm onSubmit={handleSubmit} />
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