import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async findByUsername(username: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { username }
        })
    }
    async createUser(userData: RegisterDto, hashPassword:string): Promise<User> {
        console.log(userData, hashPassword);
        return await this.userRepository.save({
            email: userData.email.toLocaleLowerCase(),
            username: userData.username,
            password: hashPassword
        })
    }


}
