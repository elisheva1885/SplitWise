export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserDto {
  username: string;
  password: string;
}

export type LoginFormData = {
  username: string;
  password: string;
};

export type RegisterFormData = {
  username: string;
  email: string;
  password: string;
};

export type ForgetPasswordFormData = {
  email: string;
};
export type UserData = {
  username: string;
  email: string;
};
