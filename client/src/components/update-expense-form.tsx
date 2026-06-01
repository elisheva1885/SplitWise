import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type { ExpenseInGroup, UpdateExpenseData } from "../types/expense.type";
import Box from "@mui/material/Box";
import { UpdateExpenseSchema } from "../schemas/expense.schema";
import { MemberSelect } from "./member-select";

type UpdateExpenseFormProps = {
  onSubmit: (expense: ExpenseInGroup, data: UpdateExpenseData) => Promise<void>;
  expense: ExpenseInGroup | undefined;
};

export const UpdateExpenseForm = ({
  onSubmit,
  expense,
}: UpdateExpenseFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateExpenseData>({
    resolver: zodResolver(UpdateExpenseSchema),
    mode: "onChange",
    defaultValues: {
      cause: expense?.cause ?? "",
      value: expense?.value ?? 0,
      paidBy: expense?.paidBy.id ?? undefined,
      paidOn: expense?.paidOn.id ?? undefined,
    },
  });

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(async (data) => {
          if (!expense?.id) return;
          await onSubmit(expense, data);
        })}
        sx={{
          backgroundColor: "#405a4e",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          gap: 2.7,
          padding: 2,
        }}
      >
        <Typography sx={{ color: "white" }}>Update Expense</Typography>
        <TextField
          type="text"
          size="small"
          variant="outlined"
          label="Cause"
          {...register("cause")}
          error={!!errors.cause}
          helperText={errors.cause?.message}
        />
        <TextField
          size="small"
          label="Value"
          {...register("value", { valueAsNumber: true })}
          error={!!errors.value}
          helperText={errors.value?.message}
        />
        <Box sx={{ flex: 1, color: "black" }}>
          <MemberSelect
            name="paidBy"
            control={control}
            label="Paid By"
            background="#405a4e"
          />
        </Box>
        <Box sx={{ flex: 1, color: "black" }}>
          <MemberSelect
            name="paidOn"
            control={control}
            label="Paid On"
            background="#405a4e"
          />
        </Box>
        <Button type="submit">Save Changes</Button>
      </Box>
    </>
  );
};
