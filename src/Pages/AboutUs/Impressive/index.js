import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { postApi } from "../../../others/database";
import { SERVER } from "../../../constant";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";
import FlagIcon from "@mui/icons-material/Flag";

const Impressive = () => {
  const theme = useTheme();
  const [appData, setAppData] = useState({
    user: 0,
    goal: 0,
    transaction: 0,
  });

  useEffect(() => {
    postApi({}, `${SERVER}/user/info`).then((res) => {
      setAppData(res.data);
    });
  }, []);

  return (
    <Box container sx={{ marginBottom: "50px", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "800",
              fontSize: "5vh",
              color: theme.primary.main,
              marginLeft: "10px",
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.medium,
              },
              "&:hover": theme.primary.hoverDefault,
            }}
          >
            NHỮNG CON SỐ
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
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
            ẤN TƯỢNG CỦA
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
            FINTRACK!
          </Typography>
        </Box>
      </Box>

      <Grid container sx={{ width: "100%" }}>
        <Grid xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              backgroundColor: theme.primary.main,
              height: "170px",
              display: "flex",
              width: "80%",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "10px",
              paddingRight: "10px",
              alignItems: "center",
              borderRadius: theme.primary.borderRadius,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "600",
                  fontSize: "10vh",
                  color: theme.primary.sub,
                  "&:hover": theme.primary.hoverDefault,
                  [theme.breakpoints.down("md")]: {
                    fontSize: "11px",
                    width: "100%",
                  },
                }}
                textAlign="center"
              >
                {appData.transaction}
              </Typography>
              <PeopleIcon
                sx={{ color: "white", fontSize: "12vh", marginLeft: "10px" }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "600",
                fontSize: "3vh",
                color: "white",
                "&:hover": theme.primary.hoverDefault,
                [theme.breakpoints.down("md")]: {
                  fontSize: "11px",
                  width: "100%",
                },
              }}
              textAlign="center"
            >
              người dùng đồng hành
            </Typography>
          </Box>
        </Grid>

        <Grid xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              backgroundColor: theme.primary.main,
              height: "170px",
              display: "flex",
              width: "80%",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "10px",
              paddingRight: "10px",
              alignItems: "center",
              borderRadius: theme.primary.borderRadius,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "600",
                  fontSize: "10vh",
                  color: theme.primary.sub,
                  "&:hover": theme.primary.hoverDefault,
                  [theme.breakpoints.down("md")]: {
                    fontSize: "11px",
                    width: "100%",
                  },
                }}
                textAlign="center"
              >
                {appData.transaction}
              </Typography>
              <PaymentIcon
                sx={{ color: "white", fontSize: "12vh", marginLeft: "10px" }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "600",
                fontSize: "3vh",
                color: "white",
                "&:hover": theme.primary.hoverDefault,
                [theme.breakpoints.down("md")]: {
                  fontSize: "11px",
                  width: "100%",
                },
              }}
              textAlign="center"
            >
              giao dịch được ghi chép
            </Typography>
          </Box>
        </Grid>

        <Grid xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              backgroundColor: theme.primary.main,
              height: "170px",
              display: "flex",
              width: "80%",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "10px",
              paddingRight: "10px",
              alignItems: "center",
              borderRadius: theme.primary.borderRadius,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "600",
                  fontSize: "10vh",
                  color: theme.primary.sub,
                  "&:hover": theme.primary.hoverDefault,
                  [theme.breakpoints.down("md")]: {
                    fontSize: "11px",
                    width: "100%",
                  },
                }}
                textAlign="center"
              >
                {appData.goal}
              </Typography>
              <FlagIcon
                sx={{ color: "white", fontSize: "12vh", marginLeft: "10px" }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "600",
                fontSize: "3vh",
                color: "white",
                "&:hover": theme.primary.hoverDefault,
                [theme.breakpoints.down("md")]: {
                  fontSize: "11px",
                  width: "100%",
                },
              }}
              textAlign="center"
            >
              mục tiêu được thiết lập
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Impressive;
