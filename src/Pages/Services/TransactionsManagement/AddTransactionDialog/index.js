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
import {
  EXPENSESCATEGORIES,
  RECEIVECATEGORIES,
} from "../../../../constant/index";

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
  const [tranType, setTranType] = useState(0);
  const [tranMoneyType, setTranMoneyType] = useState(0);

  const handleClose = () => {
    handleCloseDialog();
    setTranName("");
    setTranMoney(0);
    setTranCate1(0);
    setTranCate2(0);
    setTranType(0);
  };

  const submit = () => {
    let finalTranCate2 =
      Object.keys(EXPENSESCATEGORIES)[tranCate1] === "Tiết kiệm" ||
      Object.keys(EXPENSESCATEGORIES)[tranCate1] === "Giáo dục" ||
      Object.keys(EXPENSESCATEGORIES)[tranCate1] === "Giải thưởng" ||
      Object.keys(EXPENSESCATEGORIES)[tranCate1] === "Tiền lãi" ||
      Object.keys(EXPENSESCATEGORIES)[tranCate1] === "Tiền lương" ||
      Object.keys(EXPENSESCATEGORIES)[tranCate1] === "Quà tặng" ||
      Object.keys(EXPENSESCATEGORIES)[tranCate1] === "Bán đồ" ||
      Object.keys(EXPENSESCATEGORIES)[tranCate1] === "Thu khác"
        ? ""
        : EXPENSESCATEGORIES[Object.keys(EXPENSESCATEGORIES)[tranCate1]][
            tranCate2
          ];

    if (tranType === 0) {
      handleAddTrans(
        tranName,
        Object.keys(EXPENSESCATEGORIES)[tranCate1],
        finalTranCate2,
        tranMoney,
        tranHour,
        tranMinute,
        tranSecond,
        tranType,
        tranMoneyType
      );
    } else {
      handleAddTrans(
        tranName,
        RECEIVECATEGORIES[tranCate1],
        "",
        tranMoney,
        tranHour,
        tranMinute,
        tranSecond,
        tranType,
        tranMoneyType
      );
    }

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
          width: "520px",
          height: "570px",
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
          Phân loại giao dịch
        </Typography>
        <FormControl sx={{ minWidth: 60, height: "40px" }}>
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            value={tranType}
            onChange={(e) => setTranType(e.target.value)}
            sx={{
              backgroundColor: "white",
              width: "100%",
              height: "40px",
              borderRadius: theme.primary.borderRadius,
            }}
            MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
          >
            <MenuItem value={0}>Giao dịch chi</MenuItem>
            <MenuItem value={1}>Giao dịch thu</MenuItem>
          </Select>
        </FormControl>
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

      {tranType === 0 ? (
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
              <MenuItem value={6}>Trả nợ</MenuItem>
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
                <MenuItem value={2}>Đầu tư</MenuItem>
                <MenuItem value={3}>Bất động sản</MenuItem>
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

          {tranCate1 === 6 ? (
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
                <MenuItem value={0}>Tiền mặt</MenuItem>
                <MenuItem value={1}>Trả góp</MenuItem>
                <MenuItem value={2}>Thế chấp</MenuItem>
                <MenuItem value={3}>Thấu chi</MenuItem>
              </Select>
            </FormControl>
          ) : (
            ""
          )}
        </Box>
      ) : (
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
            Phân loại nguồn thu
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
              <MenuItem value={0}>Giải thưởng</MenuItem>
              <MenuItem value={1}>Tiền lãi</MenuItem>
              <MenuItem value={2}>Tiền lương</MenuItem>
              <MenuItem value={3}>Quà tặng</MenuItem>
              <MenuItem value={4}>Bán đồ</MenuItem>
              <MenuItem value={5}>Vay nợ</MenuItem>
              <MenuItem value={6}>Nguồn thu khác</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
          Dạng tiền
        </Typography>
        <FormControl sx={{ minWidth: 60, height: "40px" }}>
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            value={tranMoneyType}
            onChange={(e) => setTranMoneyType(e.target.value)}
            sx={{
              backgroundColor: "white",
              width: "100%",
              height: "40px",
              borderRadius: theme.primary.borderRadius,
            }}
            MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
          >
            <MenuItem value={0}>Tiền mặt</MenuItem>
            <MenuItem value={1}>Tiền gửi ngân hàng</MenuItem>
          </Select>
        </FormControl>
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
    </Dialog>
  );
};

export default AddTransactionDialog;
