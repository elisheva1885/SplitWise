import type {
  LoginUserDto,
  RegisterUserDto,
  UserData,
} from "../types/auth.types";
import api from "./client.api";

export async function loginUser(userData: LoginUserDto): Promise<UserData> {
  const { data } = await api.post("/user/login", userData);
  return data;
}

export async function registerUser(
  userData: RegisterUserDto,
): Promise<UserData> {
  const { data } = await api.post("/user/register", userData);
  return data;
}

export async function getUserStatus(): Promise<UserData> {
  const { data } = await api.get("/user/status");
  return data;
}