import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { GroupResponseDto } from 'src/group/dto/group-response.dto';

export class UserResponseDto {
  id!: number;
  email!: string;
  username!: string;
}
export class UsersResponseDto {
  id!: number;
  username!: string;

}
export class GetUserResponseDto {
  user!: UserResponseDto;
  groups?: GroupResponseDto[];
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
