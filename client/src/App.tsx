import "./App.css";
// import { LoginPage } from "./pages/login.page";
import router from "./routes/router";
import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./store/user.context";
// import { RegisterPage } from "./pages/register.page";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ForgetPasswordPage } from "./pages/forget-password.page";
import { Auth } from "./components/auth";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <RouterProvider router={router} />
        {/* <LoginPage />
        <RegisterPage /> */}
        <Auth mode='login'/>
        <ForgetPasswordPage />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
