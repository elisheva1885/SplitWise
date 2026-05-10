import type { UserInExpense, UserInGroup } from "./user.types"

export type ExpenseInGroup = {
    id: number,
    cause: string,
    value: number,
    paidBy: UserInGroup,
    paidOn: UserInGroup
}


export type OptimizedExpense = {
        value: number,
    paidBy: UserInExpense,
    paidOn: UserInExpense
}