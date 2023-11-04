import { useContext, useState, useEffect } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { GlobalContext } from "../../context/GlobalState";
import ClearIcon from "@mui/icons-material/Clear";

const ITEM_HEIGHT = 48;

const Header = ({ menuItems, curNav, setCurNav }) => {
  const [isMobile, setIsMobile] = useState(false);
  const theme = useTheme();
  const { name } = useContext(GlobalContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  console.log(isMobile);
  // create an event listener
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  return (
    <Box>
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
            display: "flex",
            flexDirection: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
            }}
          >
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

        {isMobile ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuIcon sx={{ fontSize: 40, color: theme.primary.main }} />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {menuItems.map((option) => (
                <Box onClick={() => setCurNav(option)}>
                  <MenuItem
                    key={option}
                    selected={option === "Pyxis"}
                    onClick={handleClose}
                    sx={{ fontSize: theme.primary.mediumMobile }}
                  >
                    {option}
                  </MenuItem>
                </Box>
              ))}
            </Menu>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                marginLeft: "10px",
                borderRadius: theme.primary.borderRadius,
                backgroundColor: theme.primary.main,
              }}
            >
              {name === "" ? (
                <Box
                  sx={{
                    display: "flex",
                  }}
                  onClick={() => setCurNav("Đăng nhập")}
                >
                  <PersonIcon
                    sx={{
                      color: "white",
                      fontSize: theme.primary.medium,
                    }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                  }}
                  onClick={() => setCurNav("Đăng nhập")}
                >
                  <ClearIcon
                    sx={{
                      color: "white",
                      fontSize: theme.primary.medium,
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        ) : (
          // web
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
                        curNav === item
                          ? theme.primary.sub
                          : theme.primary.main,
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
            {/* Sign in */}
            {isMobile ? (
              ""
            ) : (
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
              >
                {name === "" ? (
                  <Box
                    sx={{
                      display: "flex",
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
                    <ClearIcon
                      sx={{
                        color: "white",
                        fontSize: theme.primary.medium,
                      }}
                    />
                  </Box>
                )}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
