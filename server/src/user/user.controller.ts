import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UserResponseDto } from './dto/user.dto';

@Controller('user')
export class userController {
  constructor(
    private readonly authService: AuthService,
  ) {}
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async signUp(@Body() user: RegisterDto): Promise<UserResponseDto> {
    return this.authService.sipnUp(user);
  }
}
