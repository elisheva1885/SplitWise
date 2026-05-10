import { useState, type ReactNode } from "react";
import { UserContext } from "../types/user-context.types";
import type { UserData } from "../types/auth.types";
import { logoutUser } from "../api/auth.api";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
