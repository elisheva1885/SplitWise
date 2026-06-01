import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import type { JwtPayload } from 'src/types/express';
import { CreateExpenseDto, UpdateExpenseDto } from './dto/expense.dto';
import { CurrentUser } from 'src/user/current-user.decorator';
import { ApiCookieAuth, ApiParam } from '@nestjs/swagger';
import {
  BalanceExpenseResponse,
  ExpenseResponseDto,
} from './dto/expense-response.dto';
import { AuthGuard } from 'src/auth/auth.guard';
@ApiCookieAuth()
@UseGuards(AuthGuard)
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async createExpense(
    @CurrentUser() user: JwtPayload,
    @Body() expenseData: CreateExpenseDto,
  ): Promise<ExpenseResponseDto> {
    return await this.expenseService.createExpense(user.id, expenseData);
  }

  @Patch(':eid')
  async updateExpense(
    @CurrentUser() user: JwtPayload,
    @Param('eid', ParseIntPipe) eid: number,
    @Body() expenseData: UpdateExpenseDto,
  ): Promise<ExpenseResponseDto> {
    return await this.expenseService.updateExpense(eid, expenseData, user.id);
  }

  @Delete(':eid')
  async deleteExpense(
    @CurrentUser() user: JwtPayload,
    @Param('eid', ParseIntPipe) eid: number,
  ): Promise<{ message: string }> {
    return await this.expenseService.deleteExpense(eid, user.id);
  }

  @ApiParam({ name: 'gid', type: 'number', example: 1 })
  @Get(':gid')
  async getGroupExpense(
    @CurrentUser() user: JwtPayload,
    @Param('gid', ParseIntPipe) gid: number,
  ): Promise<BalanceExpenseResponse[]> {
    return await this.expenseService.getGroupExpense(gid, user.id);
  }
}
