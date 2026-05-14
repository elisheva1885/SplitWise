import { Expose, Type } from 'class-transformer';

export class UserInGroupDto {
  @Expose({ name: 'uuid' })
  id!: number;
  @Expose()
  username!: string;
  @Expose()
  email!: string;
}

export class ExpenseInGroupDto {
  @Expose({ name: 'uuid' })
  id!: number;
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
  @Expose({ name: 'uuid' })
  id!: number;
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
