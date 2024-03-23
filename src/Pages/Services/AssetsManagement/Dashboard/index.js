import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { numToMoney } from "../../../Functions/text";
import { postApi } from "../../../../others/database";
import { SERVER } from "../../../../constant";
import { GlobalContext } from "../../../../context/GlobalState";
import PaidIcon from "@mui/icons-material/Paid";
import ErrorIcon from "@mui/icons-material/Error";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const Dashboard = ({ day, month, year }) => {
  const theme = useTheme();

  const { username } = useContext(GlobalContext);

  const [totalAssets, setTotalAssets] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);

  useEffect(() => {
    postApi(
      { username: username, day: day, month: month, year: year },
      `${SERVER}/assets/getOne`
    ).then((res) => {
      setTotalAssets(
        res.data.assets.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0)
      );
      setTotalDebt(
        res.data.debt.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0)
      );
    });
  }, [day, month, year]);

  return (
    <Box
      sx={{
        width: "95%",
        height: "120px",
        borderRadius: theme.primary.borderRadius,
        display: "flex",
        alignItems: "center",
        margin: "0 auto",
        marginBottom: "30px",
        [theme.breakpoints.down("md")]: {
          height: "150px",
        },
      }}
      boxShadow={3}
    >
      <Grid container>
        <Grid
          md={4}
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PaidIcon
            sx={{
              color: theme.primary.sub,
              fontSize: "80px",
              [theme.breakpoints.down("md")]: {
                fontSize: "8vh",
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              marginLeft: "10px",
            }}
          >
            <Typography
              sx={{
                color: theme.primary.sub,
                fontSize: "2.2vh",
                fontWeight: 700,
                fontFamily: theme.primary.fontFamily,
                [theme.breakpoints.down("md")]: {
                  fontSize: "2vh",
                },
              }}
            >
              Tổng tài sản
            </Typography>
            <Typography
              sx={{
                color: theme.primary.main,
                fontSize: "2.2vh",
                fontWeight: 700,
                fontFamily: theme.primary.fontFamily,
                [theme.breakpoints.down("md")]: {
                  fontSize: "2vh",
                },
              }}
            >
              {numToMoney(totalAssets)}
            </Typography>
          </Box>
        </Grid>

        <Grid
          md={4}
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ErrorIcon
            sx={{
              color: theme.primary.red,
              fontSize: "80px",
              [theme.breakpoints.down("md")]: {
                fontSize: "8vh",
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              marginLeft: "10px",
            }}
          >
            <Typography
              sx={{
                color: theme.primary.red,
                fontSize: "2.2vh",
                fontWeight: 700,
                fontFamily: theme.primary.fontFamily,
                [theme.breakpoints.down("md")]: {
                  fontSize: "2vh",
                },
              }}
            >
              Tổng nợ
            </Typography>
            <Typography
              sx={{
                color: theme.primary.main,
                fontSize: "2.2vh",
                fontWeight: 700,
                fontFamily: theme.primary.fontFamily,
                [theme.breakpoints.down("md")]: {
                  fontSize: "2vh",
                },
              }}
            >
              {numToMoney(totalDebt)}
            </Typography>
          </Box>
        </Grid>

        <Grid
          md={4}
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            [theme.breakpoints.down("md")]: {
              marginTop: "10px",
            },
          }}
        >
          <AccountBalanceWalletIcon
            sx={{
              color: theme.primary.green,
              fontSize: "80px",
              [theme.breakpoints.down("md")]: {
                fontSize: "8vh",
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              marginLeft: "10px",
            }}
          >
            <Typography
              sx={{
                color: theme.primary.green,
                fontSize: "2.2vh",
                fontWeight: 700,
                fontFamily: theme.primary.fontFamily,
                [theme.breakpoints.down("md")]: {
                  fontSize: "2vh",
                },
              }}
            >
              Tài sản ròng
            </Typography>
            <Typography
              sx={{
                color: theme.primary.main,
                fontSize: "2.2vh",
                fontWeight: 700,
                fontFamily: theme.primary.fontFamily,
                [theme.breakpoints.down("md")]: {
                  fontSize: "2vh",
                },
              }}
            >
              {numToMoney(totalAssets - totalDebt)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
