import Button from "@mui/material/Button";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddExpenseSchema,
  type AddExpenseData,
} from "../schemas/expense-schema";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useGroupContext } from "../store/use-group.context";
type AddExpensesFromProps = {
  onSubmit: (data: AddExpenseData) => void;
};
export const AddExpensesFrom = ({ onSubmit }: AddExpensesFromProps) => {
  const [userToAdd, setUserToAdd] = useState("");
  const { group } = useGroupContext()
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
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 3,
        padding: 2,
      }}
    >
      <Paper
        sx={{
          display: "flex",
          gap: 2,
          p: 1,
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1.7 }}>
          <TextField
            type="text"
            size="small"
            label="cause"
            {...register("cause")}
            error={!!errors.cause}
            helperText={errors.cause?.message}
            sx={{ width: "100%", '& .MuiInputBase-input': { height: '25px' } }}
          />
        </Box>
        <Box sx={{ flex: 0.8 }}>
          <TextField
            type="number"
            size="small"
            label="value"
            {...register("value", { valueAsNumber: true })}
            error={!!errors.value}
            helperText={errors.value?.message}
            sx={{ width: "100%", '& .MuiInputBase-input': { height: '25px' } }}
          />
        </Box>
        <Box sx={{ flex: 1, color: "black" }}>
          <Select
            value={userToAdd}
            {...register("paidOn")}
            label="Paid On"
            onChange={handleChange}
            sx={{
              width: "100%", height: '41.5px', "& .MuiInputLabel-root": {
                color: "black",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "black",
              },
            }}
          >
            {group?.members.map((member) => {
              return (
                <MenuItem value={member.id} sx={{ color: "black" }}>
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
