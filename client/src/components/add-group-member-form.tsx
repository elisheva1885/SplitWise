import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { getAllUsers } from "../api/user-api";
import { useEffect, useState, type FormEvent } from "react";
import type { UserToAdd } from "../types/user.types";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type AddGroupMemberFormProps = {
  onSubmit: (userId: number) => void;
  setDialogOpen: (open: boolean) => void;
};

export const AddGroupMemberForm = ({
  onSubmit,
  setDialogOpen,
}: AddGroupMemberFormProps) => {
  const [users, setUsers] = useState<UserToAdd[] | []>([]);
  const [user, setUser] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setUser(event.target.value as string);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(Number(user));
    setDialogOpen(false);
  };

  const getUsers = async () => {
    const data = await getAllUsers();
    console.log("users ", data);
    setUsers(data);
  };
  useEffect(() => {
    getUsers();
  });
  return (
    <>
      <form onSubmit={handleSubmit} style={{ backgroundColor: "#2e3136" }}>
        <Typography sx={{ color: "white" }}>Add User</Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">User</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user}
            label="User"
            onChange={handleChange}
          >
            {users.map((user) => {
              return <MenuItem value={user.id}>{user.username}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </>
  );
};
