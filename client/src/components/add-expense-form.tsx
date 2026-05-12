import Button from "@mui/material/Button";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import type { GroupData } from "../types/group.types";
import MenuItem from "@mui/material/MenuItem";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddExpenseSchema,
  type AddExpenseData,
} from "../schemas/expense-schema";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
type AddExpensesFromProps = {
  group: GroupData | null;
  onSubmit: (data: AddExpenseData) => void;
};
export const AddExpensesFrom = ({ group, onSubmit }: AddExpensesFromProps) => {
  const [userToAdd, setUserToAdd] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setUserToAdd(event.target.value as string);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddExpenseData>({
    resolver: zodResolver(AddExpenseSchema),
    mode: "onChange",

  });
  return (
    <Box component='form'
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 3,
        padding: '10px',
      }}
    >
      <Paper sx={{
        display: "flex",
        gap: 2,
        p: 1,
        alignItems: "center",
      }}>
        <Box sx={{ flex: 1.7 }}
        >
          <InputLabel sx={{ color: 'black' }}>cause</InputLabel>
          <TextField
            type="text"
            size="small"
            label='cause'
            {...register("cause")}
            error={!!errors.cause}
            helperText={errors.cause?.message}

          />
        </Box>
        <Box sx={{ flex: 0.8 }}
        >
          <InputLabel sx={{ color: 'black' }}>value</InputLabel>
          <TextField
            type="number"
            size="small"
            label="value"
            {...register("value", { valueAsNumber: true })}
            error={!!errors.value}
            helperText={errors.value?.message}
          />
        </Box>
        <Box sx={{ flex: 1, color: 'black' }}>
          <InputLabel sx={{ color: 'black' }}>Paid On</InputLabel>
          <Select
            value={userToAdd}
            {...register("paidOn")}
            label="Paid On"
            onChange={handleChange}
            sx={{ width: "100%" }}
          >
            {group?.members.map((member) => {
              return (
                <MenuItem value={member.id} sx={{ color: 'black' }}
                >
                  {member.username}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
        <Button type="submit" sx={{ backgroundColor: "black" }}>
          Add Expense
        </Button>
      </Paper>
    </Box>
  );
};
