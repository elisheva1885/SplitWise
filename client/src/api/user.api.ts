import type { AxiosResponse } from "axios";
import type { LoginUserDto, RegisterUserDto } from "../types/auth.types";
import api from "./client-api";

export async function loginUser(userData: LoginUserDto): Promise<string> {
    const { data } = await api.post('/user/login', userData);
    return data;

}

export async function registerUser(userData: RegisterUserDto): Promise<string> {
    const response = await api.post('/user/register', userData);
    console.log(response);
    return response.data;
} 