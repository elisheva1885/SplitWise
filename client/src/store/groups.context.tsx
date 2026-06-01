import { useState, type ReactNode } from "react";
import type { GroupData } from "../types/group.types";
import { GroupContext } from "../types/group-context.types";
import type { OptimizedExpense } from "../types/expense.type";

export const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<GroupData[] | []>([]);
  const [group, setGroup] = useState<GroupData | null>(null);
  const [alignment, setAlignment] = useState<string | null>(null);
  const updateGroups = (updatedGroup: GroupData) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === updatedGroup.id ? updatedGroup : g)),
    );
    if (updatedGroup.id === group?.id) {
      setGroup(updatedGroup);
    }
  };
  const [optimizedExpenses, setOptimizedExpenses] = useState<
    OptimizedExpense[]
  >([]);

  return (
    <GroupContext.Provider
      value={{
        groups,
        setGroups,
        group,
        setGroup,
        updateGroups,
        optimizedExpenses,
        setOptimizedExpenses,
        alignment,
        setAlignment,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
