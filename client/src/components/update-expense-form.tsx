import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type { ExpenseInGroup, UpdateExpenseData } from "../types/expense.type";
import Box from "@mui/material/Box";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import type { UserInGroup } from "../types/user.types";
import { UpdateExpenseSchema } from "../schemas/expense-schema";

type UpdateExpenseFormProps = {
    onSubmit: (expenseId: number, data: UpdateExpenseData) => void;
      setDialogOpen: (open: boolean) => void;
    expense: ExpenseInGroup | undefined;
    groupMembers: UserInGroup[] | undefined
};

export const UpdateExpenseForm = ({
    onSubmit,
    expense,
    groupMembers
}: UpdateExpenseFormProps) => {
    const [paidBy, setPaidBy] = useState("");
    const [paidOn, setPaidOn] = useState("");

    const handleChangePaidBy = (event: SelectChangeEvent) => {
        setPaidBy(event.target.value as string);
    };
    const handleChangePaidOn = (event: SelectChangeEvent) => {
        setPaidOn(event.target.value as string);
    };
    const {
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
            <Box component='form'
                onSubmit={handleSubmit(onSubmit)}
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
                <Box sx={{ flex: 1, color: 'black' }}>
                    <InputLabel sx={{ color: 'black' }}>Paid By</InputLabel>
                    <Select
                        value={paidBy}
                        {...register("paidBy")}
                        label="Paid On"
                        onChange={handleChangePaidBy}
                        sx={{ width: "100%" }}
                    >
                        {groupMembers?.map((member) => {
                            return (
                                <MenuItem value={member.id} sx={{ color: 'black' }}
                                >
                                    {member.username}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </Box>
                <br />
                <Box sx={{ flex: 1, color: 'black' }}>
                    <InputLabel sx={{ color: 'black' }}>Paid On</InputLabel>
                    <Select
                        value={paidOn}
                        {...register("paidOn")}
                        label="Paid On"
                        onChange={handleChangePaidOn}
                        sx={{ width: "100%" }}
                    >
                        {groupMembers?.map((member) => {
                            return (
                                <MenuItem value={member.id} sx={{ color: 'black' }}
                                >
                                    {member.username}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </Box>
                <Button type="submit">Save Changes</Button>
            </Box>
        </>
    );
};
