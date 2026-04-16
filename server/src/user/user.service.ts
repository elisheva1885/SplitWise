import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUsernameOrEmail(
    username: string,
    email: string,
  ): Promise<User | null> {
    return await this.userRepository.findOne({
      where: [{ username }, { email }],
    });
  }

  async findById(
    id: number
  ): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { uuid: id },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { username: username },
    });
  }
  async createUser(userData: RegisterDto, hashPassword: string): Promise<User> {
    return await this.userRepository.save({
      email: userData.email,
      username: userData.username,
      password: hashPassword,
    });
  }
}
