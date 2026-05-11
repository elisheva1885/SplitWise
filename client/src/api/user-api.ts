import type { UserData } from "../types/auth.types";
import api from "./client.api";
import type { User, UserDetails, UserIdAndName } from "../types/user.types";

export async function updateUser(userData: User): Promise<UserData> {
  const { data } = await api.patch("/user", userData);
  console.log(data);
  return data;
}

export async function deleteUser(): Promise<number> {
  const res = await api.delete("/user");
  console.log(res);
  return res.status;
}

export async function getUserDetails(): Promise<UserDetails> {
  const { data } = await api.get("/user");
  console.log(data);
  return data;
}

export async function getAllUsers(): Promise<UserIdAndName[]> {
  const { data } = await api.get("/user/all");
  return data;
}
