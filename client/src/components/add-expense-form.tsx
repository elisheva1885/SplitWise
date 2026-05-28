import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddExpenseSchema,
  type AddExpenseData,
} from "../schemas/expense.schema";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import { MemberSelect } from "./member-select";
import FormHelperText from "@mui/material/FormHelperText";
type AddExpensesFormProps = {
  onSubmit: (data: AddExpenseData) => void;
  loadingAddExpense: boolean
};
export const AddExpensesForm = ({ onSubmit, loadingAddExpense }: AddExpensesFormProps) => {

  const {
    control,
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
          backgroundColor: "#7fb49b",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 2,
          p: 1,
          alignItems: {
            xs: "stretch",
            md: "center",
          },

        }}
      >
        <Box sx={{ flex: 1.2 }}>
          <TextField
            type="text"
            size="small"
            label="cause"
            {...register("cause")}
            error={!!errors.cause}
            helperText={errors.cause?.message}
            sx={inputStyles}
          />
        </Box>
        <Box sx={{ flex: 0.8 }}>
          <TextField
            size="small"
            label="value"
            {...register("value", { valueAsNumber: true })}
            error={!!errors.value}
            helperText={errors.value?.message}
            sx={inputStyles}
          />
        </Box>
        <Box sx={{ flex: 1, color: "white" }}>
          <FormControl fullWidth size="small" error={!!errors.paidOn}
>
            <MemberSelect name="paidOn" control={control} label="Paid By" />
            <FormHelperText>{errors.paidOn?.message}</FormHelperText>
          </FormControl>
        </Box>
        <Button type="submit" sx={{ backgroundColor: "black" }} disabled={loadingAddExpense}>
          Add Expense
        </Button>
      </Paper>
    </Box>
  );
};

const inputStyles = {
  width: "100%",
  "& .MuiInputBase-input": {
    height: "100%",

  },

  "& .MuiOutlinedInput-root": {
    height: 40, 
    alignItems: "center",
  },

  "& .MuiInputLabel-root": {
    height: "100%",
    color: "white",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "white",
  },
};
