import { createContext } from "react";
import type { GroupData } from "./group.types";
import type { OptimizedExpense } from "./expense.type";

export type GroupState = {
  groups: GroupData[];
  group: GroupData | null;
  optimizedExpenses: OptimizedExpense[];
};

export type GroupContextType = GroupState & {
  setGroups: (groups: GroupData[]) => void;
  setGroup: (group: GroupData) => void;
  updateGroups: (group: GroupData) => void;
  setOptimizedExpenses: (expenses: OptimizedExpense[]) => void;
};
export const GroupContext = createContext<GroupContextType | null>(null);
