import Button from "@mui/material/Button"
import Select, { type SelectChangeEvent } from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import type { GroupData } from "../types/group.types"
import MenuItem from "@mui/material/MenuItem"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AddExpenseSchema, type AddExpenseData } from "../schemas/expense-schema"
import InputLabel from "@mui/material/InputLabel"
import Box from "@mui/material/Box"
type AddExpensesFromProps = {
    group: GroupData | null;
    onSubmit: (data: AddExpenseData) => void;
};
export const AddExpensesFrom = ({
    group, onSubmit
}: AddExpensesFromProps) => {
    const [userToAdd, setUserToAdd] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setUserToAdd(event.target.value as string);
    };
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<AddExpenseData>({
        resolver: zodResolver(AddExpenseSchema),
        mode: "onChange",
    });
    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ backgroundColor: 'gray', display: 'flex', justifyContent: 'center' }}>
            <Box>
                <InputLabel>cause</InputLabel>
                <TextField
                    type="text"
                    size="small"
                    {...register("cause")}
                    error={!!errors.cause}
                    helperText={errors.cause?.message}
                />
            </Box>
            <Box>
                <InputLabel>value</InputLabel>
                <TextField
                    type="number"
                    size="small"
                    {...register("value", { valueAsNumber: true })}
                    error={!!errors.value}
                    helperText={errors.value?.message}
                />
            </Box>
            <Box>
                <InputLabel>Paid On</InputLabel>
                <Select
                    value={userToAdd}
                    {...register("paidOn")}
                    label="User"
                    onChange={handleChange}
                    sx={{ color: 'green' }}
                >
                    {group?.members.map(member => {
                        return <MenuItem value={member.id} sx={{ color: 'green' }}>{member.username}</MenuItem>
                    })}
                </Select>
            </Box>
            <Button type="submit" sx={{ backgroundColor: "black" }} >
                Add Expense
            </Button>
        </form>
    )
}