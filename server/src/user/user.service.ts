import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';
import {
  GetUserResponseDto,
  UpdateUserDto,
  UpdateUserResponseDto,
} from './dto/user.dto';

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

  async findByUuid(uuid: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { uuid },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
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
    const user = await this.userRepository.findOne({
      where: { uuid: userId },
      relations: ['groups', 'groups.owner'],
    });

    if (!user) {
      throw new NotFoundException();
    }
    const userDto: GetUserResponseDto = {
      user: {
        id: user.uuid,
        username: user?.username,
        email: user?.email,
      },
      groups: user?.groups?.map((group) => ({
        id: group.uuid,
        name: group.name,
        owner: { uuid: group.owner.uuid, username: group.owner.username },
      })),
    };
    return userDto;
  }

  async updateUser(
    userId: number,
    userData: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    const user = await this.findByUuid(userId);
    if (!user) {
      throw new NotFoundException();
    }
    if (userData.username && userData.username !== user.username) {
      const existUser = await this.findByUsername(userData.username);
      if (existUser) {
        throw new ConflictException('user name is already exist');
      }
      user.username = userData.username;
    }
    if (userData.email && userData.email !== user.email) {
      const existUser = await this.findByEmail(userData.email);
      if (existUser) {
        throw new ConflictException('email is already exist');
      }
      user.email = userData.email;
    }
    const updatedUser = await this.userRepository.save(user);
    const updateUserResponse: UpdateUserResponseDto = {
      email: updatedUser?.email,
      username: updatedUser?.username,
    };
    return updateUserResponse;
  }

  async deleteUser(userId: number): Promise<{ message: string }> {
    const user = await this.findByUuid(userId);
    if (!user) {
      throw new NotFoundException();
    }
    //TODO: check if the user have any expense on this group
    //if he has to throw BadRequestException
    user.groups = [];
    user.expensesPaid = [];
    await this.userRepository.save(user);
    await this.userRepository.remove(user);
    return { message: 'user deleted successfully' };
  }
}
