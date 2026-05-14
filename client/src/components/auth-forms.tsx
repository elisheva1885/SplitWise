import type { AuthFormStatus } from "../types/auth.types";
import { useState } from "react";
import { ForgetPasswordForm } from "./forget-password-form";
import { AuthPage } from "../pages/auth.page";

type AuthFormsProps = {
  setDialogOpen: (open: boolean) => void;
};
export const AuthForms = ({ setDialogOpen }: AuthFormsProps) => {
  const [status, setStatus] = useState<AuthFormStatus>("Login");

  const toRegisterMode = () => {
    setStatus("Register");
  };
  const toForgetPasswordMode = () => {
    setStatus("ForgetPassword");
  };
  const toLogindMode = () => {
    setStatus("Login");
  };
  return (
    <>
      {status === "ForgetPassword" ? (
        <ForgetPasswordForm
          toLoginMode={toLogindMode}
          setDialogOpen={setDialogOpen}
        />
      ) : (
        <AuthPage
          mode={status}
          toLoginMode={toLogindMode}
          toForgetPasswordMode={toForgetPasswordMode}
          toRegisterMode={toRegisterMode}
          setDialogOpen={setDialogOpen}
        />
      )}
    </>
  );
};
