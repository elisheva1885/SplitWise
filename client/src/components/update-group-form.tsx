import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type { GroupData } from "../types/group.types";
import {
  UpdateGroupSchema,
  type UpdateGroupData,
} from "../schemas/group-schemas";
import { useEffect } from "react";

type AddGroupMemberFormProps = {
  onSubmit: (data: UpdateGroupData) => void;
  setDialogOpen: (open: boolean) => void;
  group: GroupData | null;
};

export const UpdateGroupForm = ({
  onSubmit,
  group,
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

  useEffect(() => {
    if (group) {
      reset({
        name: group.name,
        description: group.description || '',
      });
    }
  }, [group, reset]);
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ backgroundColor: "#405a4e" }}
      >
        <Typography sx={{ color: "white" }}>Update Group</Typography>
        <br />
        <InputLabel>Group Name</InputLabel>
        <TextField
          type="text"
          size="small"
          variant="outlined"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <InputLabel>Description</InputLabel>
        <TextField
          type="text"
          size="medium"
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <br />
        <Button type="submit">Save Changes</Button>
      </form>
    </>
  );
};
