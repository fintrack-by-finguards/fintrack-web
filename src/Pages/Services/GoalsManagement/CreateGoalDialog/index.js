import * as React from "react";
import { useState } from "react";

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
import { inputMoneyToNum } from "../../../Functions/text";

const CreateGoalDialog = ({ openDialog, handleCloseDialog, createGoal }) => {
  const theme = useTheme();

  const [goalName, setGoalName] = useState("");
  const [goalMoney, setGoalMoney] = useState(0);
  const [goalImage, setGoalImage] = useState("");
  const [goalTime, setGoalTime] = useState(0);
  const [goalUnit, setGoalUnit] = useState(0);

  const handleClose = () => {
    handleCloseDialog();
    setGoalName("");
    setGoalMoney(0);
    setGoalImage("");
    setGoalTime(0);
    setGoalUnit(0);
  };

  const submit = () => {
    createGoal(
      goalName,
      inputMoneyToNum(goalMoney),
      Number(goalTime),
      Number(goalUnit),
      goalImage
    );
    setGoalName("");
    setGoalMoney(0);
    setGoalImage("");
    setGoalTime(0);
    setGoalUnit(0);
    handleCloseDialog();
  };

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
          [theme.breakpoints.down("md")]: {
            fontSize: "3vh",
          },
        }}
        textAlign="center"
      >
        Mục tiêu tài chính cá nhân
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
              fontSize: "2vh",
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
            [theme.breakpoints.down("md")]: {
              fontSize: "2vh",
            },
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
              fontSize: "2vh",
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
              fontSize: "2vh",
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
              fontSize: "2vh",
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
            value={goalTime}
            onChange={(e) => setGoalTime(e.target.value)}
            sx={{
              backgroundColor: "white",
              width: "30%",
              marginRight: "10px",
              borderRadius: theme.primary.borderRadius,
              [theme.breakpoints.down("md")]: {
                fontSize: "2vh",
              },
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
                [theme.breakpoints.down("md")]: {
                  fontSize: "2vh",
                },
              }}
              MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
            >
              <MenuItem
                value={0}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                  },
                }}
              >
                Năm
              </MenuItem>
              <MenuItem
                value={1}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                  },
                }}
              >
                Tháng
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          sx={{
            backgroundColor: theme.primary.sub,
            marginRight: "10px",
            display: "block",
            margin: "0 auto",
            marginTop: "50px",
            [theme.breakpoints.down("md")]: {
              marginTop: "20px",
            },
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
                fontSize: "2vh",
              },
              "&:hover": theme.primary.hoverDefault,
            }}
          >
            Thêm mục tiêu
          </Typography>
        </Button>
      </Box>
    </Dialog>
  );
};

export default CreateGoalDialog;
