import type { UserInGroup } from "./user.types"

export type ExpenseInGroup = {
    id: number,
    cause: string,
    value: number,
    paidBy: UserInGroup,
    paidOn: UserInGroup
}