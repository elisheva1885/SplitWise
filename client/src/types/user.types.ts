<<<<<<< HEAD
import type { GroupData } from "./group.types";

export type User = {
  username: string;
  email: string;
};

export type UserInGroup = {
  id: number;
  username: string;
  email: string;
};

export type UpdateUserDto = {
  username: string;
  email: string;
};

export type UserDetails = {
  username: string;
  email: string;
  groups: GroupData[];
};

export type UserIdAndName = {
  id: number;
  username: string;
};

export type UserInExpense = {
  id: number;
  username: string;
};
=======
export class UpdateUserDto {
  username?: string;
  email?: string;
}
>>>>>>> dev
