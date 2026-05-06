
import './App.css'
import router from './routes/router'
import { RouterProvider } from 'react-router-dom'
import { UserProvider } from './store/user.context'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme/theme'
import CssBaseline from '@mui/material/CssBaseline'
import { GroupProvider } from './store/groups.context'
function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GroupProvider>
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </GroupProvider>
      </ThemeProvider >
    </>
  )
}

export default App
