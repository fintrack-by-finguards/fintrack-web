import "./App.css";
import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Services from "./Pages/Services";
import FinancialPlans from "./Pages/Services/FinancialPlans";
import TransactionsManagement from "./Pages/Services/TransactionsManagement";
import AssetsManagement from "./Pages/Services/AssetsManagement";
import Community from "./Pages/Community";
import { GlobalProvider } from "./context/GlobalState";
import { SnackbarProvider } from "notistack";
import GoalsManagement from "./Pages/Services/GoalsManagement";

const menuItems = ["Trang chủ", "Sản phẩm", "Cộng đồng", "Về chúng tôi"];

function App() {
  const [curNav, setCurNav] = useState("Trang chủ");

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
          {curNav === "Sản phẩm" ? <Services /> : ""}
          {curNav === "Về chúng tôi" ? <AboutUs /> : ""}
          {curNav === "Cộng đồng" ? <Community /> : ""}
          {curNav === "Kế hoạch tài chính" ? <FinancialPlans /> : ""}
          {curNav === "Mục tiêu tài chính" ? <GoalsManagement /> : ""}
          {curNav === "Quản lý chi tiêu" ? <TransactionsManagement /> : ""}
          {curNav === "Quản lý tài chính" ? <AssetsManagement /> : ""}
          {/* {curNav === "Thử nghiệm" ? <Experiment /> : ""} */}
          {curNav === "Đăng nhập" ? <Login setCurNav={setCurNav} /> : ""}
          <Footer />
        </Box>
      </SnackbarProvider>
    </GlobalProvider>
  );
}

export default App;
