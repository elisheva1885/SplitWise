export class UserResponseDto {
  id!: number;
  email!: string;
  username!: string;
}


export class UpdateUserDto{
  email?: string;
  username?: string;
}