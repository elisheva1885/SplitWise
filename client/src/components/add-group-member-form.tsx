import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getAllUsers } from "../api/user.api";
import { useCallback, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { handleApiError } from "../helpers/handle-api-error.helper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import { useSnackbar } from "../hooks/use-snackbar";

type AddGroupMemberFormProps = {
  onSubmit: (userId: number) => void;
};

export const AddGroupMemberForm = ({ onSubmit }: AddGroupMemberFormProps) => {
  const [userId, setUserId] = useState<number>(0);
  const [options, setOptions] = useState<{ label: string; id: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const {
    snackbar,
    showError,
    handleCloseSnackbar,
  } = useSnackbar();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!userId) return;
    try {
      onSubmit(userId);
    } catch (err) {
      showError(handleApiError(err));
    }
  };

  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllUsers(inputValue);
      setOptions(
        data.map((user) => {
          return { label: user.username, id: user.id };
        }),
      );
    } catch (err) {
      showError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, [inputValue, showError]);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      getUsers();
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue, getUsers]);
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: "#4f7362",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography sx={{ color: "white", marginTop: 2 }}>Add User</Typography>
      <Autocomplete
        options={options}
        sx={{ width: 300, alignItems: "center" }}
        onChange={(_, value) => setUserId(value?.id ?? 0)}
        renderInput={(params) => <TextField {...params} label=" User" />}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
        }}
      />
      <Button type="submit" disabled={loading}>
        Add
      </Button>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbar.severity}>
          <AlertTitle>
            {snackbar.severity === "success" ? "Success" : "Error"}
          </AlertTitle>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
