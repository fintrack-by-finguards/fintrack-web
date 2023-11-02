import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: theme.primary.main }}>
      <Container
        sx={{
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          boxShadow: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: theme.primary.fontFamily,
            fontWeight: "400",
            fontSize: theme.primary.small,
            color: "white",
          }}
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
      </Container>
    </Box>
  );
};

export default Footer;
