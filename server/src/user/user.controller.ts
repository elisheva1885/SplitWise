import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";

@Controller('user')
export class userController{
    constructor(private readonly userService:UserService){}
    @Post('register')
    async register(@Body() user): Promise<User>{
        return this.userService.register(user);
    }
}