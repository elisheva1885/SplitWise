import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../store/use-user.context";
import {
  UpdateUserSchema,
  type UpdateUserSchemaData,
} from "../schemas/user.schema";
import DeleteIcon from "@mui/icons-material/Delete";
import type { UpdateUserDto } from "../types/user.types";
import { Box } from "@mui/material";

type UpdateUserFormProps = {
  onSubmit: (data: UpdateUserDto) => Promise<void>;
  onDelete: () => Promise<void>;
  loading: boolean;
};
export const UpdateUserForm = ({
  onSubmit,
  onDelete,
  loading,
}: UpdateUserFormProps) => {
  const { user } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserSchemaData>({
    resolver: zodResolver(UpdateUserSchema),
    mode: "onChange",
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
    },
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Typography variant="h5" sx={{ color: "white" }}>
          Update Profile
        </Typography>
        <TextField
          type="text"
          size="small"
          variant="outlined"
          label="Username"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          type="email"
          size="small"
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button type="submit" disabled={loading}>
            {" "}
            {loading ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            color="error"
            onClick={onDelete}
            startIcon={<DeleteIcon />}
            disabled={loading}
            type="button"
          >
            Delete Account
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
