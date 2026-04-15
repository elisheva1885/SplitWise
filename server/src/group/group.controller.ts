import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateGroupDto } from "./dto/group.dto";
import { CurrentUser } from "src/user/current-user.decorator";
import type { JwtPayload } from "src/types/express";
import { GroupService } from "./group.service";
import { ApiCookieAuth } from "@nestjs/swagger";

@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) { }
    @UseGuards(AuthGuard)
    @ApiCookieAuth()
    @Post()
    async createGroup(@Body() groupData: CreateGroupDto, @CurrentUser() user: JwtPayload) {
        console.log("user", user);
        return await this.groupService.createGroup(groupData, user.id)
    }
}