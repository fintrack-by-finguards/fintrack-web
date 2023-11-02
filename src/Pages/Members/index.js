import React, { useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Screen1 from "../../assets/Screen1.png";
import Screen2 from "../../assets/Screen2.png";
import Screen3 from "../../assets/Screen3.png";
import AppStore from "../../assets/AppStore.png";
import GooglePlay from "../../assets/GooglePlay.png";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const screen = [Screen1, Screen2, Screen3];

const Members = () => {
  const theme = useTheme();
  const [curScreen, setCurScreen] = useState(0);

  const changeCurScreen = (number) => {
    if (number >= 0 && number < screen.length) {
      setCurScreen(number);
    }
  };

  return (
    <Container
      sx={{
        backgroundColor: "white",
        marginTop: "50px",
        marginBottom: "30px",
        display: "flex",
        alignItems: "center",
        height: "80vh",
      }}
    >
      Members
    </Container>
  );
};

export default Members;
