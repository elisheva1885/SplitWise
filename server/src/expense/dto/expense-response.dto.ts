import { Type } from "class-transformer";
import { UserInGroupDto } from "src/group/dto/group-response.dto";
import { User } from "src/user/user.entity";

export class ExpenseResponseDto {
    id!: number;
    cause?: string;
    value!: number;
    paidBy!: number;
    paidOn!: number;
    groupId!: number;
}

export class UserDetails {
    uuid!: number;
    username!: string;
}

export class BalanceExpenseResponse {
    paidByUser!: UserDetails;
    paidOnUser!: UserDetails;
    value!: number;
}
