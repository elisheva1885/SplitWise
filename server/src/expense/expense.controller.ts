import { Body, Controller, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { ExpenseService } from "./expense.service";
import type { JwtPayload } from "src/types/express";
import { CreateExpenseDto, UpdateExpenseDto } from "./dto/expense.dto";
import { CurrentUser } from "src/user/current-user.decorator";
import { ApiCookieAuth, ApiParam } from "@nestjs/swagger";
import { ExpenseResponseDto } from "./dto/expense-response.dto";
import { AuthGuard } from "src/auth/auth.guard";
@ApiCookieAuth()
@UseGuards(AuthGuard)
@Controller('expense')
export class ExpenseController {

    constructor(
        private readonly expenseService: ExpenseService
    ) { }


    @Post()
    async createExpense(@CurrentUser() user: JwtPayload, @Body() expenseData: CreateExpenseDto): Promise<ExpenseResponseDto> {
        return await this.expenseService.createExpense(user.id, expenseData);
    }


    @Patch('gid')
    async updateExpense(
        @CurrentUser() user: JwtPayload,
        @Param('gid', ParseIntPipe) gid: number,
        @Body() expenseData: UpdateExpenseDto,
    ): Promise<ExpenseResponseDto> {
        return await this.expenseService.updateExpense(gid, expenseData, user.id)
    }


    @Patch('gid')
    async deleteExpense(
        @CurrentUser() user: JwtPayload,
        @Param('gid', ParseIntPipe) gid: number,
        @Body() expenseData: UpdateExpenseDto,
    ): Promise<ExpenseResponseDto> {
        return await this.expenseService.updateExpense(gid, expenseData, user.id)
    }
}