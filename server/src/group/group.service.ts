import { Injectable } from "@nestjs/common";
import { Group } from "./group.entity";
import { Repository } from "typeorm";
import { CreateGroupDto } from "./dto/group.dto";


@Injectable()
export class GroupService {
  constructor(
        private readonly groupRepository: Repository<Group>,
  ) {}

  async createGroup(groupData : CreateGroupDto, userId: number){
    return await this.groupRepository.save({
        name: groupData.name,
        description: groupData.description,
        ownerUuid: userId
    })
  }
}
