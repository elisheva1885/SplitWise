import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateGroupDto, UpdateGroupDto } from './dto/group.dto';
import { CurrentUser } from 'src/user/current-user.decorator';
import type { JwtPayload } from 'src/types/express';
import { GroupService } from './group.service';
import { ApiCookieAuth, ApiParam } from '@nestjs/swagger';
import { GroupResponseDto } from './dto/group-response.dto';

@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) { }
    @UseGuards(AuthGuard)
    @ApiCookieAuth()
    @Post()
    async createGroup(
        @Body() groupData: CreateGroupDto,
        @CurrentUser() user: JwtPayload,
    ): Promise<GroupResponseDto> {
        return await this.groupService.createGroup(groupData, user.id);
    }
    @UseGuards(AuthGuard)
    @ApiCookieAuth()
    @ApiParam({ name: 'gid', type: 'number', example: 1 })
    @Get(':gid')
    async getGroupdetails(
        @CurrentUser() user: JwtPayload,
        @Param('gid', ParseIntPipe) gid: number,
    ): Promise<GroupResponseDto> {
        return await this.groupService.getGroupDetails(gid, user.id);
    }

    @UseGuards(AuthGuard)
    @ApiCookieAuth()
    @Patch()
    async updateGroup(
        @CurrentUser() user: JwtPayload,
        @Body() groupData: UpdateGroupDto,
    ): Promise<GroupResponseDto> {
        return await this.groupService.updateGroup(groupData, user.id);
    }
    @UseGuards(AuthGuard)
    @ApiCookieAuth()
    @Delete(':gid')
    async deleteGroup(
        @CurrentUser() user: JwtPayload,
        @Param('gid', ParseIntPipe) gid: number,
    ): Promise<{ message: string }> {
        return await this.groupService.deleteGroup(gid, user.id);
    }

    @UseGuards(AuthGuard)
    @ApiCookieAuth()
    @Post(':gid/:uid')
    async addUserToGroup(@CurrentUser() user: JwtPayload, @Param('gid', ParseIntPipe) gid: number, @Param('uid', ParseIntPipe) uid: number): Promise<GroupResponseDto> {
        return await this.groupService.addUserToGroup(user.id, gid, uid);
    }


    @UseGuards(AuthGuard)
    @ApiCookieAuth()
    @Patch(':gid/:uid')
    async removeUserFromGroup(@CurrentUser() user: JwtPayload, @Param('gid', ParseIntPipe) gid: number, @Param('uid', ParseIntPipe) uid: number): Promise<GroupResponseDto> {
        return await this.groupService.removeUserFromGroup(user.id, gid, uid);
    }

}
