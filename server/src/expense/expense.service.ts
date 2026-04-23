import { InjectRepository } from "@nestjs/typeorm";
import { Expense } from "./expense.entity";
import { Repository } from "typeorm";
import { BadRequestException, ForbiddenException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateExpenseDto, UpdateExpenseDto } from "./dto/expense.dto";
import { ExpenseResponseDto } from "./dto/expense-response.dto";
import { GroupService } from "src/group/group.service";
import { UserService } from "src/user/user.service";
import { Group } from "src/group/group.entity";
@Injectable()
export class ExpenseService {
    constructor(
        @InjectRepository(Expense)
        private readonly expenseRepository: Repository<Expense>,
        private readonly groupService: GroupService,
        private readonly userService: UserService
    ) {
    }
    private validateUsersInGroup(group: Group, userIds: number[]): void {
        const members = new Set(group.members.map(m => m.uuid));
        userIds.forEach(userId => {
            if (!members.has(userId)) {
                console.log(userId, group.uuid);
                
                throw new BadRequestException('User not in group');
            }
        })

    }

    async createExpense(userId: number, expenseData: CreateExpenseDto): Promise<ExpenseResponseDto> {
        const group = await this.groupService.findByIdWithRelations(expenseData.groupId, ['members']);
        if (!group) {
            throw new NotFoundException('group not found')
        }
        if (expenseData.paidOn === expenseData.paidBy) {
            throw new BadRequestException('expense must be between two diffrent users');
        }
        if (userId !== expenseData.paidOn && userId !== expenseData.paidBy) {
            throw new ForbiddenException('user isnt allow to create this expense');
        }

        this.validateUsersInGroup(group, [expenseData.paidOn, expenseData.paidBy, userId])

        const paidByUser = await this.userService.findByUuid(expenseData.paidBy);
        const paidOnUser = await this.userService.findByUuid(expenseData.paidOn);

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
            relations: ['paidBy', 'paidOn', 'group', 'group.members']
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

        this.validateUsersInGroup(expense.group, [newPaidBy, newPaidOn, userId])

        if (expenseData.cause) {
            expense.cause = expenseData.cause;
        }
        if (expenseData.value !== undefined && expenseData.value > 0) {
            expense.value = expenseData.value
        }
        if (expenseData.paidBy) {
            const paidByUser = await this.userService.findByUuid(expenseData.paidBy);
            if (!paidByUser) {
                throw new NotFoundException('user not found');
            }
            expense.paidBy = paidByUser;
        }
        if (expenseData.paidOn) {
            const paidOnUser = await this.userService.findByUuid(expenseData.paidOn);
            if (!paidOnUser) {
                throw new NotFoundException('user not found');
            }
            expense.paidOn = paidOnUser
        }
        const isSame =
            expenseData.cause === expense.cause &&
            expenseData.value === expense.value &&
            expenseData.paidBy === expense.paidBy.uuid &&
            expenseData.paidOn === expense.paidOn.uuid;
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

    async deleteExpense(eid: number, userId: number) : Promise<{ message: string }> {
        const expense = await this.expenseRepository.findOne({
            where: { uuid: eid },
            relations: ['paidBy', 'paidOn', 'group']
        })
        if (userId !== expense?.paidBy.uuid && userId !== expense?.paidOn.uuid) {
            throw new ForbiddenException('user isnt allow to delete this expense');
        }
        try {
            await this.expenseRepository.remove(expense);
        } catch {
            throw new InternalServerErrorException(
                'Could not delete group. Ensure all related data is cleared or cascading is enabled',
            );
        }
        return { message: 'Group deleted successfully' };

    }
}