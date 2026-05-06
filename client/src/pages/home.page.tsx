import { useEffect } from "react";
import { getUserStatus } from "../api/auth.api";
import { useUserContext } from "../store/use-user.context";

export const HomePage = () => {
  const {setUser} = useUserContext();
  const userStatus = async()=> {
    const user = await getUserStatus();
    setUser(user);
  }
  useEffect(()=> {
    userStatus()
  },[])
  return <>HomePage</>;
};
