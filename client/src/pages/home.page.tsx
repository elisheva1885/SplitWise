import { useEffect } from "react";
import { getUserStatus } from "../api/auth.api";
import { useUserContext } from "../store/use-user.context";

export const HomePage = () => {
  const { setUser } = useUserContext();
  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const user = await getUserStatus();
        setUser(user);
      } catch {
        setUser(null);
      }
    };

    fetchUserStatus();
  }, [setUser]);
  return <>HomePage</>;
};
