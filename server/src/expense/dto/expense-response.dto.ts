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
