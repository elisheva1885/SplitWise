import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { UserResponseDto } from "src/user/dto/user.dto";
import { LoginDto } from "./dto/login.dto";

@Controller('user')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async signUp(@Body() user: RegisterDto): Promise<UserResponseDto> {        
        return this.authService.signUp(user);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInInfo : LoginDto): Promise<string>{
        return this.authService.signIn(signInInfo)
    }

    @Post('forget/:email')
    async forgetPassword(){
        
    }
}