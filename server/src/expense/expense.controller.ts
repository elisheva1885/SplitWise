import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ExpenseService } from "./expense.service";
import { AuthGuard } from "@nestjs/passport";
import { JwtPayload } from "src/types/express";
import { CreateExpenseDto } from "./dto/expense.dto";

@Controller('expense')
export class ExpenseController {

    constructor(
        private readonly expenseService: ExpenseService
    ) { }

    @UseGuards(AuthGuard)
    @ApiCookieAuth()
    @Post()
    async createExpense(@CurrentUser() user: JwtPayload, @Body() expenseData : CreateExpenseDto){
        return await this.expenseService.createExpense(user.id, expenseData);
    }



}