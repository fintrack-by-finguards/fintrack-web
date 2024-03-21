import React, { useState, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Introduction from "./Introduction";
import Impressive from "./Impressive";
import Member from "./Member";
import MissionAndGoal from "./MissionAndGoal";
import Reasons from "./Reasons";
import Plan from "./Plan";

const AboutUs = () => {
  const theme = useTheme();
  const [curMember, setCurMember] = useState("0");
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  return (
    <Container
      sx={{
        backgroundColor: "white",
        marginTop: "30px",
        marginBottom: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "75vh",
        [theme.breakpoints.down("md")]: {
          marginTop: "15px",
          marginBottom: "15px",
        },
      }}
    >
      <Introduction />
      <Impressive />
      <Reasons />
      <Member />
      <MissionAndGoal />
      <Plan />
    </Container>
  );
};

export default AboutUs;
