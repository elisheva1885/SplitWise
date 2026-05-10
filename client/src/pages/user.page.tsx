import { useState } from "react";
import { UpdateUserForm } from "../components/update-user-form"
import { useUserContext } from "../store/use-user.context";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { deleteUser, updateUser } from "../api/user-api";
import type { UpdateUserDto } from "../types/user.types";
import { useNavigate } from "react-router";

export const UserPage = () => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [open, setOpen] = useState(false);
    const { setUser, logout } = useUserContext();
    const navigate = useNavigate();

    const handleSubmit = async (data: UpdateUserDto) => {
        setError('');
        setSuccess('');
        try {
            const userData = await updateUser(data);
            setSuccess("Updated successfully!");
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
    const handleDeleteUser = async () => {
        setError('');
        setSuccess('');
        try {
             await deleteUser();;
            setSuccess("delete successfully!");
            logout();
            navigate('/')
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