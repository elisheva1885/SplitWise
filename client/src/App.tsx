
import './App.css'
import { LoginForm } from './components/login-form'
// import { RegisterForm } from './components/register-form'
import { LoginPage } from './pages/login.page'
import router from './routes/router'
import {RouterProvider} from 'react-router-dom'
import { UserProvider } from './store/user.context'
import { RegisterPage } from './pages/register.page'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme'
function App() {

  return (
    <>
    {/* <ThemeProvider theme={theme}> */}
    <UserProvider>
    <RouterProvider router={router}/>
    <LoginPage/>
    <RegisterPage/>
    </UserProvider>
    {/* </ThemeProvider> */}
    </>
  )
}

export default App
