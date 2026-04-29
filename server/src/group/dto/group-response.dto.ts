import { Expose, Type } from 'class-transformer';

export class UserInGroupDto {
  @Expose()
  uuid!: number;
  @Expose()
  username!: string;
}

export class ExpenseInGroupDto {
  @Expose()
  uuid!: number;
  @Expose()
  cause?: string;
  @Expose()
  value!: number;
  @Expose()
  @Type(() => UserInGroupDto)
  paidBy!: UserInGroupDto;

  @Expose()
  @Type(() => UserInGroupDto)
  paidOn!: UserInGroupDto;
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
  @Type(() => ExpenseInGroupDto)
  expenses?: ExpenseInGroupDto[];
}

export class GroupResponseDto {
  id!: number;

  name!: string;

  owner!: UserInGroupDto;
}
