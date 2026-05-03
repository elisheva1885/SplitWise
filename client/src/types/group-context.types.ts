import { createContext } from "react";
import type { UserData } from "./auth.types";
import type { GroupData } from "./group.types";
 
export type GroupState = {
    user: GroupData |null
};
 
export type GroupContextType = GroupState & {
    setGroups: (group: GroupData)=> void,
    logout: () => void,
};
 export const GroupContext = createContext<GroupContextType | null>(null);