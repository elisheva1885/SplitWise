import { InjectRepository } from "@nestjs/typeorm";
import { Expense } from "./expense.entity";
import { Repository } from "typeorm";
import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { CreateExpenseDto } from "./dto/expense.dto";
@Injectable()
export class ExpenseService {
    constructor(
         @InjectRepository(Expense)
        private readonly expenseRepository: Repository<Expense>, 
    ) {     
    }

    async createExpense(userId:number,expenseData:CreateExpenseDto){
        if(expenseData.paidOn === expenseData.paidBy){
            throw new BadRequestException('expnse must be between two diffrent users');
        }
        if(userId !== expenseData.paidOn && userId !== expenseData.paidBy){
            throw new ForbiddenException('user isnt allow th create this expense');
        }
        const expense = await this.expenseRepository.create(expenseData);
    }
}