<<<<<<< HEAD
import type { UserIdAndName, UserInExpense, UserInGroup } from "./user.types";
=======
import type { UserInGroup } from "./user.types";
>>>>>>> client/group-page

export type ExpenseInGroup = {
  id: number;
  cause: string;
  value: number;
  paidBy: UserInGroup;
  paidOn: UserInGroup;
};
<<<<<<< HEAD

export type OptimizedExpense = {
  value: number;
  paidByUser: UserInExpense;
  paidOnUser: UserInExpense;
};

export type CreateExpenseDto = {
  cause: string |undefined;
  value: number;
  paidBy: number;
  paidOn: number;
  groupId: number;
};

// export type expenseData = {
//   cause: string;
//   value: number;
//   paidBy: UserIdAndName;
//   paidOn: UserIdAndName;
//   groupId: number;
// };
=======
>>>>>>> client/group-page
