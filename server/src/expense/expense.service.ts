import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './expense.entity';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
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
@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
    @Inject(forwardRef(() => GroupService))
    private readonly groupService: GroupService,
    private readonly expenseValidator: ExpenseValidator,
    @Inject(forwardRef(() => UserService))
    public readonly userService: UserService,
  ) {}

  public toResponse(expense: Expense): ExpenseResponseDto {
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

  public buildUserMappings(expenses: Expense[]) {
    const userToIndexMap = new Map<number, number>();
    const indexToUserMap = new Map<number, number>();
    const expenseByUserPair = new Map<string, number>();

    let currentIndex = 0;

    expenses.forEach((expense) => {
      const key = `${expense.paidBy.uuid}-${expense.paidOn.uuid}`;
      expenseByUserPair.set(
        key,
        (expenseByUserPair.get(key) || 0) + expense.value,
      );

      if (!userToIndexMap.has(expense.paidBy.uuid)) {
        userToIndexMap.set(expense.paidBy.uuid, currentIndex);
        indexToUserMap.set(currentIndex, expense.paidBy.uuid);
        currentIndex++;
      }

      if (!userToIndexMap.has(expense.paidOn.uuid)) {
        userToIndexMap.set(expense.paidOn.uuid, currentIndex);
        indexToUserMap.set(currentIndex, expense.paidOn.uuid);
        currentIndex++;
      }
    });

    return { userToIndexMap, indexToUserMap, expenseByUserPair };
  }
  public buildDebtMatrix(
    userToIndexMap: Map<number, number>,
    indexToUserMap: Map<number, number>,
    expenseByUserPair: Map<string, number>,
  ): number[][] {
    const size = userToIndexMap.size;

    const debtMatrix = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => 0),
    );

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i === j) continue;

        const paidBy = indexToUserMap.get(j);
        const paidOn = indexToUserMap.get(i);

        const value = expenseByUserPair.get(`${paidBy}-${paidOn}`);
        debtMatrix[i][j] = value ?? 0;
      }
    }

    return debtMatrix;
  }
  public simplifyDebts(debtMatrix: number[][]): number[][] {
    const result: number[][] = debtMatrix.map((row) => [...row]);

    const n = debtMatrix.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        for (let k = 0; k < n; k++) {
          if (i === j) continue;

          if (result[k][i] > 0) {
            const min = Math.min(result[k][i], result[i][j]);
            if (j !== k) {
              result[k][j] += min;
            }
            result[i][j] -= min;
            result[k][i] -= min;

            if (result[i][j] === 0) break;
          }
        }
      }
    }
    return result;
  }
  public async mapToResponse(
    debtMatrix: number[][],
    indexToUserMap: Map<number, number>,
  ): Promise<BalanceExpenseResponse[]> {
    const simplifiedExpenses: BalanceExpenseResponse[] = [];

    for (let i = 0; i < debtMatrix.length; i++) {
      for (let j = 0; j < debtMatrix[i].length; j++) {
        if (!debtMatrix[i][j]) continue;

        const paidBy = indexToUserMap.get(j);
        const paidOn = indexToUserMap.get(i);

        if (paidBy === undefined || paidOn === undefined) continue;

        const [paidByUser, paidOnUser] = await Promise.all([
          this.userService.findByUuid(paidBy),
          this.userService.findByUuid(paidOn),
        ]);

        if (!paidByUser || !paidOnUser) {
          throw new NotFoundException();
        }

        simplifiedExpenses.push({
          paidByUser: {
            uuid: paidByUser.uuid,
            username: paidByUser.username,
          },
          paidOnUser: {
            uuid: paidOnUser.uuid,
            username: paidOnUser.username,
          },
          value: debtMatrix[i][j],
        });
      }
    }

    return simplifiedExpenses;
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

    const { userToIndexMap, indexToUserMap, expenseByUserPair } =
      this.buildUserMappings(group.expenses);

    const debtMatrix = this.buildDebtMatrix(
      userToIndexMap,
      indexToUserMap,
      expenseByUserPair,
    );
    const simplifiedDebtsMatrix = this.simplifyDebts(debtMatrix);
    return await this.mapToResponse(simplifiedDebtsMatrix, indexToUserMap);
  }
}
