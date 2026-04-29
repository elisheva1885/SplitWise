import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserResponseDto } from 'src/user/dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import zxcvbn from 'zxcvbn';
import { JwtPayload } from 'src/types/express';
import { LoginResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  checkPassword(password: string): number {
    return zxcvbn(password).score;
  }
  generateToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  async verify(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException();
    }
  }

  async signUp(signUpInfo: RegisterDto): Promise<UserResponseDto> {
    const existUser = await this.userService.findByUsernameOrEmail(
      signUpInfo.username,
      signUpInfo.email,
    );
    if (existUser) {
      throw new ConflictException('username or email already exist');
    }
    const passwordScore = this.checkPassword(signUpInfo.password);
    if (passwordScore < 3) {
      throw new BadRequestException('password too weak');
    }
    const hash = await bcrypt.hash(signUpInfo.password, 12);
    const user = await this.userService.createUser(signUpInfo, hash);
    const userResult: UserResponseDto = {
      id: user.uuid,
      email: user.email,
      username: user.username,
    };
    return userResult;
  }

  async signIn(signInInfo: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.findByUsername(signInInfo.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(signInInfo.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload: JwtPayload = {
      id: user.uuid,
      username: user.username,
      email: user.email,
    };
    const token = this.generateToken(payload);
      const userResult: LoginResponseDto = {
      email: user.email,
      username: user.username,
      token: token
    };
    return userResult;
  }
}
