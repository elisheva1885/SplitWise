import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Group } from 'src/group/group.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
@Injectable()
export class ExpenseValidator {
  constructor(private readonly userService: UserService) {}

  validateUsersInGroup(group: Group, userIds: number[]): void {
    if (!group.members)
      throw new NotFoundException('not found members on the group');

    const members = new Set(group.members.map((m) => m.uuid));
    userIds.forEach((userId) => {
      if (!members.has(userId)) {
        throw new BadRequestException(`User ${userId} not in group`);
      }
    });
  }

  async validateExpenseParticipant(
    group: Group,
    paidById: number,
    paidOnId: number,
    userId: number,
    mode: 'update' | 'create',
  ): Promise<{ paidByUser: User; paidOnUser: User }> {
    if (paidOnId === paidById) {
      throw new BadRequestException(
        'expense must be between two diffrent users',
      );
    }
    if (mode == 'create') {
      if (userId !== paidOnId && userId !== paidById) {
        throw new ForbiddenException('user isnt allow to create this expense');
      }
    }

    if (mode == 'update') {
      if (userId !== paidById && userId !== paidOnId) {
        throw new ForbiddenException('user must remain part of the expense');
      }
    }
    this.validateUsersInGroup(group, [paidOnId, paidById, userId]);

    const [paidByUser, paidOnUser] = await Promise.all([
      this.userService.findByUuid(paidById),
      this.userService.findByUuid(paidOnId),
    ]);
    if (!paidByUser || !paidOnUser) {
      throw new NotFoundException('user not found');
    }
    return { paidByUser, paidOnUser };
  }
}
