import { Expose, Type } from 'class-transformer';
import { Expense } from 'src/expense/expense.entity';

export class UserInGroupDto {
  @Expose()
  uuid!: number;
  @Expose()
  username!: string;
}

export class FullGroupResponseDto {
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

export class GroupResponseDto {
  id!: number;

  name!: string;

  owner!: UserInGroupDto;
}
