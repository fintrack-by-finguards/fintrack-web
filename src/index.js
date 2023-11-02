import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  primary: {
    main: "#192841",
    sub: "#FFB000",
    fontFamily: "Montserrat",
    big: "50px",
    semiBig: "35px",
    medium: "25px",
    semi: "18px",
    small: "13px",
    borderRadius: "8px",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
