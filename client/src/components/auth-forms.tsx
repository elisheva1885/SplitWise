import { LoginPage } from "../pages/login.page";
import type { AuthFormStatus } from "../types/auth.types";
import { Navbar } from "./navnbar"
import { Outlet } from "react-router";
import { RegisterForm } from "./register-form";
import { ForgetPasswordForm } from "./forget-password-form";
import { RegisterPage } from "../pages/register.page";
import { ForgetPasswordPage } from "../pages/forget-password.page";
import Button from "@mui/material/Button";
import { useState } from "react";

type AuthFormsProps = {
    setDialogOpen:  (open: boolean) => void
}
export const AuthForms = ({setDialogOpen}: AuthFormsProps) => {
    const [status,setStatus] = useState<AuthFormStatus>('Login');

    const toRegisterMode = ()=> {
        setStatus('Register');
    }
    const toForgetPasswordMode = ()=> {
        setStatus('ForgetPassword'); 
    }
    const toLogindMode = ()=> {
        setStatus('Login'); 
    }
    return (
        <>
            {status === 'Login' ? <LoginPage toRegisterMode={toRegisterMode} toForgetPasswordMode={toForgetPasswordMode} setDialogOpen={setDialogOpen}/> : (status === 'Register' ? <RegisterPage toLoginMode={toLogindMode} /> : <ForgetPasswordPage toLoginMode={toLogindMode} />)}  
        </>
    )
}