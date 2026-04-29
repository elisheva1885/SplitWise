import { createContext } from "react";
import type { UserData } from "./auth.types";
 
export type UserState = {
    user: UserData |null
};
 
export type UserContextType = UserState & {
    setUser: (user: UserData)=> void,
    logout: () => void,
};
 export const UserContext = createContext<UserContextType | null>(null);