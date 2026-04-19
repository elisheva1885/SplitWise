import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { GetUserResponseDto, UpdateUserDto, UpdateUserResponseDto } from './dto/user.dto';
import { Expense } from 'src/expense/expense.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Expense)
        private readonly expenseRepository: Repository<Expense>
    ) { }

    async findByUsernameOrEmail(
        username: string,
        email: string,
    ): Promise<User | null> {
        return await this.userRepository.findOne({
            where: [{ username }, { email }],
        });
    }

    async findById(id: number): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { uuid: id },
        });
    }

    async findByUsername(username: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { username },
            relations: ['groups']
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { email },
            relations: ['groups']
        });
    }
    async createUser(userData: RegisterDto, hashPassword: string): Promise<User> {
        return await this.userRepository.save({
            email: userData.email,
            username: userData.username,
            password: hashPassword,
        });
    }

    async getUserInfoAndGroups(userId: number): Promise<GetUserResponseDto> {
        const user = await this.findById(userId);
        if (!user) {
            throw new UnauthorizedException();
        }
        const userDto: GetUserResponseDto = {
            user: {
                id: user.uuid,
                username: user?.username,
                email: user?.email
            },
            groups: user?.groups?.map(group => ({
                id: group.uuid, name: group.name
            }))
        };
        return userDto;
    }

    async updateUser(userId: number, userData: UpdateUserDto): Promise<UpdateUserResponseDto> {
        const user = await this.findById(userId);
        if (!user) {
            throw new UnauthorizedException();
        }
        if (userData.username) {
            const existUser = await this.findByUsername(userData.username);
            if (existUser && existUser.uuid !== userId) {
                throw new ConflictException('user name is already exist');
            }
            user.username = userData.username;
        }
        if (userData.email) {
            const existUser = await this.findByEmail(userData.email);
            if (existUser && existUser.uuid !== userId) {
                throw new ConflictException('email is already exist');
            }
            user.email = userData.email;
        }
        const updatedUser = await this.userRepository.save(user);
        const updateUserResponse : UpdateUserResponseDto = {
            email: updatedUser?.email,
            username: updatedUser?.username
        }
        return updateUserResponse;
    }

    async deleteUser(userId: number): Promise<{message: string}>  {
        const user = await this.findById(userId);
        if (!user) {
            throw new UnauthorizedException();
        }
        const userDebts = await this.expenseRepository.find({
            where: {
                paidOn: user
            }
        })
        if (userDebts.length > 0) {
            throw new BadRequestException("User has debts");
        }
        await this.userRepository.remove(user);
        return {message: "user deleted successfully"};
    }

}
