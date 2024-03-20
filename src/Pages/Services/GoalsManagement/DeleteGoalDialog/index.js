import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import {
  numToMoney,
  toDateString,
  toDay,
  getEndDay,
} from "../../../Functions/text";
import { Box, Typography, Button } from "@mui/material";

const DeleteGoalDialog = ({
  openDialog,
  handleCloseDialog,
  handleDeleteGoal,
  data,
}) => {
  const theme = useTheme();

  const handleClose = () => {
    handleCloseDialog();
  };

  const submit = () => {
    handleDeleteGoal(data._id);
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={openDialog}
      PaperProps={{
        sx: {
          width: "520px",
          height: "320px",
          padding: "30px",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: theme.primary.main,
          fontSize: theme.primary.medium,
          fontWeight: 700,
          fontFamily: theme.primary.fontFamily,
        }}
        textAlign="center"
      >
        Bạn có muốn xoá mục tiêu này không?
      </DialogTitle>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", marginTop: "20px", width: "200px" }}>
          <Typography
            sx={{
              width: "100px",
              fontSize: theme.primary.small,
              color: theme.primary.main,
              fontFamily: theme.primary.fontFamily,
              fontWeight: 600,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
              "&:hover": theme.primary.hoverDefault,
            }}
            textAlign="left"
          >
            Tên:
          </Typography>
          <Typography
            sx={{
              fontSize: theme.primary.small,
              color: theme.primary.sub,
              fontFamily: theme.primary.fontFamily,
              fontWeight: 600,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
              "&:hover": theme.primary.hoverDefault,
            }}
            textAlign="left"
          >
            {data.name}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", marginTop: "10px", width: "200px" }}>
          <Typography
            sx={{
              width: "100px",
              fontSize: theme.primary.small,
              color: theme.primary.main,
              fontFamily: theme.primary.fontFamily,
              fontWeight: 600,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
              "&:hover": theme.primary.hoverDefault,
            }}
            textAlign="left"
          >
            Số tiền:
          </Typography>
          <Typography
            sx={{
              fontSize: theme.primary.small,
              color: theme.primary.sub,
              fontFamily: theme.primary.fontFamily,
              fontWeight: 600,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
              "&:hover": theme.primary.hoverDefault,
            }}
            textAlign="left"
          >
            {numToMoney(data.money)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", marginTop: "10px", width: "200px" }}>
          <Typography
            sx={{
              width: "100px",
              fontSize: theme.primary.small,
              color: theme.primary.main,
              fontFamily: theme.primary.fontFamily,
              fontWeight: 600,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
              "&:hover": theme.primary.hoverDefault,
            }}
            textAlign="left"
          >
            Thời gian:
          </Typography>
          <Typography
            sx={{
              fontSize: theme.primary.small,
              color: theme.primary.sub,
              fontFamily: theme.primary.fontFamily,
              fontWeight: 600,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
              "&:hover": theme.primary.hoverDefault,
            }}
            textAlign="left"
          >
            {data.time + " " + (data.unit === 0 ? "năm" : "tháng")}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", marginTop: "10px", width: "200px" }}>
          <Typography
            sx={{
              width: "100px",
              fontSize: theme.primary.small,
              color: theme.primary.main,
              fontFamily: theme.primary.fontFamily,
              fontWeight: 600,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
              "&:hover": theme.primary.hoverDefault,
            }}
            textAlign="left"
          >
            Bắt đầu:
          </Typography>
          <Typography
            sx={{
              fontSize: theme.primary.small,
              color: theme.primary.sub,
              fontFamily: theme.primary.fontFamily,
              fontWeight: 600,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
              "&:hover": theme.primary.hoverDefault,
            }}
            textAlign="left"
          >
            {toDay(data.day, data.month, data.year)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", marginTop: "10px", width: "200px" }}>
          <Typography
            sx={{
              width: "100px",
              fontSize: theme.primary.small,
              color: theme.primary.main,
              fontFamily: theme.primary.fontFamily,
              fontWeight: 600,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
              "&:hover": theme.primary.hoverDefault,
            }}
            textAlign="left"
          >
            Kết thúc:
          </Typography>
          <Typography
            sx={{
              fontSize: theme.primary.small,
              color: theme.primary.sub,
              fontFamily: theme.primary.fontFamily,
              fontWeight: 600,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
              "&:hover": theme.primary.hoverDefault,
            }}
            textAlign="left"
          >
            {getEndDay(data.day, data.month, data.year, data.unit, data.time)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", marginTop: "10px", width: "200px" }}>
          <Typography
            sx={{
              width: "100px",
              fontSize: theme.primary.small,
              color: theme.primary.main,
              fontFamily: theme.primary.fontFamily,
              fontWeight: 600,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
              "&:hover": theme.primary.hoverDefault,
            }}
            textAlign="left"
          >
            Tiến độ:
          </Typography>
          <Typography
            sx={{
              fontSize: theme.primary.small,
              color: theme.primary.sub,
              fontFamily: theme.primary.fontFamily,
              fontWeight: 600,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
              "&:hover": theme.primary.hoverDefault,
            }}
            textAlign="left"
          >
            {numToMoney(data.progress)}
          </Typography>
        </Box>
      </Box>

      <Button
        sx={{
          backgroundColor: theme.primary.sub,
          marginRight: "10px",
          display: "block",
          margin: "0 auto",
          marginTop: "30px",
        }}
        onClick={submit}
      >
        <Typography
          sx={{
            fontSize: theme.primary.small,
            color: theme.primary.main,
            fontFamily: theme.primary.fontFamily,
            fontWeight: 600,
            [theme.breakpoints.down("md")]: {
              fontSize: theme.primary.smallMobile,
            },
            "&:hover": theme.primary.hoverDefault,
          }}
        >
          Xoá giao dịch
        </Typography>
      </Button>
    </Dialog>
  );
};

export default DeleteGoalDialog;
