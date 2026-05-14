import type { UpdateGroupData } from "../schemas/group-schemas";
import type { CreateGroupDto, GroupData } from "../types/group.types";
import api from "./client.api";

export async function createGroup(
  groupData: CreateGroupDto,
): Promise<GroupData> {
  const { data } = await api.post("/group", groupData);
  return data;
}

export async function getGroupDetails(groupId: number): Promise<GroupData> {
  const { data } = await api.get(`/group/${groupId}`);
  return data;
}

export async function updateGroup(
  groupId: number,
  groupData: UpdateGroupData,
): Promise<GroupData> {
  const { data } = await api.patch(`/group/${groupId}`, groupData);
  return data;
}

export async function updateGroupOwner(
  groupId: number,
  ownerId: number,
): Promise<GroupData> {
  const { data } = await api.patch(`/group/${groupId}`, { ownerId });
  return data;
}

export async function deleteGroup(groupId: number): Promise<number> {
  await api.delete(`/group/${groupId}`);
  return groupId;
}

export async function addUserToGroup(
  groupId: number,
  userId: number,
): Promise<GroupData> {
  const { data } = await api.post(`/group/${groupId}/${userId}`);
  return data;
}

export async function deleteUserFromGroup(
  groupId: number,
  userId: number,
): Promise<GroupData> {
  const { data } = await api.patch(`/group/${groupId}/${userId}`);
  return data;
}
