import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, type RegisterData } from "../schemas/auth-schemas";
import type { RegisterFormData } from "../types/auth.types";
import Box from "@mui/material/Box";

type RegisterFormProps = {
  onSubmit: (data: RegisterFormData) => void;
  toLoginMode: () => void;
};

export const RegisterForm = ({ onSubmit, toLoginMode }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography sx={{ color: "white" }}>Register</Typography>
      <br />
      <InputLabel sx={{ margin: "7px" }}>Username</InputLabel>
      <TextField
        fullWidth
        type="text"
        size="small"
        variant="outlined"
        {...register("username")}
        error={!!errors.username}
        helperText={errors.username?.message}
      />
      <InputLabel sx={{ margin: "7px" }}>Email</InputLabel>
      <TextField
        fullWidth
        type="email"
        size="small"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <InputLabel sx={{ margin: "7px" }}>Password</InputLabel>
      <TextField
        type="password"
        size="small"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Box>
        <Button onClick={toLoginMode}>Login</Button>
        <Button type="submit">Submit</Button>
      </Box>
    </form>
  );
};
