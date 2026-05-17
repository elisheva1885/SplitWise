import type { UserInGroup } from "./user.types";
import type { ExpenseInGroup } from "./expense.type";

export type GroupData = {
  id: number;
  name: string;
  description: string;
  owner: UserInGroup;
  members: UserInGroup[];
  expense: ExpenseInGroup[];
};

export type CreateGroupDto = {
  name: string;
  description: string;
};
