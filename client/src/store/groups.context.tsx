import { useState, type ReactNode } from "react";
import type { GroupData } from "../types/group.types";
import { GroupContext } from "../types/group-context.types";




export const GroupProvider = ({ children }: { children: ReactNode }) => {
    const [groups, setGroupsState] = useState<GroupData[] | []>([]);
    const setGroups = (groups: GroupData[]) => setGroupsState(groups);
    return (
        <GroupContext.Provider value={{
            groups, setGroups

        }}>
            {children}
        </GroupContext.Provider>
    )
}
//     const groupsReducer = (state: GroupState, action: Action): GroupState => {
//         switch (action.type) {
//             case 'ADD_GROUP': {
//                 try{
//                     const data = await createGroup(action.payload)
//                      state.groups.push(data)
//                 }
//                 catch{

//                 }
//             }
//             case 'DELETE':
//                 try{
//                     const data = await deleteGroup(action.payload)
//                      state.groups.push(data)
//                 }
//                 return {
//                     ...state,
//                     groups: state.groups.filter(group => group.id !== action.payload.)

//                 }
//             case 'UPDATE':
//                 return {
//                     ...state,
//                     groups: [...state.groups, group]
//                 }
//             default:
//                 return state;
//         }
//     }


// }

