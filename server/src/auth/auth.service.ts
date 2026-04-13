import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { UserResponseDto } from 'src/user/dto/user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    // async findUserByUsername(username: string): Promise<User | null> {
    //     return await this.userRepository.findOne({
    //         where: { username }
    //     })
    // }

    async signUp(userDto: RegisterDto): Promise<UserResponseDto> {
        const existUser = await this.userRepository.findOne({
            where: { username: userDto.username }
        })
        if (existUser) {
            throw new ConflictException('username already exist')
        }
        const hash = await bcrypt.hash(userDto.password, 12);
        const user = await this.userRepository.save({
            email: userDto.email.toLocaleLowerCase(),
            username: userDto.username,
            password: hash
        })
        const userResult: UserResponseDto = {
            id: user.uuid,
            email: user.email,
            username: user.username
        }
        return userResult;
    }

    async signIn(userDto: LoginDto): Promise<UserResponseDto> {
        const existUser = await this.userRepository.createQueryBuilder('u').addSelect('u.password').where(
            'u.username = :username', { username: userDto.username }
        ).getOne();
        if (!existUser) {
            throw new NotFoundException('user not found')
        }
        const isMatch = bcrypt.compare(userDto.password, existUser.password)
        if(!isMatch){
            throw new UnauthorizedException();
        }
        
    }
}

