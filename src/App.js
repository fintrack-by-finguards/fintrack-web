import "./App.css";
import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Services from "./Pages/Services";

const menuItems = ["Trang chủ", "Tính năng", "Đội ngũ", "Liên hệ"];

function App() {
  const [curNav, setCurNav] = useState("Trang chủ");

  return (
    <Box class="App" sx={{ backgroundColor: "#FFF" }}>
      <Header menuItems={menuItems} curNav={curNav} setCurNav={setCurNav} />
      {curNav === "Trang chủ" ? <Home /> : ""}
      {curNav === "Tính năng" ? <Services /> : ""}
      <Footer />
    </Box>
  );
}

export default App;
