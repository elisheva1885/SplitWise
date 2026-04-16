import { Body, Controller, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/auth/auth.guard";
import type { Request } from "express";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/user.dto";
import { CurrentUser } from "./current-user.decorator";
import type{ JwtPayload } from "src/types/express";
import { ApiCookieAuth } from "@nestjs/swagger";


@Controller('user')
export class AuthController {
  constructor(private readonly userService: UserService) { }
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @Get()
  async getUserProfile(@CurrentUser() user: JwtPayload) {
    this.userService.getUserInfoAndGroups(user.username)
  }

  @Patch('')
  async updateUser(@Body() userData: UpdateUserDto) {

  }

}
