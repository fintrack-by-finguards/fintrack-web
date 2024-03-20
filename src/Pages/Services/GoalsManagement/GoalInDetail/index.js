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
import { Box, Typography, Button, CardMedia } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SavingsIcon from "@mui/icons-material/Savings";
import WarningIcon from "@mui/icons-material/Warning";

const GoalInDetail = ({ openDialog, handleCloseDialog, goal }) => {
  const theme = useTheme();

  const handleClose = () => {
    handleCloseDialog();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={openDialog}
      PaperProps={{
        sx: {
          width: "520px",
          height: "500px",
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
        Thông tin cơ bản của mục tiêu
      </DialogTitle>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: theme.primary.borderRadius,
        }}
        boxShadow={3}
      >
        <CardMedia
          component="img"
          sx={{
            width: "200px",
            height: "200px",
            borderTopLeftRadius: theme.primary.borderRadius,
            borderBottomLeftRadius: theme.primary.borderRadius,
          }}
          image={goal.img}
          alt="Paella dish"
        />

        <Box sx={{ padding: "20px", marginTop: "10px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: theme.primary.main,
                fontSize: "17px",
                fontWeight: 700,
                fontFamily: theme.primary.fontFamily,
              }}
              textAlign="left"
            >
              {goal.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "50px",
              }}
            ></Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              marginLeft: "10px",
              alignItems: "center",
              marginTop: "5px",
            }}
          >
            <FiberManualRecordIcon
              sx={{
                color: theme.primary.main,
                fontSize: "12px",
              }}
            />

            <Typography
              sx={{
                color: theme.primary.main,
                fontSize: theme.primary.small,
                fontWeight: 600,
                fontFamily: theme.primary.fontFamily,
                marginLeft: "5px",
              }}
            >
              Số tiền:
            </Typography>

            <Typography
              sx={{
                color: theme.primary.main,
                fontSize: theme.primary.small,
                fontWeight: 500,
                fontFamily: theme.primary.fontFamily,
                marginLeft: "5px",
              }}
            >
              {numToMoney(goal.money)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              marginLeft: "10px",
              alignItems: "center",
              marginTop: "5px",
            }}
          >
            <FiberManualRecordIcon
              sx={{
                color: theme.primary.main,
                fontSize: "12px",
              }}
            />

            <Typography
              sx={{
                color: theme.primary.main,
                fontSize: theme.primary.small,
                fontWeight: 600,
                fontFamily: theme.primary.fontFamily,
                marginLeft: "5px",
              }}
            >
              Thời gian:
            </Typography>

            <Typography
              sx={{
                color: theme.primary.main,
                fontSize: theme.primary.small,
                fontWeight: 500,
                fontFamily: theme.primary.fontFamily,
                marginLeft: "5px",
              }}
            >
              {goal.time + " " + (goal.unit === 0 ? "năm" : "tháng")}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              marginLeft: "10px",
              alignItems: "center",
              marginTop: "5px",
            }}
          >
            <FiberManualRecordIcon
              sx={{
                color: theme.primary.main,
                fontSize: "12px",
              }}
            />

            <Typography
              sx={{
                color: theme.primary.main,
                fontSize: theme.primary.small,
                fontWeight: 600,
                fontFamily: theme.primary.fontFamily,
                marginLeft: "5px",
              }}
            >
              Bắt đầu:
            </Typography>

            <Typography
              sx={{
                color: theme.primary.main,
                fontSize: theme.primary.small,
                fontWeight: 500,
                fontFamily: theme.primary.fontFamily,
                marginLeft: "5px",
              }}
            >
              {toDay(goal.day, goal.month, goal.year)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              marginLeft: "10px",
              alignItems: "center",
              marginTop: "5px",
            }}
          >
            <FiberManualRecordIcon
              sx={{
                color: theme.primary.main,
                fontSize: "12px",
              }}
            />

            <Typography
              sx={{
                color: theme.primary.main,
                fontSize: theme.primary.small,
                fontWeight: 600,
                fontFamily: theme.primary.fontFamily,
                marginLeft: "5px",
              }}
            >
              Kết thúc:
            </Typography>

            <Typography
              sx={{
                color: theme.primary.main,
                fontSize: theme.primary.small,
                fontWeight: 500,
                fontFamily: theme.primary.fontFamily,
                marginLeft: "5px",
              }}
            >
              {getEndDay(goal.day, goal.month, goal.year, goal.unit, goal.time)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              marginLeft: "10px",
              alignItems: "center",
              marginTop: "5px",
            }}
          >
            <FiberManualRecordIcon
              sx={{
                color: theme.primary.main,
                fontSize: "12px",
              }}
            />

            <Typography
              sx={{
                color: theme.primary.main,
                fontSize: theme.primary.small,
                fontWeight: 600,
                fontFamily: theme.primary.fontFamily,
                marginLeft: "5px",
              }}
            >
              Tiến độ:
            </Typography>

            <Typography
              sx={{
                color: theme.primary.sub,
                fontSize: theme.primary.small,
                fontWeight: 600,
                fontFamily: theme.primary.fontFamily,
                marginLeft: "5px",
              }}
            >
              {numToMoney(goal.progress)}
            </Typography>
          </Box>

          <Box
            sx={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <LinearProgress
              variant="determinate"
              value={(goal.progress / goal.money) * 100}
              sx={{
                height: "5px",
                borderRadius: theme.primary.borderRadius,
                color: theme.primary.sub,
                width: "200px",
              }}
            />

            <Typography
              sx={{
                color: theme.primary.main,
                fontSize: theme.primary.small,
                fontWeight: 600,
                fontFamily: theme.primary.fontFamily,
                marginLeft: "5px",
              }}
            >
              {(goal.progress / goal.money) * 100 + "%"}
            </Typography>
          </Box>
        </Box>
      </Box>

      <DialogTitle
        sx={{
          color: theme.primary.main,
          fontSize: theme.primary.medium,
          fontWeight: 700,
          fontFamily: theme.primary.fontFamily,
        }}
        textAlign="center"
      >
        Các giao dịch liên quan
      </DialogTitle>
      {goal.history.map((tranx, idx) => (
        <Box
          sx={{
            width: "90%",
            height: "300px",
            borderRadius: theme.primary.borderRadius,
            margin: "0 auto",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            padding: "10px",
          }}
          boxShadow={3}
        >
          <Box
            sx={{
              backgroundColor: "#192841",
              width: "30px",
              height: "30px",
              borderRadius: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "2.5vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
                color: "white",
              }}
            >
              {idx + 1}
            </Typography>
          </Box>

          <SavingsIcon
            sx={{
              color: theme.primary.sub,
              fontSize: "8vh",
              marginLeft: "20px",
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              marginLeft: "20px",
              width: "250px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "start" }}>
              <Typography
                sx={{
                  color: "#FFB000",
                  fontSize: "1.7vh",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  width: "80px",
                }}
                textAlign="left"
              >
                Tên:
              </Typography>
              <Typography
                sx={{
                  color: "#192841",
                  fontSize: "1.7vh",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                }}
              >
                {tranx.name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "start" }}>
              <Typography
                sx={{
                  color: "#FFB000",
                  fontSize: "1.7vh",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  width: "80px",
                }}
                textAlign="left"
              >
                Dạng:
              </Typography>
              <Typography
                sx={{
                  color: "#192841",
                  fontSize: "1.7vh",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                }}
              >
                {tranx.moneytype === 0 ? "Tiền mặt" : "Tiền gửi ngân hàng"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "start" }}>
              <Typography
                sx={{
                  color: "#FFB000",
                  fontSize: "1.7vh",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  width: "80px",
                }}
                textAlign="left"
              >
                Thời gian:
              </Typography>
              <Typography
                sx={{
                  color: "#192841",
                  fontSize: "1.7vh",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                }}
              >
                {(tranx.hour < 10 ? "0" + tranx.hour : tranx.hour) +
                  ":" +
                  (tranx.minute < 10 ? "0" + tranx.minute : tranx.minute) +
                  ":" +
                  (tranx.second < 10 ? "0" + tranx.second : tranx.second) +
                  " " +
                  (tranx.day < 10 ? "0" + tranx.day : tranx.day) +
                  "/" +
                  (tranx.month < 10 ? "0" + tranx.month : tranx.month) +
                  "/" +
                  (tranx.year < 10 ? "0" + tranx.year : tranx.year)}
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              color: theme.primary.sub,
              fontSize: "2.5vh",
              fontWeight: 600,
              fontFamily: "Montserrat",
              marginLeft: "5px",
              width: "160px",
            }}
            textAlign="left"
          >
            {numToMoney(tranx.money)}
          </Typography>
        </Box>
      ))}

      {goal.history.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <WarningIcon
            sx={{ color: "#192841", fontSize: "50px", marginTop: "30px" }}
          />
          <Typography
            sx={{
              color: "#192841",
              fontSize: "2vh",
              fontWeight: 600,
              fontFamily: "Montserrat",
            }}
          >
            Không có dữ liệu về giao dịch
          </Typography>
        </Box>
      ) : (
        ""
      )}
    </Dialog>
  );
};

export default GoalInDetail;
