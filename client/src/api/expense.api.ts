import api from "./client.api";

export async function getOptimizedExpenses(groupId: number): Promise<GroupData> {
    const { data } = await api.get(`/expense/${groupId}`);
    console.log(data);
    return data;
}