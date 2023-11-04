import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.primary.main,
        paddingBottom: "5px",
      }}
    >
      <Box
        sx={{
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            height: "100px",
            justifyContent: "center",
            width: "100%",
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: theme.primary.fontFamily,
            fontWeight: "400",
            fontSize: "theme.primary.small",
            color: "white",
            [theme.breakpoints.down("md")]: {
              fontSize: "11px",
              marginTop: "10px",
              width: "100%",
            },
          }}
          textAlign="center"
        >
          FinTrack - Ứng dụng hỗ trợ xây dựng lộ trình tài chính cá nhân
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "600",
              fontSize: theme.primary.small,
              color: "white",
              [theme.breakpoints.down("md")]: {
                fontSize: "11px",
                marginTop: "5px",
                marginBottom: "5px",
              },
            }}
          >
            Email:
          </Typography>
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "400",
              fontSize: theme.primary.small,
              color: "white",
              marginLeft: "10px",
              [theme.breakpoints.down("md")]: {
                fontSize: "11px",
                marginTop: "5px",
                marginBottom: "5px",
              },
            }}
          >
            fintrack@gmail.com
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <FacebookIcon
            sx={{ color: "white", fontSize: theme.primary.semiBig }}
          />
          <TelegramIcon
            sx={{
              color: "white",
              fontSize: theme.primary.semiBig,
              marginLeft: "10px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
