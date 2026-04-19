import {
    ConflictException,
    Injectable,
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
    ) { }

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
                members: {
                    uuid: userId,
                },
            },
            relations: ['expenses', 'owner', 'members'],
        });
        if (!group) {
            throw new NotFoundException('group not found');
        }
        return this.toResponseDto(group);
    }

    async updateGroup(
        groupData: UpdateGroupDto,
        userId: number,
    ): Promise<GroupResponseDto> {
        const group = await this.groupRepository.findOne({
            where: { uuid: groupData.groupId, owner: { uuid: userId } },
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
            where: { uuid: groupId, owner: { uuid: userId } },
        });

        if (!group) throw new NotFoundException('group not found');

        await this.groupRepository.remove(group);
        return { message: 'Group deleted successfully' };
    }

    async addUserToGroup(currentUserId: number, groupId: number, userToAddId: number): Promise<GroupResponseDto> {
        const group = await this.groupRepository.findOne({
            where: {
                uuid: groupId,
                owner: { uuid: currentUserId }
            }, relations: ['owner', 'members']
        })
        if (!group) {
            throw new NotFoundException('group not found')
        }
        const user = await this.userService.findById(userToAddId);
        if (!user) {
            throw new NotFoundException('user to add not found')
        }
        console.log(group);

        group?.members.push(user);
        const updatedGroup = await this.groupRepository.save(group);
        return this.toResponseDto(updatedGroup);
    }

    async removeUserFromGroup(currentUserId: number, groupId: number, userToRemoveId: number): Promise<GroupResponseDto> {
        const group = await this.groupRepository.findOne({
            where: {
                uuid: groupId,
                owner: { uuid: currentUserId }
            }, relations: ['owner', 'members']
        })
        if (!group) {
            throw new NotFoundException('group not found')
        }
        const user = await this.userService.findById(userToRemoveId);
        if (!user) {
            throw new NotFoundException('user to remove not found')
        }
        const members = group?.members.filter(member => member.uuid !== userToRemoveId);
        group.members = members;
        const updatedGroup = await this.groupRepository.save(group);
        return this.toResponseDto(updatedGroup);
    }
}