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
import { FullGroupResponseDto } from './dto/group-response.dto';
@ApiCookieAuth()
@UseGuards(AuthGuard)
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  @UseGuards(AuthGuard)
  @Post()
  async createGroup(
    @Body() groupData: CreateGroupDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<FullGroupResponseDto> {
    return await this.groupService.createGroup(groupData, user.id);
  }
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'gid', type: 'number', example: 1 })
  @Get(':gid')
  async getGroupdetails(
    @CurrentUser() user: JwtPayload,
    @Param('gid', ParseIntPipe) gid: number,
  ): Promise<FullGroupResponseDto> {
    return await this.groupService.getGroupDetails(gid, user.id);
  }

  @ApiCookieAuth()
  @Patch(':gid')
  async updateGroup(
    @CurrentUser() user: JwtPayload,
    @Param('gid', ParseIntPipe) gid: number,
    @Body() groupData: UpdateGroupDto,
  ): Promise<FullGroupResponseDto> {
    return await this.groupService.updateGroup(gid, groupData, user.id);
  }

  @ApiCookieAuth()
  @Delete(':gid')
  async deleteGroup(
    @CurrentUser() user: JwtPayload,
    @Param('gid', ParseIntPipe) gid: number,
  ): Promise<{ message: string }> {
    return await this.groupService.deleteGroup(gid, user.id);
  }

  @Post(':gid/:uid')
  async addUserToGroup(
    @CurrentUser() user: JwtPayload,
    @Param('gid', ParseIntPipe) gid: number,
    @Param('uid', ParseIntPipe) uid: number,
  ): Promise<FullGroupResponseDto> {
    return await this.groupService.addUserToGroup(user.id, gid, uid);
  }

  @Patch(':gid/:uid')
  async removeUserFromGroup(
    @CurrentUser() user: JwtPayload,
    @Param('gid', ParseIntPipe) gid: number,
    @Param('uid', ParseIntPipe) uid: number,
  ): Promise<FullGroupResponseDto> {
    return await this.groupService.removeUserFromGroup(user.id, gid, uid);
  }




}

