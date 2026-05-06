import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgetPasswordSchema,
  type ForgetPasswordData,
} from "../schemas/auth-schemas";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import axios from "axios";
import { useState } from "react";

export const ForgetPasswordForm = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = async (data: ForgetPasswordData) => {
    setError("");
    setSuccess("");
    try {
      //add a call to the server
      setSuccess(`send message to your email ${data.email}`);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordData>({
    resolver: zodResolver(ForgetPasswordSchema),
    mode: "onChange",
  });

  return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ backgroundColor: "#2e3136" }}
      >
        <Typography sx={{ color: "white" }}>Forget Password</Typography>
        <InputLabel>Email</InputLabel>
        <TextField
          type="email"
          size="small"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <br />
        <Button type="submit" variant="contained">
          SUBMIT
        </Button>
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
      </form>
  );
};
