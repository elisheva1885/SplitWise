import { Body, Controller, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/auth/auth.guard";
import type{  Request } from "express";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/user.dto";


@Controller('user')
export class AuthController {
  constructor(private readonly userService: UserService) {}
    @UseGuards(AuthGuard)
    @Get()
    async getUserProfile(@Req() req: Request){
        const userInfo = req.user;
        const user = await this.userService.getUserInfoAndGroups(userInfo);
        return user;
    }

    @Patch('')
    async updateUser(@Body() userData:UpdateUserDto){
         
    }

}
