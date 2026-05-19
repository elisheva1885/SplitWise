import { useEffect } from "react";
import { getUserStatus } from "../api/auth.api";
import { useUserContext } from "../store/use-user.context";
import { Box, Card, Typography } from "@mui/material";

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
 <Typography sx={{ padding: "5rem 0 2.5rem", textAlign: "center",fontSize: 48, fontWeight: 800, lineHeight: 1.1,
          letterSpacing: "-0.03em", margin: "0 0 1.25rem" }}>
           Welcome to Splitwise

        {/* <h1 sx={{
          fontSize: 48, fontWeight: 500, lineHeight: 1.1,
          letterSpacing: "-0.03em", margin: "0 0 1.25rem",
        }}>
          Split costs.<br />Not relationships.
</h1> */}
 </Typography>
<Typography sx={{ padding: "1rem 0 1rem", textAlign: "center",fontSize: 20, fontWeight: 200, lineHeight: 1.1,
          letterSpacing: "-0.03em", margin: "0 0 0rem" }}>
          the easiest wat to manage group expenses
 </Typography>
   {/* <div style={{ fontFamily: "inherit", maxWidth: 680, margin: "0 auto", padding: "0 24px" }}> */}
{/* 
        <p style={{
          fontSize: 17, color: "#ffffff", lineHeight: 1.65,
          maxWidth: 420, margin: "0 auto",
        }}>
          Track shared expenses across groups, settle debts effortlessly,
          and always know exactly where you stand.
</p>
</div> */}
 
      {/* Divider */}
{/* <div style={{ height: "0.5px", background: "#e5e7eb" }} /> */}
 
      {/* Features */}
{/* <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", padding: "1.5rem 0" }}>
        {[
          {
            label: "Group expenses",
            desc: "Create a group for any occasion — trips, dinners, rent. Add members and start splitting.",
          },
          {
            label: "Live balances",
            desc: "Every new transaction recalculates who owes whom. No manual math, ever.",
          },
          {
            label: "Full history",
            desc: "Every expense and payment is logged. A complete record for every group you're in.",
          },
        ].map((f) => (
<div key={f.label} style={{ borderTop: "0.5px solid #e5e7eb", paddingTop: "1.25rem" }}>
<div style={{ fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{f.label}</div>
<div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{f.desc}</div>
</div>
        ))}
</div> */}
<Box sx={{display:'flex', gap:2, width: '80%', justifyContent: 'center', alignItems: 'center', textAlign:'center'}}>
 <Card  key= {"Group expenses"}  sx={{ borderTop: "0.5px solid #e5e7eb", paddingTop: "1.25rem" }}>Create a group for any occasion — trips, dinners, rent. Add members and start splitting.</Card>
 <Card  key= {"Group expenses"}  sx={{ borderTop: "0.5px solid #e5e7eb", paddingTop: "1.25rem" }}>Create a group for any occasion — trips, dinners, rent. Add members and start splitting.</Card>
 <Card  key= {"Group expenses"}  sx={{ borderTop: "0.5px solid #e5e7eb", paddingTop: "1.25rem" }}>Create a group for any occasion — trips, dinners, rent. Add members and start splitting.</Card>

</Box>
      {/* Bottom tagline */}
{/* <div style={{ padding: "2.5rem 0 4rem", textAlign: "center" }}>
<p style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.35, margin: 0 }}>
          Fair splits for every group,<br />every time.
</p>
</div> */}
 
     {/* </div> */}
    </>
};
