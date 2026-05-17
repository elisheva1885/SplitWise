import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginData } from "../schemas/auth-schemas";
import type { LoginFormData } from "../types/auth.types";
import Box from "@mui/material/Box";

type LoginFormProps = {
  onSubmit: (data: LoginFormData) => void;
  toRegisterMode: () => void;
  toForgetPasswordMode: () => void;
};

export const LoginForm = ({
  onSubmit,
  toRegisterMode,
  toForgetPasswordMode,
}: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ backgroundColor: "#2e3136" }}
    >
      <Typography sx={{ color: "white" }}>Login</Typography>
      <InputLabel sx={{ margin: "7px" }}>username</InputLabel>
      <TextField
        fullWidth
        type="text"
        size="small"
        error={!!errors.username}
        helperText={errors.username?.message}
        {...register("username")}
      />
      <InputLabel sx={{ margin: "7px" }}>password</InputLabel>
      <TextField
        fullWidth
        type="password"
        size="small"
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register("password")}
      />
      <br />
      <Button onClick={toForgetPasswordMode}>Forget password</Button>
      <Button onClick={toRegisterMode}>Register</Button>
      <Button type="submit">Submit</Button>
    </Box>
  );
};
