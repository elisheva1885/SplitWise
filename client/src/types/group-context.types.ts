import { createContext } from "react";
import type { UserData } from "./auth.types";
import type { GroupData } from "./group.types";

export type GroupState = {
    groups: GroupData[] | []
};

export type GroupContextType = GroupState & {
    setGroups: (group: GroupData[]) => void,
    getGroupById: (groudId:number)=> GroupData |undefined
    // addGroup: (group: GroupData) => void,
    // updateGroup: (group: GroupData) => void,
    // deleteGroup: (groupId: number) => void,
};
export const GroupContext = createContext<GroupContextType | null>(null);