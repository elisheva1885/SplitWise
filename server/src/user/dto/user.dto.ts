import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserResponseDto {
  id!: number;
  email!: string;
  username!: string;
}

export class GroupDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Admins' })
  name!: string;
}

export class GetUserResponseDto {
  user!: UserResponseDto;
  groups?: GroupDto[];
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @IsString()
  @ApiProperty({ example: 'new@email.com', required: false })
  email?: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'new_username', required: false })
  username?: string;
}

export class UpdateUserResponseDto {
  email!: string;
  username!: string;
}
