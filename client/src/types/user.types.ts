import type { GroupData } from "./group.types";

export type User = {
  username: string;
  email: string;
};

export type UserInGroup = {
  id: number;
  username: string;
<<<<<<< HEAD
=======
  email: string;
};

export type UpdateUserDto = {
  username: string;
  email: string;
>>>>>>> client/group-page
};

export type UserDetails = {
  username: string;
  email: string;
  groups: GroupData[];
};

<<<<<<< HEAD
export type UserIdAndName = {
  id: number;
  username: string;
};

export type UserInExpense = {
=======
export type UserToAdd = {
>>>>>>> client/group-page
  id: number;
  username: string;
};
