import { Injectable } from "@nestjs/common";
import { Group } from "./group.entity";
import { Repository } from "typeorm";
import { CreateGroupDto } from "./dto/group.dto";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
    ) { }

    async createGroup(groupData: CreateGroupDto, userId: number): Promise<Group> {
        return await this.groupRepository.save({
            name: groupData.name,
            description: groupData.description,
            ownerUuid: userId
        })
    }
}
