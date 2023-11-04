import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Screen1 from "../../assets/Screen1.png";
import Screen2 from "../../assets/Screen2.png";
import Screen3 from "../../assets/Screen3.png";
import Screen4 from "../../assets/Screen4.png";
import Screen5 from "../../assets/Screen5.png";
import AppStore from "../../assets/AppStore.png";
import GooglePlay from "../../assets/GooglePlay.png";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const screen = [Screen1, Screen2, Screen3, Screen4, Screen5];

const Home = () => {
  const theme = useTheme();
  const [curScreen, setCurScreen] = useState(0);

  const changeCurScreen = (number) => {
    if (number >= 0 && number < screen.length) {
      setCurScreen(number);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        marginTop: "50px",
        marginBottom: "30px",
        display: "flex",
        alignItems: "center",
        minHeight: "82vh",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "40%",
          flexDirection: "column",
          alignItems: "center",
          [theme.breakpoints.down("md")]: {
            width: "100%",
          },
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
          [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: "30px",
          },
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
              "&:hover": theme.primary.hoverDefault,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.medium,
              },
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
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.medium,
              },
              "&:hover": theme.primary.hoverDefault,
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
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.medium,
              },
              "&:hover": theme.primary.hoverDefault,
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
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.medium,
              },
              "&:hover": theme.primary.hoverDefault,
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
            [theme.breakpoints.down("md")]: {
              width: "80%",
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "600",
              fontSize: theme.primary.medium,
              color: "white",
              "&:hover": theme.primary.hoverDefault,
            }}
            textAlign="center"
          >
            SẮP CÓ MẶT TẠI
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "center",
              },
            }}
          >
            <img class="home-download" src={AppStore} alt="" />
            <img class="home-download" src={GooglePlay} alt="" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
