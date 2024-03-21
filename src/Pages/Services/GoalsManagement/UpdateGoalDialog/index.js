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
import NumberInput from "../../../../Components/NumberInput";
import { inputMoneyToNum, numToMoney } from "../../../Functions/text";

const UpdateGoalDialog = ({
  openDialog,
  handleCloseDialog,
  handleUpdateGoal,
  data,
}) => {
  const theme = useTheme();

  const [goalName, setGoalName] = useState(data.name);
  const [goalMoney, setGoalMoney] = useState(
    numToMoney(data.money).substring(0, numToMoney(data.money).length - 1)
  );
  const [goalImage, setGoalImage] = useState(data.img);
  const [goalTime, setGoalTime] = useState(Number(data.time));
  const [goalUnit, setGoalUnit] = useState(Number(data.unit));
  const [goalDay, setGoalDay] = useState(Number(data.day));
  const [goalMonth, setGoalMonth] = useState(Number(data.month));
  const [goalYear, setGoalYear] = useState(Number(data.year));

  const handleClose = () => {
    handleCloseDialog();
    setGoalName(data.name);
    setGoalMoney(Number(data.money));
    setGoalImage(data.img);
    setGoalTime(Number(data.time));
    setGoalUnit(Number(data.unit));
  };

  const submit = () => {
    handleUpdateGoal(
      data._id,
      goalDay,
      goalMonth,
      goalYear,
      goalName,
      inputMoneyToNum(goalMoney),
      Number(goalTime),
      Number(goalUnit),
      goalImage
    );
    handleCloseDialog();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={openDialog}
      PaperProps={{
        sx: {
          width: "500px",
          height: "470px",
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
        Sửa tiêu tài chính cá nhân
      </DialogTitle>
      <Typography
        sx={{
          fontSize: "1.5vh",
          color: "grey",
          fontFamily: theme.primary.fontFamily,
          fontWeight: 500,
          marginBottom: "5px",
          fontStyle: "italic",
          [theme.breakpoints.down("md")]: {
            fontSize: theme.primary.smallMobile,
          },
          "&:hover": theme.primary.hoverDefault,
        }}
        textAlign="center"
      >
        Vui lòng kiểm tra các thông tin ở dưới!
      </Typography>
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
          Tên mục tiêu
        </Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
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
        <NumberInput value={goalMoney} onChange={setGoalMoney} />
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
          {"Link ảnh (nếu có)"}
        </Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={goalImage}
          onChange={(e) => setGoalImage(e.target.value)}
          multiline
          maxRows={3}
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
          Thời gian tiết kiệm
        </Typography>
        <Box>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={goalTime}
            onChange={(e) => setGoalTime(e.target.value)}
            sx={{
              backgroundColor: "white",
              width: "30%",
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
          <FormControl sx={{ minWidth: 60, height: "40px" }}>
            <Select
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={goalUnit}
              onChange={(e) => setGoalUnit(e.target.value)}
              sx={{
                backgroundColor: "white",
                width: "100%",
                height: "40px",
                borderRadius: theme.primary.borderRadius,
              }}
              MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
            >
              <MenuItem value={0}>Năm</MenuItem>
              <MenuItem value={1}>Tháng</MenuItem>
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
            Thời gian
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={goalDay}
              onChange={(e) => setGoalDay(e.target.value)}
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

            <Typography
              sx={{
                fontSize: theme.primary.small,
                color: theme.primary.main,
                marginRight: "10px",
                fontFamily: theme.primary.fontFamily,
                fontWeight: 500,
                [theme.breakpoints.down("md")]: {
                  fontSize: theme.primary.smallMobile,
                },
                "&:hover": theme.primary.hoverDefault,
              }}
              textAlign="left"
            >
              /
            </Typography>

            <TextField
              id="outlined-basic"
              variant="outlined"
              value={goalMonth}
              onChange={(e) => setGoalMonth(e.target.value)}
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

            <Typography
              sx={{
                fontSize: theme.primary.small,
                color: theme.primary.main,
                marginRight: "10px",
                fontFamily: theme.primary.fontFamily,
                fontWeight: 500,
                [theme.breakpoints.down("md")]: {
                  fontSize: theme.primary.smallMobile,
                },
                "&:hover": theme.primary.hoverDefault,
              }}
              textAlign="left"
            >
              /
            </Typography>

            <TextField
              id="outlined-basic"
              variant="outlined"
              value={goalYear}
              onChange={(e) => setGoalYear(e.target.value)}
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
            marginTop: "50px",
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
            Cập nhật mục tiêu
          </Typography>
        </Button>
      </Box>
    </Dialog>
  );
};

export default UpdateGoalDialog;
