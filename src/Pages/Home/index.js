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

const Home = () => {
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
      <Box
        sx={{
          display: "flex",
          width: "40%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img class="home-screen" src={screen[curScreen]} alt="" />
        <Box sx={{ display: "flex" }}>
          <ArrowCircleLeftIcon
            sx={{ fontSize: theme.primary.big, color: theme.primary.main }}
            onClick={() => changeCurScreen(curScreen - 1)}
          />
          <ArrowCircleRightIcon
            sx={{ fontSize: theme.primary.big, color: theme.primary.main }}
            onClick={() => changeCurScreen(curScreen + 1)}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "60%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "800",
              fontSize: theme.primary.big,
              color: theme.primary.main,
              marginLeft: "10px",
            }}
          >
            TIẾT KIỆM
          </Typography>
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "800",
              fontSize: theme.primary.big,
              color: theme.primary.sub,
              marginLeft: "10px",
            }}
          >
            KHÔNG KHÓ
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "800",
              fontSize: theme.primary.big,
              color: theme.primary.sub,
              marginLeft: "10px",
            }}
          >
            CÓ
          </Typography>
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "800",
              fontSize: theme.primary.big,
              color: theme.primary.main,
              marginLeft: "10px",
            }}
          >
            FINTRACK LO!
          </Typography>
        </Box>
        {/* Download */}
        <Box
          sx={{
            backgroundColor: theme.primary.main,
            width: "70%",
            marginTop: "20px",
            borderRadius: theme.primary.borderRadius,
            padding: "20px",
          }}
        >
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "600",
              fontSize: theme.primary.medium,
              color: "white",
            }}
          >
            TẢI NGAY TẠI
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <img class="home-download" src={AppStore} alt="" />
            <img class="home-download" src={GooglePlay} alt="" />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
