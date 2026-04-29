import { useContext, useState, type ReactNode } from "react";
 import { UserContext } from "../types/user-context.types";
import type { UserData } from "../types/auth.types";
 

 
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] =useState<UserData | null>(null);
    const setUser = (user: UserData) => setUserState(user);
    const logout = () => setUserState(null);
 
return (
    <UserContext.Provider value={{ user, setUser, logout }}>
        {children}
    </UserContext.Provider>
)
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};