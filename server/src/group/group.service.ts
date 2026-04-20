import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Group } from './group.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto, UpdateGroupDto } from './dto/group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { GroupResponseDto } from './dto/group-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    private readonly userService: UserService,
  ) {}

  private toResponseDto(group: Group): GroupResponseDto {
    return plainToInstance(GroupResponseDto, group, {
      excludeExtraneousValues: true,
    });
  }

  async findByGroupName(name: string): Promise<Group | null> {
    return await this.groupRepository.findOne({
      where: { name },
    });
  }
  async findById(uuid: number): Promise<Group | null> {
    return await this.groupRepository.findOne({
      where: { uuid },
    });
  }

  async createGroup(
    groupData: CreateGroupDto,
    userId: number,
  ): Promise<GroupResponseDto> {
    const existGroup = await this.findByGroupName(groupData.name);
    if (existGroup) {
      throw new ConflictException('Group name is already exist');
    }
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const group = this.groupRepository.create({
      name: groupData.name,
      description: groupData.description,
      owner: user,
      members: [user],
    });
    await this.groupRepository.save(group);

    return this.toResponseDto(group);
  }

  async getGroupDetails(
    groupId: number,
    userId: number,
  ): Promise<GroupResponseDto> {
    const group = await this.groupRepository.findOne({
      where: {
        uuid: groupId,
      },
      relations: ['expenses', 'owner', 'members'],
    });
    if (!group) {
      throw new NotFoundException('group not found');
    }
    const isMember = group.members.some((member) => member.uuid == userId);
    if (!isMember) {
      throw new NotFoundException('user is not in group');
    }
    return this.toResponseDto(group);
  }

  async updateGroup(
    groupId: number,
    groupData: UpdateGroupDto,
    userId: number,
  ): Promise<GroupResponseDto> {
    const group = await this.groupRepository.findOne({
      where: { uuid: groupId, owner: { uuid: userId } },
      relations: ['owner'],
    });
    if (!group) {
      throw new NotFoundException('group not found');
    }
    if (groupData.name) {
      const exist = await this.findByGroupName(groupData.name);
      if (exist && exist.uuid !== group.uuid) {
        throw new ConflictException('Group name is already exist');
      }
      group.name = groupData.name;
    }
    if (groupData.description !== undefined) {
      group.description = groupData.description;
    }
    if (groupData.ownerId) {
      const user = await this.userService.findById(groupData.ownerId);
      if (!user) {
        throw new NotFoundException('the owner must be exist user');
      }
      group.owner = user;
    }
    const updatedGroup = await this.groupRepository.save(group);
    return this.toResponseDto(updatedGroup);
  }

  async deleteGroup(
    groupId: number,
    userId: number,
  ): Promise<{ message: string }> {
    const group = await this.groupRepository.findOne({
      where: { uuid: groupId },
      relations: ['owner'],
    });

    if (!group) throw new NotFoundException('group not found');
    if (group.owner.uuid !== userId) {
      throw new ForbiddenException('Only the owner can delete this group');
    }
    try {
      await this.groupRepository.remove(group);
    } catch {
      throw new InternalServerErrorException(
        'Could not delete group. Ensure all related data is cleared or cascading is enabled',
      );
    }
    return { message: 'Group deleted successfully' };
  }

  async removeUserFromGroup(
    currentUserId: number,
    groupId: number,
    userToRemoveId: number,
  ): Promise<GroupResponseDto> {
    const group = await this.groupRepository.findOne({
      where: { uuid: groupId },
      relations: ['owner', 'members'],
    });
    if (!group) {
      throw new NotFoundException('group not found');
    }
    if (group.owner.uuid !== currentUserId) {
      throw new ForbiddenException('only owner can remove users');
    }
    const user = await this.userService.findById(userToRemoveId);
    if (!user) {
      throw new NotFoundException('user to remove not found');
    }
    const isMember = group.members.some(
      (member) => member.uuid == userToRemoveId,
    );
    if (!isMember) {
      throw new NotFoundException('user is not in group');
    }
    if (userToRemoveId == group.owner.uuid) {
      throw new ConflictException(
        'please assign someone else to be the owner of the group and request him to remove you',
      );
    }
    //TODO: check if the user have any expense on this group
    //if he has to throw BadRequestException
    const members = group?.members.filter(
      (member) => member.uuid !== userToRemoveId,
    );
    group.members = members;
    const updatedGroup = await this.groupRepository.save(group);
    return this.toResponseDto(updatedGroup);
  }

  async addUserToGroup(
    currentUserId: number,
    groupId: number,
    userToAddId: number,
  ): Promise<GroupResponseDto> {
    const group = await this.groupRepository.findOne({
      where: {
        uuid: groupId,
        owner: { uuid: currentUserId },
      },
      relations: ['owner', 'members'],
    });
    if (!group) {
      throw new NotFoundException('group not found');
    }
    if (group.owner.uuid !== currentUserId) {
      throw new ForbiddenException(
        'user isnt allow to add members to the group',
      );
    }
    const user = await this.userService.findById(userToAddId);
    if (!user) {
      throw new NotFoundException('user to add not found');
    }
    const isMember = group.members.some((member) => member.uuid == userToAddId);
    if (isMember) {
      throw new ConflictException('user already in group');
    }
    group?.members.push(user);
    const updatedGroup = await this.groupRepository.save(group);
    return this.toResponseDto(updatedGroup);
  }
}
