import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { getAllUsers } from "../api/user-api";
import { useEffect, useState, type FormEvent } from "react";
import type { UserToAdd } from "../types/user.types";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { handleApiError } from "../helpers/handle-api-error.helper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

type AddGroupMemberFormProps = {
  onSubmit: (userId: number) => void;
  setDialogOpen: (open: boolean) => void;
};

export const AddGroupMemberForm = ({
  onSubmit,
  setDialogOpen,
}: AddGroupMemberFormProps) => {
  const [users, setUsers] = useState<UserToAdd[] | []>([]);
  const [userId, setUserId] = useState<number>(0);
  const [options, setOptions] = useState<{ label: string; id: number }[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(Number(userId));
    setDialogOpen(false);
  };

  const getUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
      setOptions(
        data.map((user) => {
          return { label: user.username, id: user.id };
        }),
      );
    } catch (err: unknown) {
      setError(handleApiError(err));
      setOpenSnackbar(true);
    }
  };
  const handleClose = () => {
    setOpenSnackbar(false);
  };
  useEffect(() => {
    getUsers();
  }, [setUsers]);
  return (
    <>
      <form onSubmit={handleSubmit} style={{ backgroundColor: "#2e3136" }}>
        <Typography sx={{ color: "white" }}>Add User</Typography>
        {/* <FormControl fullWidth> */}
        {/* <InputLabel id="demo-simple-select-label">User</InputLabel> */}
        {/* <Autocomplete
                        // labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        // value={userId}
                        // label="User"
                        // onChange={handleChange}
                    > */}
        <Autocomplete
          options={options}
          sx={{ width: 300, alignItems: "center" }}
          onChange={(e, value) => setUserId(value?.id)}
          renderInput={(params) => <TextField {...params} label=" User" />}
        />
        {/* {users.map(user => {
                        return (
                            <MenuItem value={user.id}>{user.username}</MenuItem>
                        )
                    })} */}
        {/* </FormControl> */}
        <Button type="submit">Add</Button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          {success ? (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              {success}{" "}
            </Alert>
          ) : (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}{" "}
            </Alert>
          )}
        </Snackbar>
      </form>
    </>
  );
};
