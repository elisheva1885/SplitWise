import { createContext } from "react";
import type { GroupData } from "./group.types";

export type GroupState = {
    groups: GroupData[] | []
};

export type GroupContextType = GroupState & {
    setGroups: (groups: GroupData[]) => void,
    setGroup: (group: GroupData) => void,
    // addGroup: (group: CreateGroupDto) => void,
    // updateGroup: (groupId: number, groupData: UpdateGroupDto) => void,
    // deleteGroup: (groupId: number) => void,
    // getGroup: (groupId: number) => void,
    // addUserToGroup: (groupId: number, userId: number) => void,
    // deleteUserFromGroup: (groupId: number, userId: number) => void,
};
export const GroupContext = createContext<GroupContextType | null>(null);


// export type GroupContextProviderProps = {
//     children: ReactNode
// }

// export type Action = AddGroupAction | DeleteGroupAction | UpdateGroupAction | GetGroupAction | AddUserToGroupAction | DeleteUserFromGroupAction

// export const ActionType = {
//     ADD: 'ADD_GROUP',
//     DELETE: 'DELETE_GROUP',
//     UPDATE: 'UPDATE_GROUP',
//     GET: 'GET_GROUP',
//     ADD_USER: 'ADD_USER_TO_GROUP',
//     DELETE_USER: 'DELETE_USER_FROM_GROUP'
// } as const


// export type AddGroupAction = {
//     type: typeof ActionType.ADD,
//     payload: CreateGroupDto
// }

// export type DeleteGroupAction = {
//     type: typeof ActionType.DELETE,
//     payload: number
// }

// export type UpdateGroupAction = {
//     type: typeof ActionType.UPDATE,
//     payload: { groupId: number, groupData: UpdateGroupDto }
// }


// export type GetGroupAction = {
//     type: typeof ActionType.GET,
//     payload: number
// }

// export type AddUserToGroupAction = {
//     type: typeof ActionType.ADD_USER,
//     payload: { groupId: number, userId: number }
// }

// export type DeleteUserFromGroupAction = {
//     type: typeof ActionType.DELETE_USER,
//     payload: { groupId: number, userId: number }
// }