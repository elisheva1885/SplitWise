import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          WebkitBorderBeforeColor: "#ffffff",
          borderColor: "#ffffff",
          color: "white",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#12300a",
          },
          input: {
            "&:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px transparent inset",
              WebkitTextFillColor: "#fff",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          color: 'white',
          fontSize:'11px'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          color: "white",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          maxWidth: "247px",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          maxWidth: "247px",
          width: "auto",
        },
      },
    },
  },
});
