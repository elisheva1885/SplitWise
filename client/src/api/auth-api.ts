import type { LoginUserDto, RegisterUserDto, UserData } from "../types/auth.types";
import api from "./client-api";

export async function loginUser(userData: LoginUserDto): Promise<UserData> {
    const { data } = await api.post('/user/login', userData);
    console.log(data);
    return data;

}

export async function registerUser(userData: RegisterUserDto): Promise<UserData> {
    const { data } = await api.post('/user/register', userData);
    console.log(data);
    return data;
} 

export  function logoutUser(): void {
    const response =  api.post('/user/logout');
    console.log(response);
} 

