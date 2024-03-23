import React, { useState, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PostDetail = ({ data, setPostId }) => {
  const theme = useTheme();
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
    <Container
      sx={{
        backgroundColor: "white",
        marginTop: "30px",
        marginBottom: "30px",
        display: "flex",
        flexDirection: "column",
        minHeight: "75vh",
        [theme.breakpoints.down("md")]: {
          marginTop: "15px",
          marginBottom: "15px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          width: "200px",
          marginBottom: "10px",
        }}
        onClick={() => setPostId(null)}
      >
        <ArrowBackIcon sx={{ fontSize: theme.primary.medium }} />
        <Typography
          sx={{
            fontFamily: theme.primary.fontFamily,
            fontWeight: "500",
            fontSize: theme.primary.small,
            marginLeft: "5px",
            "&:hover": theme.primary.hoverDefault,
            [theme.breakpoints.down("md")]: {
              fontSize: theme.primary.medium,
            },
          }}
        >
          Quay lại
        </Typography>
      </Box>
      <CardMedia
        component="img"
        image={data.img ? data.img : ""}
        sx={{ maxHeight: "600px" }}
        alt="Paella dish"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100px",
          }}
        >
          <AccountCircleIcon
            sx={{
              fontSize: theme.primary.medium,
              [theme.breakpoints.down("md")]: {
                fontSize: "3vh",
              },
            }}
          />
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "500",
              fontSize: theme.primary.small,
              marginLeft: "5px",
              "&:hover": theme.primary.hoverDefault,
              [theme.breakpoints.down("md")]: {
                fontSize: "2vh",
              },
            }}
          >
            FinTrack
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "50px",
            }}
          >
            <CommentIcon
              sx={{
                fontSize: theme.primary.medium,
                [theme.breakpoints.down("md")]: {
                  fontSize: "3vh",
                },
              }}
            />
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "500",
                fontSize: theme.primary.small,
                marginLeft: "5px",
                "&:hover": theme.primary.hoverDefault,
                [theme.breakpoints.down("md")]: {
                  fontSize: "2vh",
                },
              }}
            >
              0
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "50px",
            }}
          >
            <FavoriteBorderIcon
              sx={{
                fontSize: theme.primary.medium,
                [theme.breakpoints.down("md")]: {
                  fontSize: "3vh",
                },
              }}
            />
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "500",
                fontSize: theme.primary.small,
                marginLeft: "5px",
                "&:hover": theme.primary.hoverDefault,
                [theme.breakpoints.down("md")]: {
                  fontSize: "2vh",
                },
              }}
            >
              0
            </Typography>
          </Box>
        </Box>
      </Box>

      <Typography
        sx={{
          fontFamily: theme.primary.fontFamily,
          fontWeight: "700",
          fontSize: "50px",
          marginTop: "20px",
          marginLeft: "5px",
          "&:hover": theme.primary.hoverDefault,
          [theme.breakpoints.down("md")]: {
            fontSize: "3vh",
          },
        }}
      >
        {data.title}
      </Typography>
      <Box px={2}>
        {data.content.map((content, id) => (
          <Typography
            sx={{
              fontFamily: theme.primary.main,
              fontWeight: "500",
              fontSize: "20px",
              marginTop: "20px",
              marginLeft: "5px",
              "&:hover": theme.primary.hoverDefault,
              [theme.breakpoints.down("md")]: {
                fontSize: "2vh",
              },
            }}
            key={id}
            textAlign="justify"
          >
            {content}
          </Typography>
        ))}
      </Box>
    </Container>
  );
};

export default PostDetail;
