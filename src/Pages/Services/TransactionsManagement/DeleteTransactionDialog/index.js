import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import { numToMoney, toDateString } from "../../../Functions/text";
import { Box, Typography, Button } from "@mui/material";

const DeleteTransactionDialog = ({
  openDialog,
  handleCloseDialog,
  handleDeleteTrans,
  time,
  data,
}) => {
  const theme = useTheme();

  const handleClose = () => {
    handleCloseDialog();
  };

  const submit = () => {
    handleDeleteTrans(data);
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
        Bạn có chắc chắn muốn xoá giao dịch này không?
      </DialogTitle>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          margin: "0 auto",
        }}
      >
        <Box sx={{ display: "flex", marginTop: "20px" }}>
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

        <Box sx={{ display: "flex", marginTop: "10px" }}>
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
            Phân loại:
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
            {data.category1}
            {data.category2 !== "" ? " - " + data.category2 : ""}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", marginTop: "10px" }}>
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
            Tiền:
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

        <Box sx={{ display: "flex", marginTop: "10px" }}>
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
            {toDateString(data.hour) +
              ":" +
              toDateString(data.minute) +
              ":" +
              toDateString(data.second) +
              " "}
            -
            {" " +
              toDateString(time.day) +
              "/" +
              toDateString(time.month) +
              "/" +
              toDateString(time.year)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", marginTop: "10px" }}>
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
            Dạng:
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
            {data.moneytype === 0 ? "Tiền mặt" : "Tiền gửi ngân hàng"}
          </Typography>
        </Box>
      </Box>

      <Button
        sx={{
          backgroundColor: theme.primary.sub,
          marginRight: "10px",
          display: "block",
          margin: "0 auto",
          marginTop: "20px",
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

export default DeleteTransactionDialog;
