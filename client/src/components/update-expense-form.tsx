import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type { ExpenseInGroup, UpdateExpenseData } from "../types/expense.type";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import type { UserInGroup } from "../types/user.types";
import { UpdateExpenseSchema } from "../schemas/expense-schema";
import { useEffect } from "react";

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
        reset,
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
    useEffect(() => {
        if (expense) {
            reset({
                cause: expense?.cause ?? "",
                value: expense?.value ?? 0,
                paidBy: expense?.paidBy.id ?? 0,
                paidOn: expense?.paidOn.id ?? 0,
            });
        }
    }, [expense, reset]);
    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit((data) => {
                    if (!expense?.id) return;
                    onSubmit(expense, data);
                })}
                sx={{
                    backgroundColor: "#405a4e", display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignContent: 'center', gap: 2  ,      padding: 2,

                }}
            >
                <Typography sx={{ color: "white" }}>Update Group</Typography>
                <TextField
                    type="text"
                    size="small"
                    variant="outlined"
                    label='cause'
                    {...register("cause")}
                    error={!!errors.cause}
                    helperText={errors.cause?.message}
                />
                <TextField
                    type="text"
                    size="medium"
                    label='value'
                    {...register("value", { valueAsNumber: true })}
                    error={!!errors.value}
                    helperText={errors.value?.message}
                />
                <Box sx={{ flex: 1, color: "black" }}>
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
                <Box sx={{ flex: 1, color: "black" }}>
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
