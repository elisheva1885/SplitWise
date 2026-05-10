
import './App.css'
import router from './routes/router'
import {RouterProvider} from 'react-router-dom'
import { UserProvider } from './store/user.context'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme/theme'
import CssBaseline from '@mui/material/CssBaseline'
import { ForgetPasswordForm } from './components/forget-password-form'
import { AuthPage } from './pages/auth.page'
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <RouterProvider router={router} />
        <AuthPage mode="login" />
        <ForgetPasswordForm />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
