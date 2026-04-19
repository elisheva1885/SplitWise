import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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
    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'new@email.com', required: false })
    email?: string;
    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'new_username', required: false })
    username?: string;
}

export class UpdateUserResponseDto {
    email!: string;
    username!: string;
}