import { loginUser, registerUser } from "../api/auth.api";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import { RegisterForm } from "../components/register-form";
import { useUserContext } from "../store/use-user.context";
import type { LoginData, RegisterData } from "../schemas/auth-schemas";
import type { AuthPagemMode } from "../types/auth.types";
import { handleApiError } from "../helpers/handle-api-error.helper";
import { LoginForm } from "../components/login-form";
import { useSnackbar } from "../hooks/use-snackbar";
type AuthPageProps = {
  mode: AuthPagemMode;
  toRegisterMode: () => void;
  toForgetPasswordMode: () => void;
  toLoginMode: () => void;
  setDialogOpen: (open: boolean) => void;
};

export const AuthPage = ({
  mode,
  toRegisterMode,
  toForgetPasswordMode,
  setDialogOpen,
  toLoginMode,
}: AuthPageProps) => {
  const { setUser } = useUserContext();
  const {
    snackbar,
    showError,
    showSuccess,
    handleCloseSnackbar,
  } = useSnackbar();
  const handleSubmit = async (data: LoginData | RegisterData) => {
    try {
      if (mode === "Login") {
        const userData = await loginUser(data as LoginData);

        setUser(userData);
        showSuccess("Logged in successfully!")

      } else {
        const userData = await registerUser(data as RegisterData);

        setUser(userData);
        showSuccess("Register successfully!")
      }

      setTimeout(() => {
        setDialogOpen(false);
      }, 450);
    }catch (err) {
            showError(handleApiError(err));
        }
  };


  return (
    <>
      {mode === "Register" ? (
        <RegisterForm onSubmit={handleSubmit} toLoginMode={toLoginMode} />
      ) : (
        <LoginForm
          onSubmit={handleSubmit}
          toForgetPasswordMode={toForgetPasswordMode}
          toRegisterMode={toRegisterMode}
        />
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbar.severity}>
          <AlertTitle>
            {snackbar.severity === "success" ? "Success" : "Error"}
          </AlertTitle>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
