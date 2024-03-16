import React, { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Dashboard from "./Dashboard";
import AssetsChart from "./AssetsChart";
import Fluctuations from "./Fluctuations";

const AssetsManagement = () => {
  const theme = useTheme();

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
      <Grid container>
        <Grid xs={8}>
          <Dashboard />

          <AssetsChart />
        </Grid>
        <Grid xs={4}>
          <Fluctuations />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AssetsManagement;
