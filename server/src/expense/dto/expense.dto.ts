import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ example: 'Developers Team', required: false })
  @IsString()
  @Optional()
  @MinLength(3)
  cause?: string;

  @ApiProperty({
    example: 5,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  value!: number;

  @ApiProperty({ example: 1, required: false })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  paidBy!: number;

  @ApiProperty({ example: 1, required: false })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  paidOn!: number;

  @ApiProperty({ example: 1, required: false })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  groupId!: number;
}

export class UpdateExpenseDto {
  @ApiProperty({ example: 'Developers Team', required: false })
  @IsString()
  @IsOptional()
  @MinLength(3)
  cause?: string;

  @ApiProperty({
    example: 5,
    required: true,
  })
  @IsInt()
  @IsOptional()
  value?: number;

  @ApiProperty({ example: 1, required: false })
  @IsInt()
  @Min(1)
  @IsOptional()
  paidBy?: number;

  @ApiProperty({ example: 1, required: false })
  @IsInt()
  @Min(1)
  @IsOptional()
  paidOn?: number;
}
