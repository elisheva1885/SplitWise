import type { UserData } from "../types/auth.types";
import api from "./client.api";
import { UpdateUserDto } from "../types/user.types";

export async function updateUser(userData: UpdateUserDto): Promise<UserData> {
  const { data } = await api.patch("/user", userData);
  return data;
}

export async function deleteUser(): Promise<number> {
  const res = await api.delete("/user");
  return res.status;
}
