import type { AxiosResponse } from "axios";
import type { LoginUserDto, RegisterUserDto } from "../types/auth-types";
import api from "./client-api";

export function loginUser(userData:LoginUserDto) :Promise<void>{
     return api.post('/user/login', userData);
    
} 

export function registerUser(userData:RegisterUserDto):Promise<void> {
    return api.post('/user/register', userData);

} 