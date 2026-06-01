import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgetPasswordSchema,
  type ForgetPasswordData,
} from "../schemas/auth.schemas";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import { useSnackbar } from "../hooks/use-snackbar";

type ForgetPasswordProps = {
  toLoginMode: () => void;
  setDialogOpen: (open: boolean) => void;
};

export const ForgetPasswordForm = ({
  toLoginMode,
  setDialogOpen,
}: ForgetPasswordProps) => {
  const { snackbar, showSuccess, handleCloseSnackbar } = useSnackbar();
  const onSubmit = async (data: ForgetPasswordData) => {
    showSuccess(`send message to your email ${data.email}`);
    setTimeout(() => {
      setDialogOpen(false);
    }, 450);
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
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ backgroundColor: "#2e3136" }}
    >
      <Typography sx={{ color: "white" }}>Forget Password</Typography>

      <InputLabel sx={{ margin: "7px" }}>Email</InputLabel>

      <TextField
        type="email"
        size="small"
        {...register("email")}
        sx={{
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
          },
        }}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <br />
      <Button onClick={toLoginMode}>Login</Button>

      <Button type="submit">SUBMIT</Button>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbar.severity}>
          <AlertTitle>
            {snackbar.severity === "success" ? "Success" : "Error"}
          </AlertTitle>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
