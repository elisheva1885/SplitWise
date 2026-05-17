import { createContext } from "react";
import type { GroupData } from "./group.types";

export type GroupState = {
  groups: GroupData[] | [];
  group: GroupData | null;
};

export type GroupContextType = GroupState & {
  setGroups: (groups: GroupData[]) => void;
  setGroup: (group: GroupData) => void;
  updateGroups  : (group: GroupData) => void;
};
export const GroupContext = createContext<GroupContextType | null>(null);
