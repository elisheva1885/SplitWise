import { InjectRepository } from "@nestjs/typeorm";
import { Expense } from "./expense.entity";
import { Repository } from "typeorm";
import { BadRequestException, ForbiddenException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateExpenseDto, UpdateExpenseDto } from "./dto/expense.dto";
import { ExpenseResponseDto } from "./dto/expense-response.dto";
import { GroupService } from "src/group/group.service";
import { UserService } from "src/user/user.service";
import { Group } from "src/group/group.entity";
import { User } from "src/user/user.entity";
import { ExpenseValidator } from "./expense.validator";
@Injectable()
export class ExpenseService {
    constructor(
        @InjectRepository(Expense)
        private readonly expenseRepository: Repository<Expense>,
        private readonly groupService: GroupService,
        private readonly userService: UserService,
        private readonly expenseValidator: ExpenseValidator
    ) {
    }

    private toResponse(expense: Expense): ExpenseResponseDto {
        return {
            id: expense.uuid,
            value: expense.value,
            cause: expense.cause,
            paidBy: expense.paidBy.uuid,
            paidOn: expense.paidOn.uuid,
            groupId: expense.group.uuid
        };
    }

    async createExpense(userId: number, expenseData: CreateExpenseDto): Promise<ExpenseResponseDto> {
        const group = await this.groupService.findByIdWithRelations(expenseData.groupId, ['members']);
        if (!group) {
            throw new NotFoundException('group not found')
        }

        const { paidByUser, paidOnUser } =
            await this.expenseValidator.validateExpenseParticipant(
                group,
                expenseData.paidBy,
                expenseData.paidOn,
                userId,
                'create'
            );
        const expense = this.expenseRepository.create({
            cause: expenseData.cause,
            value: expenseData.value,
            paidBy: paidByUser,
            paidOn: paidOnUser,
            group: group
        });
        await this.expenseRepository.save(expense);

        return this.toResponse(expense);
    }


    async updateExpense(eid: number, expenseData: UpdateExpenseDto, userId: number): Promise<ExpenseResponseDto> {
        const expense = await this.expenseRepository.findOne({
            where: { uuid: eid },
            relations: ['paidBy', 'paidOn', 'group', 'group.members']
        })
        if (!expense) {
            throw new NotFoundException('expense not found');
        }
        const newPaidBy = expenseData.paidBy ?? expense.paidBy.uuid;
        const newPaidOn = expenseData.paidOn ?? expense.paidOn.uuid;
        const { paidByUser, paidOnUser } =
            await this.expenseValidator.validateExpenseParticipant(
                expense.group,
                newPaidBy,
                newPaidOn,
                userId,
                'update'
            );

        expense.paidBy = paidByUser;
        expense.paidOn = paidOnUser;

        if (expenseData.cause) {
            expense.cause = expenseData.cause;
        }
        if (expenseData.value !== undefined) {
            if (expenseData.value <= 0) {
                throw new BadRequestException('value must be greater than 0');
            }
            expense.value = expenseData.value;
        }
        const updatedExpense = await this.expenseRepository.save(expense);
        return this.toResponse(updatedExpense);
    }

    async deleteExpense(eid: number, userId: number): Promise<{ message: string }> {
        const expense = await this.expenseRepository.findOne({
            where: { uuid: eid },
            relations: ['paidBy', 'paidOn', 'group']
        })
        if (!expense) throw new NotFoundException('expense not found');

        if (userId !== expense.paidBy.uuid && userId !== expense.paidOn.uuid) {
            throw new ForbiddenException('user isnt allowed to delete this expense');
        }
        try {
            await this.expenseRepository.delete(expense);
        } catch {
            throw new InternalServerErrorException(
                'Could not delete expense. Ensure all related data is cleared or cascading is enabled',
            );
        }
        return { message: 'Expense deleted successfully' };

    }
}