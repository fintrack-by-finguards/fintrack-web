import "./App.css";
import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Members from "./Pages/Members";
import Services from "./Pages/Services";
import { GlobalProvider } from "./context/GlobalState";
import { SnackbarProvider } from "notistack";

const menuItems = ["Trang chủ", "Tính năng", "Đội ngũ", "Thử nghiệm"];

function App() {
  const [curNav, setCurNav] = useState("Đăng nhập");

  return (
    <GlobalProvider>
      <SnackbarProvider maxSnack={3}>
        <Box
          class="App"
          sx={{
            backgroundColor: "#FFF",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Header menuItems={menuItems} curNav={curNav} setCurNav={setCurNav} />
          {curNav === "Trang chủ" ? <Home /> : ""}
          {curNav === "Tính năng" ? <Services /> : ""}
          {curNav === "Đội ngũ" ? <Members /> : ""}
          {curNav === "Đăng nhập" ? <Login setCurNav={setCurNav} /> : ""}
          <Footer />
        </Box>
      </SnackbarProvider>
    </GlobalProvider>
  );
}

export default App;
