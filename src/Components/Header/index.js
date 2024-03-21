import { useContext, useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { GlobalContext } from "../../context/GlobalState";
import MyMenu from "./MyMenu";
import ClearIcon from "@mui/icons-material/Clear";
import SorryDialog from "./SorryDialog";

const ITEM_HEIGHT = 48;

const Header = ({ menuItems, curNav, setCurNav }) => {
  const [isMobile, setIsMobile] = useState(false);
  const theme = useTheme();
  const { name, updateConnect, updateName, updateUsername } =
    useContext(GlobalContext);

  const [openSorry, setOpenSorry] = useState(false);

  useEffect(() => {}, [name]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setOpenSorry(true);
    // setAnchorEl(event.currentTarget);
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

  const signOut = () => {
    updateConnect(false);
    updateName("");
    updateUsername("");
  };

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
                "&:hover": theme.primary.hoverDefault,
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
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                    }}
                    onClick={() => handleClick()}
                  >
                    <PersonIcon
                      sx={{
                        color: "white",
                        fontSize: theme.primary.medium,
                      }}
                    />
                  </Box>
                  <SorryDialog
                    openDialog={openSorry}
                    handleCloseDialog={() => setOpenSorry(false)}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                  }}
                  onClick={() => signOut()}
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
              width: "65%",
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
                <Box>
                  {item !== "Sản phẩm" ? (
                    <Button
                      sx={{
                        marginLeft: "10px",
                        display: "flex",
                        alignItems: "center",
                        borderBottom:
                          curNav === item
                            ? `2px solid ${theme.primary.sub}`
                            : "",
                      }}
                      onClick={() => setCurNav(item)}
                    >
                      <Typography
                        sx={{
                          fontFamily: theme.primary.fontFamily,
                          fontWeight: "600",
                          fontSize: theme.primary.semi,
                          "&:hover": {
                            cursor: "pointer",
                            color: theme.primary.sub,
                            borderBottom:
                              curNav === item
                                ? " "
                                : `2px solid ${theme.primary.sub}`,
                          },
                          color:
                            curNav === item
                              ? theme.primary.sub
                              : theme.primary.main,
                        }}
                      >
                        {item}
                      </Typography>
                    </Button>
                  ) : (
                    <MyMenu curNav={curNav} item={item} setCurNav={setCurNav} />
                  )}
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
                      alignItems: "center",
                      "&:hover": theme.primary.hoverPointer,
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
                      borderRadius: "100px",
                      marginLeft: "10px",
                      backgroundColor: theme.primary.main,
                    }}
                    onClick={() => signOut()}
                  >
                    <ClearIcon
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
                      Đăng xuất
                    </Typography>
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
