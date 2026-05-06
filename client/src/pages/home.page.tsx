import { useEffect } from "react";
import { getUserStatus } from "../api/auth.api";
import { useUserContext } from "../store/use-user.context";

export const HomePage = () => {
  const { setUser } = useUserContext();
  const userStatus = async () => {
    try {
      const user = await getUserStatus();
      setUser(user);
    }
    catch  {
      setUser(null);
    }
  }
  useEffect(() => {
    userStatus()
  })
  return <>HomePage</>;
};
