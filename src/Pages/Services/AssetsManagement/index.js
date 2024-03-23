import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Dashboard from "./Dashboard";
import AssetsChart from "./AssetsChart";
import Fluctuations from "./Fluctuations";
import { getCurrentTime, getDays, createArray } from "../../Functions/text";
import { TIME } from "../../../constant/index";

const AssetsManagement = () => {
  let currentTime = getCurrentTime();
  const theme = useTheme();

  const [choseMonth, setChoseMonth] = useState(currentTime.month);
  const [choseYear, setChoseYear] = useState(currentTime.year);

  const [displayDay, setDisplayDay] = useState(currentTime.day);

  const handleChangeTime = (data) => {
    setChoseMonth(data.month);
    setChoseYear(data.year);
  };

  return (
    <Container
      sx={{
        marginBottom: "100px",
        minHeight: "50vh",
        marginTop: "50px",
        [theme.breakpoints.down("md")]: {
          marginBottom: "150px",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: theme.primary.borderRadius,
          display: "flex",
          overflow: "hidden",
          overflowX: "scroll",
          height: "50px",
          width: "80%",
          margin: "0 auto",
          marginTop: "10px",
          padding: "5px",
          border: `6px solid ${theme.primary.sub}`,
        }}
      >
        {TIME.map((data, id) => (
          <MenuItem
            value={1}
            onClick={() => handleChangeTime(data)}
            key={id}
            sx={{
              backgroundColor:
                choseMonth === data.month && choseYear === data.year
                  ? theme.primary.main
                  : "white",
            }}
          >
            <Typography
              sx={{
                color:
                  choseMonth === data.month && choseYear === data.year
                    ? "white"
                    : theme.primary.main,
                fontSize: theme.primary.small,
                fontWeight: 600,
                fontFamily: theme.primary.fontFamily,
                [theme.breakpoints.down("md")]: {
                  fontSize: "2vh",
                },
              }}
            >
              {(data.month < 10 ? "0" + data.month : data.month) +
                "/" +
                data.year}
            </Typography>
          </MenuItem>
        ))}
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: theme.primary.borderRadius,
          display: "flex",
          overflow: "hidden",
          overflowX: "scroll",
          height: "40px",
          width: "60%",
          margin: "0 auto",
          marginTop: "10px",
          padding: "5px",
          marginBottom: "10px",
          [theme.breakpoints.down("md")]: {
            height: "50px",
            marginTop: "20px",
            marginBottom: "20px",
          },
        }}
      >
        {createArray(getDays(choseYear, choseMonth)).map((data, id) => (
          <MenuItem
            value={1}
            onClick={() => setDisplayDay(data + 1)}
            key={id}
            sx={{
              backgroundColor:
                data + 1 === displayDay ? theme.primary.main : "white",
              height: "40px",
              width: "40px",
              borderRadius: "50px",
              marginLeft: "5px",
              marginRight: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              [theme.breakpoints.down("md")]: {
                width: "50px",
              },
            }}
          >
            <Typography
              sx={{
                color: data + 1 === displayDay ? "white" : theme.primary.main,
                fontSize: theme.primary.small,
                fontWeight: 600,
                fontFamily: theme.primary.fontFamily,
                [theme.breakpoints.down("md")]: {
                  fontSize: "2vh",
                },
              }}
            >
              {data + 1}
            </Typography>
          </MenuItem>
        ))}
      </Box>
      <Grid container>
        <Grid xs={12} md={8}>
          <Dashboard day={displayDay} month={choseMonth} year={choseYear} />

          <AssetsChart day={displayDay} month={choseMonth} year={choseYear} />
        </Grid>
        <Grid xs={12} md={4}>
          <Fluctuations month={choseMonth} year={choseYear} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AssetsManagement;
