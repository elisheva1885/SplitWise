import Select from "@mui/material/Select";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useGroupContext } from "../store/use-group.context";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";
type MemberSelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  background: string;
};
export const MemberSelect = <T extends FieldValues>({
  name,
  control,
  label,
  background,
}: MemberSelectProps<T>) => {
  const { group } = useGroupContext();
  const groupMembers = group?.members;
  return (
    <FormControl fullWidth size="small">
      <InputLabel
        sx={{
          color: "white",
          backgroundColor: background,
          px: 0.7,
        }}
      >
        {label}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select {...field} sx={{ width: "100%" }}>
            {groupMembers?.map((member) => {
              return (
                <MenuItem
                  value={member.id}
                  key={member.id}
                  sx={{ color: "black" }}
                >
                  {member.username}
                </MenuItem>
              );
            })}
          </Select>
        )}
      />
    </FormControl>
  );
};
