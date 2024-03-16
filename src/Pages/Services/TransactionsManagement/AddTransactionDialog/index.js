import * as React from "react";
import { useState, useEffect } from "react";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

import { getCurrentTime } from "../../../Functions/text";
import { EXPENSESCATEGORIES } from "../../../../constant/index";

const AddTransactionDialog = ({
  openDialog,
  handleCloseDialog,
  handleAddTrans,
}) => {
  const theme = useTheme();

  const [tranName, setTranName] = useState("");
  const [tranMoney, setTranMoney] = useState(0);
  const [tranCate1, setTranCate1] = useState(0);
  const [tranCate2, setTranCate2] = useState(0);
  const [tranHour, setTranHour] = useState(0);
  const [tranMinute, setTranMinute] = useState(0);
  const [tranSecond, setTranSecond] = useState(0);

  const handleClose = () => {
    handleCloseDialog();
    setTranName("");
    setTranMoney(0);
    setTranCate1(0);
    setTranCate2(0);
  };

  const submit = () => {
    handleAddTrans(
      tranName,
      Object.keys(EXPENSESCATEGORIES)[tranCate1],
      EXPENSESCATEGORIES[Object.keys(EXPENSESCATEGORIES)[tranCate1]][tranCate2],
      tranMoney,
      tranHour,
      tranMinute,
      tranSecond
    );
    handleClose();
  };

  useEffect(() => {
    let timeObject = getCurrentTime();
    setTranHour(timeObject.hour);
    setTranMinute(timeObject.minute);
    setTranSecond(timeObject.second);
  }, [openDialog]);

  return (
    <Dialog
      onClose={handleClose}
      open={openDialog}
      PaperProps={{
        sx: {
          width: "500px",
          height: "450px",
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
        Thêm giao dịch trong ngày
      </DialogTitle>
      <Box sx={{ marginTop: "10px" }}>
        <Typography
          sx={{
            fontSize: theme.primary.small,
            color: theme.primary.main,
            fontFamily: theme.primary.fontFamily,
            fontWeight: 500,
            marginBottom: "5px",
            [theme.breakpoints.down("md")]: {
              fontSize: theme.primary.smallMobile,
            },
            "&:hover": theme.primary.hoverDefault,
          }}
          textAlign="left"
        >
          Tên khoản giao dịch
        </Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={tranName}
          onChange={(e) => setTranName(e.target.value)}
          sx={{
            backgroundColor: "white",
            width: "100%",
            marginRight: "10px",
            borderRadius: theme.primary.borderRadius,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: theme.primary.borderRadius,
                fontFamily: theme.primary.fontFamily,
              },
              "&.Mui-focused fieldset": {
                border: `3px solid ${theme.primary.sub}`,
                color: theme.primary.sub,
              },
            },
          }}
          InputLabelProps={{ shrink: false, style: { fontSize: 0 } }}
          inputProps={{
            style: {
              height: "7px",
            },
          }}
        />
      </Box>

      <Box sx={{ marginTop: "10px" }}>
        <Typography
          sx={{
            fontSize: theme.primary.small,
            color: theme.primary.main,
            fontFamily: theme.primary.fontFamily,
            fontWeight: 500,
            marginBottom: "5px",
            [theme.breakpoints.down("md")]: {
              fontSize: theme.primary.smallMobile,
            },
            "&:hover": theme.primary.hoverDefault,
          }}
          textAlign="left"
        >
          Số tiền
        </Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={tranMoney}
          onChange={(e) => setTranMoney(e.target.value)}
          sx={{
            backgroundColor: "white",
            width: "100%",
            marginRight: "10px",
            borderRadius: theme.primary.borderRadius,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: theme.primary.borderRadius,
                fontFamily: theme.primary.fontFamily,
              },
              "&.Mui-focused fieldset": {
                border: `3px solid ${theme.primary.sub}`,
                color: theme.primary.sub,
              },
            },
          }}
          InputLabelProps={{ shrink: false, style: { fontSize: 0 } }}
          inputProps={{
            style: {
              height: "7px",
            },
          }}
        />
      </Box>

      <Box sx={{ marginTop: "10px" }}>
        <Typography
          sx={{
            fontSize: theme.primary.small,
            color: theme.primary.main,
            fontFamily: theme.primary.fontFamily,
            fontWeight: 500,
            marginBottom: "5px",
            [theme.breakpoints.down("md")]: {
              fontSize: theme.primary.smallMobile,
            },
            "&:hover": theme.primary.hoverDefault,
          }}
          textAlign="left"
        >
          Phân loại chi tiêu
        </Typography>
        <FormControl sx={{ minWidth: 60, height: "40px" }}>
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            value={tranCate1}
            onChange={(e) => setTranCate1(e.target.value)}
            sx={{
              backgroundColor: "white",
              width: "100%",
              height: "40px",
              borderRadius: theme.primary.borderRadius,
            }}
            MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
          >
            <MenuItem value={0}>Chi tiêu cần thiết</MenuItem>
            <MenuItem value={1}>Tiết kiệm</MenuItem>
            <MenuItem value={2}>Giáo dục</MenuItem>
            <MenuItem value={3}>Hưởng thụ</MenuItem>
            <MenuItem value={4}>Tự do tài chính</MenuItem>
            <MenuItem value={5}>Quà và từ thiện</MenuItem>
          </Select>
        </FormControl>

        {tranCate1 === 0 ? (
          <FormControl sx={{ minWidth: 60, height: "40px" }}>
            <Select
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={tranCate2}
              onChange={(e) => setTranCate2(e.target.value)}
              sx={{
                backgroundColor: "white",
                width: "100%",
                height: "40px",
                borderRadius: theme.primary.borderRadius,
                marginLeft: "15px",
              }}
              MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
            >
              <MenuItem value={0}>Ăn uống</MenuItem>
              <MenuItem value={1}>Hoá đơn</MenuItem>
              <MenuItem value={2}>Đi lại</MenuItem>
              <MenuItem value={3}>Tiền nhà</MenuItem>
              <MenuItem value={4}>Sức khoẻ</MenuItem>
              <MenuItem value={5}>Gia đình</MenuItem>
            </Select>
          </FormControl>
        ) : (
          ""
        )}

        {tranCate1 === 3 ? (
          <FormControl sx={{ minWidth: 60, height: "40px" }}>
            <Select
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={tranCate2}
              onChange={(e) => setTranCate2(e.target.value)}
              sx={{
                backgroundColor: "white",
                width: "100%",
                height: "40px",
                borderRadius: theme.primary.borderRadius,
                marginLeft: "15px",
              }}
              MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
            >
              <MenuItem value={0}>Mua sắm</MenuItem>
              <MenuItem value={1}>Xem phim</MenuItem>
              <MenuItem value={2}>Trò chơi</MenuItem>
              <MenuItem value={3}>Nhà hàng</MenuItem>
            </Select>
          </FormControl>
        ) : (
          ""
        )}

        {tranCate1 === 4 ? (
          <FormControl sx={{ minWidth: 60, height: "40px" }}>
            <Select
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={tranCate2}
              onChange={(e) => setTranCate2(e.target.value)}
              sx={{
                backgroundColor: "white",
                width: "100%",
                height: "40px",
                borderRadius: theme.primary.borderRadius,
                marginLeft: "15px",
              }}
              MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
            >
              <MenuItem value={0}>Bảo hiểm</MenuItem>
              <MenuItem value={1}>Tiết kiệm hưu trí</MenuItem>
            </Select>
          </FormControl>
        ) : (
          ""
        )}

        {tranCate1 === 5 ? (
          <FormControl sx={{ minWidth: 60, height: "40px" }}>
            <Select
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={tranCate2}
              onChange={(e) => setTranCate2(e.target.value)}
              sx={{
                backgroundColor: "white",
                width: "100%",
                height: "40px",
                borderRadius: theme.primary.borderRadius,
                marginLeft: "15px",
              }}
              MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
            >
              <MenuItem value={0}>Từ thiện</MenuItem>
              <MenuItem value={1}>Quà lễ</MenuItem>
            </Select>
          </FormControl>
        ) : (
          ""
        )}

        <Box sx={{ marginTop: "10px" }}>
          <Typography
            sx={{
              fontSize: theme.primary.small,
              color: theme.primary.main,
              fontFamily: theme.primary.fontFamily,
              fontWeight: 500,
              marginBottom: "5px",
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
              "&:hover": theme.primary.hoverDefault,
            }}
            textAlign="left"
          >
            Thời gian
          </Typography>
          <Box>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={tranHour}
              onChange={(e) => setTranHour(e.target.value)}
              sx={{
                backgroundColor: "white",
                width: "15%",
                marginRight: "10px",
                borderRadius: theme.primary.borderRadius,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: theme.primary.borderRadius,
                    fontFamily: theme.primary.fontFamily,
                  },
                  "&.Mui-focused fieldset": {
                    border: `3px solid ${theme.primary.sub}`,
                    color: theme.primary.sub,
                  },
                },
              }}
              InputLabelProps={{ shrink: false, style: { fontSize: 0 } }}
              inputProps={{
                style: {
                  height: "7px",
                },
              }}
            />

            <TextField
              id="outlined-basic"
              variant="outlined"
              value={tranMinute}
              onChange={(e) => setTranMinute(e.target.value)}
              sx={{
                backgroundColor: "white",
                width: "15%",
                marginRight: "10px",
                borderRadius: theme.primary.borderRadius,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: theme.primary.borderRadius,
                    fontFamily: theme.primary.fontFamily,
                  },
                  "&.Mui-focused fieldset": {
                    border: `3px solid ${theme.primary.sub}`,
                    color: theme.primary.sub,
                  },
                },
              }}
              InputLabelProps={{ shrink: false, style: { fontSize: 0 } }}
              inputProps={{
                style: {
                  height: "7px",
                },
              }}
            />

            <TextField
              id="outlined-basic"
              variant="outlined"
              value={tranSecond}
              onChange={(e) => setTranSecond(e.target.value)}
              sx={{
                backgroundColor: "white",
                width: "15%",
                marginRight: "10px",
                borderRadius: theme.primary.borderRadius,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: theme.primary.borderRadius,
                    fontFamily: theme.primary.fontFamily,
                  },
                  "&.Mui-focused fieldset": {
                    border: `3px solid ${theme.primary.sub}`,
                    color: theme.primary.sub,
                  },
                },
              }}
              InputLabelProps={{ shrink: false, style: { fontSize: 0 } }}
              inputProps={{
                style: {
                  height: "7px",
                },
              }}
            />
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
            Thêm giao dịch
          </Typography>
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddTransactionDialog;
