import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { numToMoney } from "../../../Functions/text";
import PaidIcon from "@mui/icons-material/Paid";
import ErrorIcon from "@mui/icons-material/Error";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const Dashboard = () => {
  const theme = useTheme();

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
              {numToMoney(20000000)}
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
              {numToMoney(5000000)}
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
              {numToMoney(15000000)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
