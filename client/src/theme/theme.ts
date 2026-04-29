import { createTheme } from '@mui/material/styles';
 
const theme = createTheme({
  palette: {
    mode: 'dark',
 
    // primary: {
    //   main: '#1B5E20',
    //   light: '#2E7D32',
    // },
 
    // secondary: {
    //   main: '#424242',
    // },
 
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
 
    // text: {
    //   primary: '#E0E0E0',
    //   secondary: '#A5A5A5',
    // },
 
    // success: {
    //   main: '#66BB6A', // למשל כשמישהו קיבל כסף
    // },
 
    // error: {
    //   main: '#EF5350', // חובות / שגיאות
    // },
  },
 
  shape: {
    borderRadius: 10,
  },
});
 
export default theme;