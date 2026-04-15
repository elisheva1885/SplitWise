import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, ArrayNotEmpty, IsInt, MinLength } from 'class-validator';

export class CreateGroupDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name!: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;

}