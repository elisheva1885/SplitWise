import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  UpdateGroupSchema,
  type UpdateGroupData,
} from "../schemas/group-schemas";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import { useGroupContext } from "../store/use-group.context";

type AddGroupMemberFormProps = {
  onSubmit: (data: UpdateGroupData) => void;
};

export const UpdateGroupForm = ({
  onSubmit,
}: AddGroupMemberFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateGroupData>({
    resolver: zodResolver(UpdateGroupSchema),
    mode: "onChange",
  });
  const {group} = useGroupContext();
  useEffect(() => {
    if (group) {
      reset({
        name: group.name,
        description: group.description ,
      });
    }
  }, [group, reset]);
  return (
    <Box component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{ backgroundColor: "#405a4e" ,display: "flex", flexDirection: 'column', gap:3, padding: 2 }}
    >
      <Typography sx={{ color: "white" }}>Update Group</Typography>
      <TextField
        type="text"
        size="small"
        variant="outlined"
        label="Group Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        type="text"
        size="medium"
        {...register("description")}
        label='Description'
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <Button type="submit">Save Changes</Button>
    </Box>
  );
};
