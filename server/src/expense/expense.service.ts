import { InjectRepository } from "@nestjs/typeorm";
import { Expense } from "./expense.entity";
import { Repository } from "typeorm";
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateExpenseDto, UpdateExpenseDto } from "./dto/expense.dto";
import { ExpenseResponseDto } from "./dto/expense-response.dto";
import { GroupService } from "src/group/group.service";
import { NotFoundError } from "rxjs";
import { UserService } from "src/user/user.service";
@Injectable()
export class ExpenseService {
    constructor(
        @InjectRepository(Expense)
        private readonly expenseRepository: Repository<Expense>,
        private readonly gropService: GroupService,
        private readonly userService: UserService
    ) {
    }

    async createExpense(userId: number, expenseData: CreateExpenseDto): Promise<ExpenseResponseDto> {
        if (expenseData.paidOn === expenseData.paidBy) {
            throw new BadRequestException('expnse must be between two diffrent users');
        }
        if (userId !== expenseData.paidOn && userId !== expenseData.paidBy) {
            throw new ForbiddenException('user isnt allow th create this expense');
        }
        const group = await this.gropService.findById(expenseData.groupId);
        if (!group) {
            throw new NotFoundException('group not found')
        }
        const paidByUser = await this.userService.findById(expenseData.paidBy);
        const paidOnUser = await this.userService.findById(expenseData.paidOn);

        if (!paidByUser || !paidOnUser) {
            throw new NotFoundException('user not found');
        }
        const expense = this.expenseRepository.create({
            cause: expenseData.cause,
            value: expenseData.value,
            paidBy: paidByUser,
            paidOn: paidOnUser,
            group: group
        });
        await this.expenseRepository.save(expense);
        const expenseRespone: ExpenseResponseDto = {
            value: expense.value,
            cause: expense.cause,
            paidBy: expense.paidBy.uuid,
            paidOn: expense.paidOn.uuid,
            groupId: expenseData.groupId
        };
        return expenseRespone;
    }


    async updateExpense(gid: number, expenseData: UpdateExpenseDto, userId: number): Promise<ExpenseResponseDto> {
        const expense = await this.expenseRepository.findOne({
            where: {uuid:gid}
        })
        
        if (expenseData.paidOn === expenseData.paidBy) {
            throw new BadRequestException('expnse must be between two diffrent users');
        }
        if (userId !== expenseData.paidOn && userId !== expenseData.paidBy) {
            throw new ForbiddenException('user isnt allow th create this expense');
        }
    }
}