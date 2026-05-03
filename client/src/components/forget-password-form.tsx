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
import type { ForgetPasswordFormData } from "../types/auth.types";

type ForgetPasswordProps = {
  onSubmit: (data: ForgetPasswordFormData) => void;
};

export const ForgetPasswordForm = ({ onSubmit }: ForgetPasswordProps) => {
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
      <Typography sx={{ color: "white" }}>Login</Typography>
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
    </form>
  );
};
