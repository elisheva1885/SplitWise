import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './expense.entity';
import { Repository } from 'typeorm';
import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto, UpdateExpenseDto } from './dto/expense.dto';
import {
    BalanceExpenseResponse,
    ExpenseResponseDto,
} from './dto/expense-response.dto';
import { GroupService } from 'src/group/group.service';
import { ExpenseValidator } from './expense.validator';
import { UserService } from 'src/user/user.service';
import { log } from 'node:console';
@Injectable()
export class ExpenseService {
    constructor(
        @InjectRepository(Expense)
        private readonly expenseRepository: Repository<Expense>,
        private readonly groupService: GroupService,
        private readonly expenseValidator: ExpenseValidator,
        private readonly userService: UserService,
    ) { }

    private toResponse(expense: Expense): ExpenseResponseDto {
        return {
            id: expense.uuid,
            value: expense.value,
            cause: expense.cause,
            paidBy: expense.paidBy.uuid,
            paidOn: expense.paidOn.uuid,
            groupId: expense.group.uuid,
        };
    }

    async createExpense(
        userId: number,
        expenseData: CreateExpenseDto,
    ): Promise<ExpenseResponseDto> {
        const group = await this.groupService.findByIdWithRelations(
            expenseData.groupId,
            ['members'],
        );
        if (!group) {
            throw new NotFoundException('group not found');
        }

        const { paidByUser, paidOnUser } =
            await this.expenseValidator.validateExpenseParticipant(
                group,
                expenseData.paidBy,
                expenseData.paidOn,
                userId,
                'create',
            );
        const expense = this.expenseRepository.create({
            cause: expenseData.cause,
            value: expenseData.value,
            paidBy: paidByUser,
            paidOn: paidOnUser,
            group: group,
        });
        await this.expenseRepository.save(expense);

        return this.toResponse(expense);
    }

    async updateExpense(
        eid: number,
        expenseData: UpdateExpenseDto,
        userId: number,
    ): Promise<ExpenseResponseDto> {
        const expense = await this.expenseRepository.findOne({
            where: { uuid: eid },
            relations: ['paidBy', 'paidOn', 'group', 'group.members'],
        });
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
                'update',
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

    async deleteExpense(
        eid: number,
        userId: number,
    ): Promise<{ message: string }> {
        const expense = await this.expenseRepository.findOne({
            where: { uuid: eid },
            relations: ['paidBy', 'paidOn', 'group'],
        });
        if (!expense) throw new NotFoundException('expense not found');

        if (userId !== expense.paidBy.uuid && userId !== expense.paidOn.uuid) {
            throw new ForbiddenException('user isnt allowed to delete this expense');
        }
        try {
            await this.expenseRepository.remove(expense);
        } catch {
            throw new InternalServerErrorException(
                'Could not delete expense. Ensure all related data is cleared or cascading is enabled',
            );
        }
        return { message: 'Expense deleted successfully' };
    }

    async getGroupExpense(
        gid: number,
        userId: number,
    ): Promise<BalanceExpenseResponse[]> {
        const group = await this.groupService.findByIdWithRelations(gid, [
            'members',
            'expenses',
            'expenses.paidOn',
            'expenses.paidBy',
        ]);
        if (!group) throw new NotFoundException('group not found');

        this.expenseValidator.validateUsersInGroup(group, [userId]);
        const map = new Map<number, number>();
        const map2 = new Map<number, number>();

        let counter = 0;
        const mapper = new Map<string, number>();
        group.expenses.forEach((expense) => {
            const key = `${expense.paidBy.uuid}-${expense.paidOn.uuid}`;
            mapper.set(key, (mapper.get(key) || 0) + expense.value);
            if (!map.has(expense.paidBy.uuid)) {
                map.set(expense.paidBy.uuid, counter);
                map2.set(counter, expense.paidBy.uuid);
                counter++;
            }
            if (!map.has(expense.paidOn.uuid)) {
                map.set(expense.paidOn.uuid, counter);
                map2.set(counter, expense.paidOn.uuid);
                counter++;
            }
        });

        const matSize: number = map.size;
        const expensesMat = Array.from({ length: matSize }, () =>
            Array.from({ length: matSize }, () => 0),
        );
        const result = Array.from({ length: matSize }, () =>
            Array.from({ length: matSize }, () => 0),
        );
        for (let i = 0; i < expensesMat.length; i++) {
            for (let j = 0; j < expensesMat[i].length; j++) {
                if (i == j) expensesMat[i][j] = 0;
                const paidBy = map2.get(j);
                const paidOn = map2.get(i);
                const value = mapper.get(`${paidBy}-${paidOn}`);
                if (value !== undefined) {
                    expensesMat[i][j] = value;
                } else {
                    expensesMat[i][j] = 0;
                }
            }
        }
        console.table(expensesMat);
        // for (let i = 0; i < expensesMat.length; i++) {
        //     for (let j = 0; j < expensesMat[i].length; j++) {
        //         // while (expensesMat[i][j] > 0) {
        //             // console.log(expensesMat[i][j]); 
        //             for (let k = 0; k < expensesMat.length; k++) {
        //                 if(i==j) continue;
        //                 if (expensesMat[k][i] === 0 || k===j) {

        //                     const min = Math.min(expensesMat[k][i], expensesMat[i][j])

        //                     console.log("min", min, ' ', expensesMat[k][i]);
        //                     expensesMat[k][j] += min;
        //                     expensesMat[i][j] -= min;
        //                     expensesMat[k][i] -= min;
        //                     if(expensesMat[i][j] === 0){
        //                         break;
        //                     }
        //                 }
        //         }
        //     }
        // }
for (let i = 0; i < matSize; i++) {
    for (let j = i + 1; j < matSize; j++) {
        if (expensesMat[i][j] > 0 && expensesMat[j][i] > 0) {
            const min = Math.min(expensesMat[i][j], expensesMat[j][i]);
            expensesMat[i][j] -= min;
            expensesMat[j][i] -= min;
        }
    }
}
 
for (let i = 0; i < matSize; i++) {
    for (let k = 0; k < matSize; k++) {
        if (k === i || expensesMat[k][i] === 0) continue;
        for (let j = 0; j < matSize; j++) {
            if (j === i || j === k) continue;
            if (expensesMat[i][j] === 0) continue;
 
            const min = Math.min(expensesMat[k][i], expensesMat[i][j]);
            expensesMat[k][j] += min;
            expensesMat[k][i] -= min;
            expensesMat[i][j] -= min;
        }
    }
}
        
        console.table(expensesMat);
        const updatedExpense: BalanceExpenseResponse[] = [];
        for (let i = 0; i < expensesMat.length; i++) {
            for (let j = 0; j < expensesMat[i].length; j++) {
                if (expensesMat[i][j]) {
                    const paidBy = map2.get(j);
                    const paidOn = map2.get(i);
                    if (paidBy !== undefined && paidOn !== undefined) {
                        const paidByUser = await this.userService.findByUuid(paidBy);
                        const paidOnUser = await this.userService.findByUuid(paidOn);
                        if (!paidByUser) {
                            throw new NotFoundException();
                        }
                        if (!paidOnUser) {
                            throw new NotFoundException();
                        }
                        updatedExpense.push({
                            paidByUser: {
                                uuid: paidByUser.uuid,
                                username: paidByUser.username,
                            },
                            paidOnUser: {
                                uuid: paidOnUser.uuid,
                                username: paidOnUser.username,
                            },
                            value: expensesMat[i][j],
                        });
                    }
                }
            }
        }
        return updatedExpense;
    }
}
