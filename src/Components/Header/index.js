import { useContext, useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  MenuList,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { GlobalContext } from "../../context/GlobalState";
import MyMenu from "./MyMenu";
import ClearIcon from "@mui/icons-material/Clear";
import SorryDialog from "./SorryDialog";
import FiberSmartRecordIcon from "@mui/icons-material/FiberSmartRecord";

const ITEM_HEIGHT = 48;

const Header = ({ menuItems, curNav, setCurNav }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [initialAnchorEl, setInitialAnchorEl] = useState(null);
  const theme = useTheme();
  const { name, updateConnect, updateName, updateUsername } =
    useContext(GlobalContext);

  const [openSorry, setOpenSorry] = useState(false);
  const [displayServices, setDisplayServices] = useState(false);

  useEffect(() => {}, [name]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    // setOpenSorry(true);
    setAnchorEl(event.currentTarget);
    setInitialAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
    setDisplayServices(false);
  };

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

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
              <Box onClick={() => setCurNav("Trang chủ")}>
                <MenuItem
                  key={"Trang chủ"}
                  onClick={handleClose}
                  sx={{ fontSize: theme.primary.mediumMobile }}
                >
                  {"Trang chủ"}
                </MenuItem>
              </Box>
              <Box
                onClick={() => {
                  setOpen(true);
                  setDisplayServices(!displayServices);
                  setAnchorEl(initialAnchorEl);
                }}
              >
                <MenuItem
                  key={"Sản phẩm"}
                  onClick={handleClose}
                  sx={{ fontSize: theme.primary.mediumMobile }}
                >
                  {"Sản phẩm"}
                </MenuItem>
              </Box>
              <Box
                sx={{ display: displayServices ? "block" : "none" }}
                onClick={() => setCurNav("Giới thiệu")}
              >
                <MenuItem
                  key={"Giới thiệu"}
                  onClick={handleClose}
                  sx={{ fontSize: "2vh" }}
                >
                  <FiberSmartRecordIcon
                    sx={{ fontSize: "2vh", marginRight: "5px" }}
                  />
                  {"Giới thiệu"}
                </MenuItem>
              </Box>
              <Box
                sx={{ display: displayServices ? "block" : "none" }}
                onClick={() => setCurNav("Mục tiêu tài chính")}
              >
                <MenuItem
                  key={"Mục tiêu tài chính"}
                  onClick={handleClose}
                  sx={{ fontSize: "2vh" }}
                >
                  <FiberSmartRecordIcon
                    sx={{ fontSize: "2vh", marginRight: "5px" }}
                  />
                  {"Mục tiêu tài chính"}
                </MenuItem>
              </Box>
              <Box
                sx={{ display: displayServices ? "block" : "none" }}
                onClick={() => setCurNav("Kế hoạch tài chính")}
              >
                <MenuItem
                  key={"Kế hoạch tài chính"}
                  onClick={handleClose}
                  sx={{ fontSize: "2vh" }}
                >
                  <FiberSmartRecordIcon
                    sx={{ fontSize: "2vh", marginRight: "5px" }}
                  />
                  {"Kế hoạch tài chính"}
                </MenuItem>
              </Box>
              <Box
                sx={{ display: displayServices ? "block" : "none" }}
                onClick={() => setCurNav("Quản lý chi tiêu")}
              >
                <MenuItem
                  key={"Quản lý chi tiêu"}
                  onClick={handleClose}
                  sx={{ fontSize: "2vh" }}
                >
                  <FiberSmartRecordIcon
                    sx={{ fontSize: "2vh", marginRight: "5px" }}
                  />
                  {"Quản lý chi tiêu"}
                </MenuItem>
              </Box>
              <Box
                sx={{ display: displayServices ? "block" : "none" }}
                onClick={() => setCurNav("Quản lý tài chính")}
              >
                <MenuItem
                  key={"Quản lý tài chính"}
                  onClick={handleClose}
                  sx={{ fontSize: "2vh" }}
                >
                  <FiberSmartRecordIcon
                    sx={{ fontSize: "2vh", marginRight: "5px" }}
                  />
                  {"Quản lý tài chính"}
                </MenuItem>
              </Box>
              <Box onClick={() => setCurNav("Cộng đồng")}>
                <MenuItem
                  key={"Cộng đồng"}
                  onClick={handleClose}
                  sx={{ fontSize: theme.primary.mediumMobile }}
                >
                  {"Cộng đồng"}
                </MenuItem>
              </Box>
              <Box onClick={() => setCurNav("Về chúng tôi")}>
                <MenuItem
                  key={"Về chúng tôi"}
                  onClick={handleClose}
                  sx={{ fontSize: theme.primary.mediumMobile }}
                >
                  {"Về chúng tôi"}
                </MenuItem>
              </Box>
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
                    // onClick={() => handleClick()}
                    onClick={() => setCurNav("Đăng nhập")}
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
