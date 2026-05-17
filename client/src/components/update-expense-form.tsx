import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type { ExpenseInGroup, UpdateExpenseData } from "../types/expense.type";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import type { UserInGroup } from "../types/user.types";
import { UpdateExpenseSchema } from "../schemas/expense-schema";

type UpdateExpenseFormProps = {
  onSubmit: (expense: ExpenseInGroup, data: UpdateExpenseData) => Promise<void>;
  expense: ExpenseInGroup | undefined;
  groupMembers: UserInGroup[] | undefined;
};

export const UpdateExpenseForm = ({
  onSubmit,
  expense,
  groupMembers,
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
      paidBy: expense?.paidBy.id ?? 0,
      paidOn: expense?.paidOn.id ?? 0,
    },
  });

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit((data) => {
          if (!expense?.id) return;
          onSubmit(expense, data);
        })}
        style={{ backgroundColor: "#405a4e" }}
      >
        <Typography sx={{ color: "white" }}>Update Group</Typography>
        <br />
        <InputLabel>Cause</InputLabel>
        <TextField
          type="text"
          size="small"
          variant="outlined"
          {...register("cause")}
          error={!!errors.cause}
          helperText={errors.cause?.message}
          defaultValue={expense?.cause}
        />
        <InputLabel>Value</InputLabel>
        <TextField
          type="text"
          size="medium"
          {...register("value", { valueAsNumber: true })}
          error={!!errors.value}
          helperText={errors.value?.message}
          defaultValue={expense?.value}
        />
        <br />
        <Box sx={{ flex: 1, color: "black" }}>
          <InputLabel sx={{ color: "black" }}>Paid By</InputLabel>
          <Controller
            name="paidBy"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Paid On" sx={{ width: "100%" }}>
                {groupMembers?.map((member) => {
                  return (
                    <MenuItem value={member.id} sx={{ color: "black" }}>
                      {member.username}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          />
        </Box>
        <br />
        <Box sx={{ flex: 1, color: "black" }}>
          <InputLabel sx={{ color: "black" }}>Paid On</InputLabel>
          <Controller
            name="paidOn"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Paid On" sx={{ width: "100%" }}>
                {groupMembers?.map((member) => {
                  return (
                    <MenuItem value={member.id} sx={{ color: "black" }}>
                      {member.username}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          />
        </Box>
        <Button type="submit">Save Changes</Button>
      </Box>
    </>
  );
};
