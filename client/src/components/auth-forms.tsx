import { LoginPage } from "../pages/login.page";
import type { AuthFormStatus } from "../types/auth.types";
import { RegisterPage } from "../pages/register.page";
import { ForgetPasswordPage } from "../pages/forget-password.page";
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
            {status === 'Login' ? <LoginPage toRegisterMode={toRegisterMode} toForgetPasswordMode={toForgetPasswordMode} setDialogOpen={setDialogOpen}/> : (status === 'Register' ? <RegisterPage toLoginMode={toLogindMode}  setDialogOpen={setDialogOpen}/> : <ForgetPasswordPage toLoginMode={toLogindMode} />)}  
        </>
    )
}