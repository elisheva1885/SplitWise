import { useState, type ReactNode } from "react";
import type { GroupData } from "../types/group.types";
import { GroupContext } from "../types/group-context.types";

export const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<GroupData[] | []>([]);

  return (
    <GroupContext.Provider
      value={{
        groups,
        setGroups,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};