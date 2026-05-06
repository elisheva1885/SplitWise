import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  GetUserResponseDto,
  UpdateUserDto,
  UpdateUserResponseDto,
} from './dto/user.dto';
import { CurrentUser } from './current-user.decorator';
import type { JwtPayload } from 'src/types/express';
import { ApiCookieAuth } from '@nestjs/swagger';
import { AuthResponseDto } from 'src/auth/dto/auth.dto';
@ApiCookieAuth()
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUserProfile(
    @CurrentUser() user: JwtPayload,
  ): Promise<GetUserResponseDto> {
    return await this.userService.getUserInfoAndGroups(user.id);
  }

  @Patch()
  async updateUser(
    @CurrentUser() user: JwtPayload,
    @Body() userData: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    return await this.userService.updateUser(user.id, userData);
  }

  @Delete()
  async deleteUser(
    @CurrentUser() user: JwtPayload,
  ): Promise<{ message: string }> {
    return await this.userService.deleteUser(user.id);
  }

  @UseGuards(AuthGuard)
  @Get('status')
  userStatus(@CurrentUser() user: JwtPayload): AuthResponseDto {
    return { username: user.username, email: user.email };
  }
}
