import "./App.css";
// import { LoginPage } from "./pages/login.page";
import router from "./routes/router";
import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./store/user.context";
// import { RegisterPage } from "./pages/register.page";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { Auth } from "./components/auth";
import { ForgetPasswordForm } from "./components/forget-password-form";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <RouterProvider router={router} />
        <Auth mode='register'/>
        <ForgetPasswordForm />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
