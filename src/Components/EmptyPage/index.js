import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const EmptyPage = () => {
  const theme = useTheme();

  return (
    <Container
      sx={{
        backgroundColor: theme.primary.main,
        padding: "50px",
        marginTop: "50px",
        marginBottom: "50px",
        height: "50vh",
        width: "100%",
        borderRadius: theme.primary.borderRadius,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
          width: "80%",
          padding: "30px",
          height: "40vh",
        },
      }}
    >
      <Typography
        sx={{
          fontFamily: theme.primary.fontFamily,
          fontWeight: "600",
          fontSize: theme.primary.medium,
          color: "white",
          "&:hover": theme.primary.hoverDefault,
          [theme.breakpoints.down("md")]: {
            fontSize: "2vh",
          },
        }}
        textAlign={"justify"}
      >
        Vui lòng đăng nhập để bắt đầu sử dụng dịch vụ của chúng tôi!
      </Typography>

      <LockOpenIcon
        sx={{
          fontSize: "200px",
          color: "white",
          marginTop: "30px",
          [theme.breakpoints.down("md")]: {
            fontSize: "20vh",
          },
        }}
      />
    </Container>
  );
};

export default EmptyPage;
