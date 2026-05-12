import type { UserData } from "../types/auth.types";
import api from "./client.api";
import { UpdateUserDto } from "../types/user.types";

export async function updateUser(userData: UpdateUserDto): Promise<UserData> {
  const { data } = await api.patch("/user", userData);
  console.log(data);
  return data;
}

export async function deleteUser(): Promise<number> {
  const res = await api.delete("/user");
  console.log(res);
  return res.status;
}
