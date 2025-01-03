import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalProvider, GlobalContext } from "./context/GlobalState";

const theme = createTheme({
  primary: {
    main: "#192841",
    sub: "#FFB000",
    greyLight: "#DCDCDC",
    red: "#E32636",
    green: "#32de84",
    fontFamily: "Montserrat",
    big: "8vh",
    semiBig: "5vh",
    medium: "3vh",
    semi: "2.5vh",
    small: "2vh",
    borderRadius: "8px",
    mediumMobile: "2.3vh",
    smallMobile: "1.5vh",
    hoverPointer: { cursor: "pointer" },
    hoverDefault: { cursor: "default" },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </GlobalProvider>
);
