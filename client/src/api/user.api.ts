import type { UserData } from "../types/auth.types";
import api from "./client.api";
import type {
  UpdateUserDto,
  UserDetails,
  UserIdAndName,
} from "../types/user.types";

export async function updateUser(userData: UpdateUserDto): Promise<UserData> {
  const { data } = await api.patch("/user", userData);
  return data;
}

export async function deleteUser(): Promise<number> {
  const res = await api.delete("/user");
  return res.status;
}

export async function getUserDetails(): Promise<UserDetails> {
  const { data } = await api.get(`/user`);
  return data;
}

export async function getAllUsers(
  startUsername: string,
): Promise<UserIdAndName[]> {
  const { data } = await api.get(`/user/all?query=${startUsername}`);
  console.log(data);

  return data;
}
