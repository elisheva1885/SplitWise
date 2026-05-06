import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, type RegisterData } from "../schemas/auth-schemas";
import type { RegisterFormData } from "../types/auth.types";

type RegisterFormProps = {
  onSubmit: (data: RegisterFormData) => void;
};

export const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ backgroundColor: "#2e3136" }}
      >
        <Typography sx={{ color: "white" }}>Register</Typography>
        <br />
        <InputLabel>Username</InputLabel>
        <TextField
          fullWidth
          type="text"
          size="small"
          variant="outlined"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <InputLabel>Email</InputLabel>
        <TextField
          fullWidth
          type="email"
          size="small"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <InputLabel>Password</InputLabel>
        <TextField
          type="password"
          size="small"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <br />
        <Button type="submit">Register</Button>
      </form>
    </>
  );
};
