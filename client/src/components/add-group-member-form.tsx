import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getAllUsers } from "../api/user.api";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { UserToAdd } from "../types/user.types";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { handleApiError } from "../helpers/handle-api-error.helper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import type { SnackbarState } from "../types/snackbar.types";

type AddGroupMemberFormProps = {
  onSubmit: (userId: number) => void;
  setDialogOpen: (open: boolean) => void;
};

export const AddGroupMemberForm = ({
  onSubmit,
  setDialogOpen,
}: AddGroupMemberFormProps) => {
  const [, setUsers] = useState<UserToAdd[] | []>([]);
  const [userId, setUserId] = useState<number>(0);
  const [options, setOptions] = useState<{ label: string; id: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "success",
    message: "",
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(Number(userId));
    setDialogOpen(false);
  };

  const getUsers = useCallback(async () => {
    try {
      const data = await getAllUsers(inputValue);
      setUsers(data);
      setOptions(
        data.map((user) => {
          return { label: user.username, id: user.id };
        }),
      );
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message: handleApiError(err),
      });
    } finally {
      setLoading(false);
    }
  }, [inputValue]);
  const handleClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      getUsers();
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue, getUsers]);
  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: "#2e3136" }}>
      <Typography sx={{ color: "white" }}>Add User</Typography>
      <Autocomplete
        options={options}
        sx={{ width: 300, alignItems: "center" }}
        onChange={(e, value) => setUserId(value?.id ?? 0)}
        renderInput={(params) => <TextField {...params} label=" User" />}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
      />
      <Button type="submit" disabled={loading}>
        Add
      </Button>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleClose}
      >
        <Alert severity={snackbar.severity}>
          <AlertTitle>
            {snackbar.severity === "success" ? "Success" : "Error"}
          </AlertTitle>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </form>
  );
};
