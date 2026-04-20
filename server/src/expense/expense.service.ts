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


    async updateExpense(eid: number, expenseData: UpdateExpenseDto, userId: number): Promise<ExpenseResponseDto> {
        const expense = await this.expenseRepository.findOne({
            where: { uuid: eid },
            relations: ['paidBy', 'paidOn', 'group']
        })
        if (!expense) {
            throw new NotFoundException('expense not found');
        }
        if (userId !== expense.paidBy.uuid && userId !== expense.paidOn.uuid) {
            throw new ForbiddenException('user is not allowed to update this expense');
        }
        const newPaidBy = expenseData.paidBy ?? expense.paidBy.uuid;
        const newPaidOn = expenseData.paidOn ?? expense.paidOn.uuid;

        if (newPaidBy === newPaidOn) {
            throw new BadRequestException('expense must be between two different users');
        }
        if (expenseData.cause) {
            expense.cause = expenseData.cause;
        }
        if (expenseData.value !== undefined) {
            expense.value = expenseData.value
        }
        if (expenseData.paidBy) {
            const paidByUser = await this.userService.findById(expenseData.paidBy);
            if (!paidByUser) {
                throw new NotFoundException('user not found');
            }
            expense.paidBy = paidByUser;
        }
        if (expenseData.paidOn) {
            const paidOnUser = await this.userService.findById(expenseData.paidOn);
            if (!paidOnUser) {
                throw new NotFoundException('user not found');
            }
            expense.paidOn = paidOnUser
        }
        const updatedExpense = await this.expenseRepository.save(expense);
        const expenseRespone: ExpenseResponseDto = {
            value: updatedExpense.value,
            cause: updatedExpense.cause,
            paidBy: updatedExpense.paidBy.uuid,
            paidOn: updatedExpense.paidOn.uuid,
            groupId: updatedExpense.group.uuid
        };
        return expenseRespone;
    }

    async deleteExpense(){
        
    }
}