import React, { useState } from "react";
import { Menu, Button, MenuItem, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const MyMenu = ({ curNav, item, setCurNav }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleCloseAndOpenNewTab = (newTab) => {
    setCurNav(newTab);
    setOpen(false);
  };

  return (
    <div>
      <Button
        sx={{
          marginLeft: "30px",
          display: "flex",
          alignItems: "center",
          borderBottom: curNav === item ? `2px solid ${theme.primary.sub}` : "",
          fontFamily: theme.primary.fontFamily,
          fontWeight: "600",
          fontSize: theme.primary.semi,
          "&:hover": {
            cursor: "pointer",
            color: theme.primary.sub,
            borderBottom:
              curNav === item ? " " : `2px solid ${theme.primary.sub}`,
          },
          color: curNav === item ? theme.primary.sub : theme.primary.main,
        }}
        id="menubutton1"
        aria-owns={open ? "simple-menu" : null}
        aria-haspopup="true"
        onClick={handleOpen}
        style={{ zIndex: 1301 }}
      >
        Sản phẩm
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ marginTop: "15px" }}
      >
        <MenuItem>
          <Button
            onClick={() => handleCloseAndOpenNewTab("Giới thiệu sản phẩm")}
            sx={{ width: "100%" }}
          >
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "600",
                fontSize: theme.primary.small,
                width: "100%",
                color: "black",
              }}
              textAlign="left"
            >
              Giới thiệu
            </Typography>
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            onClick={() => handleCloseAndOpenNewTab("Mục tiêu tài chính")}
            sx={{ width: "100%" }}
          >
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "600",
                fontSize: theme.primary.small,
                width: "100%",
                color: "black",
              }}
              textAlign="left"
            >
              Mục tiêu tài chính
            </Typography>
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            onClick={() => handleCloseAndOpenNewTab("Kế hoạch tài chính")}
            sx={{ width: "100%" }}
          >
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "600",
                fontSize: theme.primary.small,
                width: "100%",
                color: "black",
              }}
              textAlign="left"
            >
              Kế hoạch tài chính
            </Typography>
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            onClick={() => handleCloseAndOpenNewTab("Quản lý chi tiêu")}
            sx={{ width: "100%" }}
          >
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "600",
                fontSize: theme.primary.small,
                width: "100%",
                color: "black",
              }}
              textAlign="left"
            >
              Quản lý chi tiêu
            </Typography>
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            onClick={() => handleCloseAndOpenNewTab("Quản lý tài chính")}
            sx={{ width: "100%" }}
          >
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "600",
                fontSize: theme.primary.small,
                width: "100%",
                color: "black",
              }}
              textAlign="left"
            >
              Quản lý tài chính
            </Typography>
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MyMenu;
