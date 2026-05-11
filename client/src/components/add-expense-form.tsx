import Button from "@mui/material/Button"
import Select, { type SelectChangeEvent } from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import type { GroupData } from "../types/group.types"
import MenuItem from "@mui/material/MenuItem"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AddExpenseSchema, type AddExpenseData } from "../schemas/expense-schema"
type AddExpensesFromProps = {
    group: GroupData | null;
    onSubmit: (data: AddExpenseData)=> void;
};
export const AddExpensesFrom = ({
    group , onSubmit
}: AddExpensesFromProps) => {
    const [userToAdd, setUserToAdd] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setUserToAdd(event.target.value as string);
    };
    const 
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<AddExpenseData>({
        resolver: zodResolver(AddExpenseSchema),
        mode: "onChange",
      });
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                type="text"
                size="small"
                {...register("cause")}
                error={!!errors.cause}
                helperText={errors.cause?.message}
            />
              <TextField
                type="number"
                size="small"
                {...register("value")}
                error={!!errors.value}
                helperText={errors.value?.message}
            />
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userToAdd}
                label="User"
                onChange={handleChange}
                sx={{ color: 'green' }}
            >
                {group?.members.map(member => {
                    return <MenuItem value={member.id} sx={{ color: 'green' }}>{member.username}</MenuItem>
                })}
            </Select>
            <Button type="submit" sx={{ backgroundColor: "black", alignItems: "left" }} >
                Add Expense
            </Button>
        </form>
    )
}