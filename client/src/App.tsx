
import './App.css'
import { LoginForm } from './components/login-form'
import { RegisterForm } from './components/register-form'
import router from './routes/router'
import {RouterProvider} from 'react-router-dom'
function App() {

  return (
    <>
    <RouterProvider router={router}/>
    <LoginForm/>
    <RegisterForm/>
    </>
  )
}

export default App
