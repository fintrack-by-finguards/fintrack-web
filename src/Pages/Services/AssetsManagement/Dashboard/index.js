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

const Dashboard = () => {
  const theme = useTheme();

  const { username } = useContext(GlobalContext);

  const [totalAssets, setTotalAssets] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);

  useEffect(() => {
    postApi(
      { username: username, day: 30, month: 3, year: 2024 },
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
  }, []);

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
      }}
      boxShadow={3}
    >
      <Grid container>
        <Grid
          xs={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PaidIcon sx={{ color: theme.primary.sub, fontSize: "80px" }} />
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
              }}
            >
              {numToMoney(totalAssets)}
            </Typography>
          </Box>
        </Grid>

        <Grid
          xs={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ErrorIcon sx={{ color: theme.primary.red, fontSize: "80px" }} />
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
              }}
            >
              {numToMoney(totalDebt)}
            </Typography>
          </Box>
        </Grid>

        <Grid
          xs={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AccountBalanceWalletIcon
            sx={{ color: theme.primary.green, fontSize: "80px" }}
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
