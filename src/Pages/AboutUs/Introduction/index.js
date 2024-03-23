import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CircleIcon from "@mui/icons-material/Circle";
import AboutUs1 from "../../../assets/AboutUs1.png";
import CardMedia from "@mui/material/CardMedia";

const Introduction = () => {
  const theme = useTheme();
  const [curMember, setCurMember] = useState("0");
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  return (
    <Grid
      container
      sx={{
        marginTop: "30px",
        padding: "50px",
        [theme.breakpoints.down("md")]: {
          padding: "10px",
        },
      }}
    >
      <Grid
        xs={12}
        md={6}
        sx={{
          [theme.breakpoints.down("md")]: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
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
              "&:hover": theme.primary.hoverDefault,
              [theme.breakpoints.down("md")]: {
                fontSize: "3vh",
              },
            }}
          >
            TIẾT KIỆM
          </Typography>
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "800",
              fontSize: "5vh",
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

        <Typography
          sx={{
            fontFamily: theme.primary.fontFamily,
            fontWeight: "800",
            fontSize: "3vh",
            color: theme.primary.main,
            [theme.breakpoints.down("md")]: {
              fontSize: "1.7vh",
              fonWeight: 600,
            },
            "&:hover": theme.primary.hoverDefault,
          }}
        >
          Có gì trong siêu ứng dụng tài chính FinTrack ?
        </Typography>

        <Typography
          sx={{
            fontFamily: theme.primary.fontFamily,
            fontWeight: "600",
            fontSize: "2vh",
            padding: "15px",
            color: theme.primary.main,
            [theme.breakpoints.down("md")]: {
              fontSize: "1.5vh",
              paddingLeft: "30px",
              paddingRight: "30px",
            },
            "&:hover": theme.primary.hoverDefault,
          }}
          textAlign="justify"
        >
          FinTrack - một ứng dụng hỗ trợ người dùng xây dựng lộ trình tài chính
          cá nhân hóa một cách thông minh và hiệu quả. FinTrack mang đến một
          giải pháp đơn giản, dễ sử dụng và có tiềm năng thay đổi cách mọi người
          quản lý và định hình tài chính tương lai thông qua các tiện ích chính:
        </Typography>

        <Box>
          <Box
            sx={{
              display: "flex",
              marginLeft: "30px",
              alignItems: "center",
              [theme.breakpoints.down("md")]: {
                marginLeft: "10px",
              },
            }}
          >
            <CircleIcon
              sx={{
                color: theme.primary.main,
                fontSize: "8px",
                [theme.breakpoints.down("md")]: {
                  fontSize: "1.5vh",
                },
              }}
            />
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "600",
                fontSize: "2vh",
                color: theme.primary.main,
                "&:hover": theme.primary.hoverDefault,
                marginLeft: "10px",
                [theme.breakpoints.down("md")]: {
                  fontSize: "1.5vh",
                },
              }}
              textAlign="left"
            >
              Thiết kế mục tiêu tài chính
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              marginLeft: "30px",
              alignItems: "center",
              [theme.breakpoints.down("md")]: {
                marginLeft: "10px",
              },
            }}
          >
            <CircleIcon
              sx={{
                color: theme.primary.main,
                fontSize: "8px",
                [theme.breakpoints.down("md")]: {
                  fontSize: "1.5vh",
                },
              }}
            />
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "600",
                fontSize: "2vh",
                color: theme.primary.main,
                "&:hover": theme.primary.hoverDefault,
                marginLeft: "10px",
                [theme.breakpoints.down("md")]: {
                  fontSize: "1.5vh",
                },
              }}
              textAlign="left"
            >
              Xây dựng lộ trình tài chính cá nhân hoá
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              marginLeft: "30px",
              alignItems: "center",
              [theme.breakpoints.down("md")]: {
                marginLeft: "10px",
              },
            }}
          >
            <CircleIcon
              sx={{
                color: theme.primary.main,
                fontSize: "8px",
                [theme.breakpoints.down("md")]: {
                  fontSize: "1.5vh",
                },
              }}
            />
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "600",
                fontSize: "2vh",
                color: theme.primary.main,
                "&:hover": theme.primary.hoverDefault,
                marginLeft: "10px",
                [theme.breakpoints.down("md")]: {
                  fontSize: "1.5vh",
                },
              }}
              textAlign="left"
            >
              Quản lý chi tiêu
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              marginLeft: "30px",
              alignItems: "center",
              [theme.breakpoints.down("md")]: {
                marginLeft: "10px",
              },
            }}
          >
            <CircleIcon
              sx={{
                color: theme.primary.main,
                fontSize: "8px",
                [theme.breakpoints.down("md")]: {
                  fontSize: "1.5vh",
                },
              }}
            />
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "600",
                fontSize: "2vh",
                color: theme.primary.main,
                "&:hover": theme.primary.hoverDefault,
                marginLeft: "10px",
                [theme.breakpoints.down("md")]: {
                  fontSize: "1.5vh",
                },
              }}
              textAlign="left"
            >
              Quản lý tài chính
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              marginLeft: "30px",
              alignItems: "center",
              [theme.breakpoints.down("md")]: {
                marginLeft: "10px",
              },
            }}
          >
            <CircleIcon
              sx={{
                color: theme.primary.main,
                fontSize: "8px",
                [theme.breakpoints.down("md")]: {
                  fontSize: "1.5vh",
                },
              }}
            />
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "600",
                fontSize: "2vh",
                color: theme.primary.main,
                "&:hover": theme.primary.hoverDefault,
                marginLeft: "10px",
                [theme.breakpoints.down("md")]: {
                  fontSize: "1.5vh",
                },
              }}
              textAlign="left"
            >
              Và hơn thế nữa ...
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid xs={12} md={6} sx={{ display: "flex", alignItems: "center" }}>
        <CardMedia
          component="img"
          sx={{
            width: "90%",
            [theme.breakpoints.down("md")]: {
              margin: "0 auto",
              marginTop: "20px",
            },
          }}
          image={AboutUs1}
          alt="Paella dish"
        />
      </Grid>
    </Grid>
  );
};

export default Introduction;
