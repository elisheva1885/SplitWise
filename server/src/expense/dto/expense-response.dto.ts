export class ExpenseResponseDto {
    id!:number;
    cause?: string;
    value!: number;
    paidBy!: number;
    paidOn!: number;
    groupId!: number;
}