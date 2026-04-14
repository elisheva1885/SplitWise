import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserResponseDto } from 'src/user/dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }


    async signUp(signUpInfo: RegisterDto): Promise<UserResponseDto> {
        const existUser = await this.userService.findByUsername(signUpInfo.username);
        if (existUser) {
            throw new ConflictException('username already exist')
        }
        const hash = await bcrypt.hash(signUpInfo.password, 12);
        const user = await this.userService.createUser(signUpInfo, hash);
        const userResult: UserResponseDto = {
            id: user.uuid,
            email: user.email,
            username: user.username
        }
        return userResult;
    }

    async signIn(signInInfo: LoginDto): Promise<string> {
        // const existUser = await this.userRepository.createQueryBuilder('u').addSelect('u.password').where(
        //     'u.username = :username', { username: signInInfo.username }
        // ).getOne();
        const user = await this.userService.findByUsername(signInInfo.username);
        if (!user) {
            throw new NotFoundException('user not found')
        }
        const isMatch = bcrypt.compare(signInInfo.password, user.password)
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = {
            uuid: user.uuid,
            email: user.email,
            password: user.password
        };
        const token = this.jwtService.sign(payload);
        return token;
    }
}

