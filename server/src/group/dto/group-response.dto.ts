import { Expose, Type } from "class-transformer";
import { Expense } from "src/expense/expense.entity";

export class UserInGroupDto {
  @Expose()
  uuid!: number;
  @Expose()
  username!: string;
}



export class GroupResponseDto {
  @Expose()
  uuid!: number;
  @Expose()
  name!: string;
  @Expose()
  description?: string;
  @Expose()
  @Type(() => UserInGroupDto)
  owner!: UserInGroupDto;
  @Expose()
  @Type(() => UserInGroupDto)
  members!: UserInGroupDto[];
  @Expose()
  expenses?: Expense[];
}