import type { CreateGroupDto, GroupData, GroupDataWithOwner, UpdateGroupMembersData } from "../types/group.types";
import api from "./client.api";

export async function CreateGroup(groupData: CreateGroupDto){
    const {data} = await api.post('/group', groupData);
    console.log(data);
    return data;
}

export async function getGroupDetails(groupId: number): Promise<GroupData> {
    const { data } = await api.get(`/group/${groupId}`);
    console.log(data);
    return data;
}

export async function updateGroup(groupId: number): Promise<GroupDataWithOwner> {
    const { data } = await api.patch(`/group/${groupId}`);
    console.log(data);
    return data;
}

export async function deleteGroup(groupId: number): Promise<number> {
    const res = await api.delete(`/group/${groupId}`);
    console.log(res);
    return res.status;
}

export async function addUserToGroup(groupId: number, userId: number): Promise<GroupData> {
    const { data } = await api.post(`/group/${groupId}/${userId}`);
    console.log(data);
    return data;
}

export async function deleteUserFromGroup(groupId: number, userId: number): Promise<UpdateGroupMembersData> {
    const { data } = await api.delete(`/group/${groupId}/${userId}`);
    console.log(data);
    return data;
} 