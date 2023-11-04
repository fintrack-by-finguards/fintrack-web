import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import { GlobalContext } from "../../context/GlobalState";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ menuItems, curNav, setCurNav }) => {
  const theme = useTheme();
  const { name } = useContext(GlobalContext);
  return (
    <Box
      sx={{
        height: "70px",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        boxShadow: 2,
      }}
    >
      {/* Logo and name */}
      <Box
        sx={{
          height: "70px",
          width: "20%",
          display: "flex",
          flexDirection: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ margin: "0 auto", display: "flex", alignItems: "center" }}>
          <img class="image-header" src="/Logo2.png" alt="" />
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "600",
              fontSize: theme.primary.medium,
              color: theme.primary.main,
              marginLeft: "10px",
            }}
          >
            FinTrack
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "55%",
        }}
      >
        {/* Menu */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "75%",
          }}
        >
          {menuItems.map((item) => (
            <Box
              sx={{
                marginLeft: "30px",
                display: "flex",
                alignItems: "center",
                borderBottom:
                  curNav === item ? `2px solid ${theme.primary.sub}` : "",
              }}
              onClick={() => setCurNav(item)}
            >
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "600",
                  fontSize: theme.primary.semi,
                  color:
                    curNav === item ? theme.primary.sub : theme.primary.main,
                }}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
        {/* Sign in */}
        {name === "" ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "25%",
              height: "50px",
              marginLeft: "10px",
              borderRadius: theme.primary.borderRadius,
              backgroundColor: theme.primary.main,
            }}
            onClick={() => setCurNav("Đăng nhập")}
          >
            <PersonIcon
              sx={{
                color: "white",
                fontSize: theme.primary.medium,
              }}
            />
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "600",
                fontSize: theme.primary.semi,
                color: "white",
                marginLeft: "10px",
              }}
            >
              Đăng nhập
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "50px",
              height: "50px",
              borderRadius: "100px",
              marginLeft: "10px",
              backgroundColor: theme.primary.main,
            }}
            onClick={() => setCurNav("Đăng nhập")}
          >
            <MenuIcon
              sx={{
                color: "white",
                fontSize: theme.primary.medium,
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
