import { useEffect } from "react";
import { getUserStatus } from "../api/auth.api";
import { useUserContext } from "../store/use-user.context";
import { Typography } from "@mui/material";

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
  return <>
    <Typography sx={{
      padding: "10rem 0 1.5rem", textAlign: "center", fontSize: 48, fontWeight: 800, lineHeight: 1.1,
      letterSpacing: "-0.03em", margin: "0 0 1rem"
    }}>
      Welcome to Splitwise
    </Typography>
    <Typography sx={{
      padding: "1rem 0 1rem", textAlign: "center", fontSize: 20, fontWeight: 200, lineHeight: 1.1,
      letterSpacing: "-0.03em", margin: "0 0 0rem"
    }}>
      the easiest way to manage group expenses
    </Typography>
  </>
};
