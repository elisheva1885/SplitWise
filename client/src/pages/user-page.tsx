import { useState } from "react";
import { UpdateUserForm } from "../components/update-user-form"
import { useUserContext } from "../store/use-user.context";
import type { UpdateUserDto } from "../types/user";
import axios from "axios";
import { updateUser } from "../api/auth-api";
import Snackbar from "@mui/material/Snackbar";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";

export const UserPage = () => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [open, setOpen] = useState(false);
    const { setUser } = useUserContext();

    const handleSubmit = async (data: UpdateUserDto) => {
        setError('');
        setSuccess('');
        try {
            const userData = await updateUser(data);
            setSuccess("Register successfully!");
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
    const handleDeleteUser=async()=>{
        alert('delete')
    }
    return (
        <>
            <UpdateUserForm onSubmit={handleSubmit} handleDeleteUser={handleDeleteUser} />
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