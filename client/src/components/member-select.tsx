import Select from "@mui/material/Select";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useGroupContext } from "../store/use-group.context";
import MenuItem from "@mui/material/MenuItem";
type MemberSelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
};
export const MemberSelect = <T extends FieldValues>({
  name,
  control,
  label,
}: MemberSelectProps<T>) => {
  const { group } = useGroupContext();
  const groupMembers = group?.members;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select {...field} label={label} sx={{ width: "100%" }}>
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
  );
};
