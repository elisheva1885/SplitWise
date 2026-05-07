import { useState, type ReactNode } from "react";
import { UserContext } from "../types/user-context.types";
import type { UserData } from "../types/auth.types";
import { logoutUser } from "../api/auth.api";
import { useGroupContext } from "./use-group.context";

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<UserData | null>(null);
    const {setGroups} = useGroupContext()
    const setUser = (user: UserData) => setUserState(user);
    const logout = () => {
        logoutUser();
        setUserState(null)
    setGroups([])};

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}


