import { useState, type ReactNode } from "react";
import { UserContext } from "../types/user-context.types";
import type { UserData } from "../types/auth.types";
import { logoutUser } from "../api/auth.api";
import type { GroupData } from "../types/group.types";
import { GroupContext, type GroupState } from "../types/group-context.types";




export const GroupProvider = ({ children }: { children: ReactNode }) => {
    const [groups, setGroupsState] = useState<GroupData[] | []>([]);
    const setGroups = (groups: GroupData[]) => setGroupsState(groups);
    const getGroupById = (groupId: number)=> groups.find(group=> group.id===groupId)
    return (
        <GroupContext.Provider value={{
            groups, setGroups, getGroupById

        }}>
            {children}
        </GroupContext.Provider>
    )
    // const groupsReducer = (state: GroupState, action: Action): GroupState => {
    //     switch (action.type) {
    //         case 'ADD': {

    //             return {
    //                 ...state,
    //                 groups: [...state.groups, group]
    //             }
    //         }
    //         case 'DELETE':
    //             return {
    //                 ...state,
    //                 groups: state.groups.filter(group => group.id !== action.payload)

    //             }
    //         case 'UPDATE':
    //             return {
    //                 ...state,
    //                 groups: [...state.groups, group]
    //             }
    //         default:
    //             return state;
    //     }
    // }


}

