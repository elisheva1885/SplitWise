import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    background: {
      default: "#6b9783",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          WebkitBorderBeforeColor: "#ffffff",
          borderColor: "#ffffff",
          color: "black",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000000",
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
          backgroundColor: "transparent",
          color: "white",
          fontSize: "11px",
        },
      },
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
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px transparent inset",
            WebkitTextFillColor: "inherit ",
            transition: "background-color 9999s ease-in-out 0s",
        },
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
