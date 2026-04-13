import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { UserResponseDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findUserByUsername(username: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { username }
        })
    }

    async sipnUp(userDto: RegisterDto): Promise<UserResponseDto> {
        const existUser = await this.findUserByUsername(userDto.username)
        if (existUser) {
            throw new ConflictException('username already exist')
        }
        const hash = await bcrypt.hash(userDto.password, 12);
        const user = await this.userRepository.save({
            email: userDto.email.toLocaleLowerCase(),
            username: userDto.username,
            password : hash
        })
        const userResult : UserResponseDto = {
            id: user.uuid,
            email: user.email,
            username: user.username
        }
        return userResult;
    }
}

