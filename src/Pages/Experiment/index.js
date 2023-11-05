import React, { useContext } from "react";
import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GlobalContext } from "../../context/GlobalState";
import Suggest from "../../assets/Suggest.png";

const Experiment = () => {
  const theme = useTheme();
  const { name } = useContext(GlobalContext);

  return (
    <Container
      sx={{
        backgroundColor: theme.primary.main,
        marginTop: "50px",
        marginBottom: "100px",
        display: "flex",
        alignItems: "center",
        minHeight: "60vh",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: theme.primary.borderRadius,
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          width: "80%",
          padding: "50px",
          minHeight: "50vh",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: theme.primary.semiBig,
          color: theme.primary.sub,
          fontFamily: theme.primary.fontFamily,
          fontWeight: 800,
          "&:hover": theme.primary.hoverDefault,
          marginBottom: "10px",
          [theme.breakpoints.down("md")]: {
            fontSize: theme.primary.mediumMobile,
          },
        }}
      >
        Xin chào, {name !== "" ? name : "bạn"}!
      </Typography>
      <Typography
        sx={{
          fontSize: theme.primary.big,
          color: "white",
          fontFamily: theme.primary.fontFamily,
          fontWeight: 800,
          paddingLeft: "50px",
          paddingRight: "50px",
          textAlign: "center",
          "&:hover": theme.primary.hoverDefault,
          [theme.breakpoints.down("md")]: {
            fontSize: theme.primary.semi,
            paddingLeft: "5px",
            paddingRight: "5px",
            textAlign: "justify",
            marginTop: "10px",
            marginBottom: "10px",
          },
        }}
      >
        Cùng đón chờ để thử nghiệm tính năng đầu tiên vào 07/09/2023
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        <Typography
          sx={{
            fontSize: theme.primary.medium,
            color: theme.primary.sub,
            fontFamily: theme.primary.fontFamily,
            fontWeight: 800,
            "&:hover": theme.primary.hoverDefault,
            [theme.breakpoints.down("md")]: {
              fontSize: theme.primary.small,
            },
            marginRight: "20px",
          }}
        >
          Gợi ý:
        </Typography>
        <img class="experiment-image" src={Suggest} alt="" />
      </Box>
    </Container>
  );
};

export default Experiment;
