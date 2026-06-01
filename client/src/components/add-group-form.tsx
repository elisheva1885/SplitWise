import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { AddGroupSchema, type AddGroupData } from "../schemas/group.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";

type AddGroupFormProps = {
  onSubmit: (data: AddGroupData) => void;
};

export const AddGroupForm = ({ onSubmit }: AddGroupFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors},
  } = useForm<AddGroupData>({
    resolver: zodResolver(AddGroupSchema),
    mode: "onChange",
  });
  const submit = (data: AddGroupData) => {
    onSubmit(data);
    reset();
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(submit)}
      sx={{
        backgroundColor: "#4f7362",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
      }}
    >
      <Typography sx={{ color: "white" }}>Add Group</Typography>
      <TextField
        type="text"
        size="small"
        label="Group Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        type="text"
        size="medium"
        label="Description"
        {...register("description")}
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      <Box sx={{ height: "100%" }}>
        <Button type="submit" sx={{ backgroundColor: "black" }}>
          Add
        </Button>
      </Box>
    </Box>
  );
};
