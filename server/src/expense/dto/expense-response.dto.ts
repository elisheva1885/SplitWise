export class ExpenseResponseDto {
  id!: number;
  cause?: string;
  value!: number;
  paidBy!: UserDetails;
  paidOn!: UserDetails;
}

export class UserDetails {
  id!: number;
  username!: string;
}

export class BalanceExpenseResponse {
  paidByUser!: UserDetails;
  paidOnUser!: UserDetails;
  value!: number;
}
