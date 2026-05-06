import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';
import { JwtPayload } from 'src/types/express';
import type { JwtPayload as payload } from 'src/types/express';
import { AuthResponseDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/user/current-user.decorator';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async signUp(
    @Body() userData: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const { id, username, email } = await this.authService.signUp(userData);
    const payload: JwtPayload = { id, username, email };
    const token = this.authService.generateToken(payload);
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/'
    });
    return { username, email };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInInfo: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const { username, email, token } =
      await this.authService.signIn(signInInfo);
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/'
    });
    return { username, email };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response): { message: string } {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/'
    });
    return { message: 'Loggedout successfully' };
  }

}
