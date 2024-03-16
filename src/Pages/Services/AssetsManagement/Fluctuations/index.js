import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { numToMoney } from "../../../Functions/text";
import PaidIcon from "@mui/icons-material/Paid";
import ErrorIcon from "@mui/icons-material/Error";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

const fluctuationsHistory = [
  {
    day: 13,
    month: 3,
    year: 2024,
    user: "notta",
    history: [
      {
        name: "Nhận tiền lương",
        category1: "Tài sản",
        category2: "Tiền gửi ngân hàng",
        type: 0,
        money: 20000000,
        hour: 7,
        minute: 43,
        second: 25,
      },
      {
        name: "Trả nợ",
        category1: "Nợ",
        category2: "Tiền mặt",
        type: 1,
        money: 5000000,
        hour: 10,
        minute: 32,
        second: 54,
      },
      {
        name: "Trả nợ",
        category1: "Nợ",
        category2: "Tiền mặt",
        type: 1,
        money: 5000000,
        hour: 10,
        minute: 32,
        second: 54,
      },
    ],
  },
  {
    day: 12,
    month: 3,
    year: 2024,
    user: "notta",
    history: [
      {
        name: "Mua nhà",
        category1: "Tài sản",
        category2: "Bất động sản",
        type: 0,
        money: 10000000,
        hour: 7,
        minute: 43,
        second: 25,
      },
      {
        name: "Chi tiền mua nhà",
        category1: "Tài sản",
        category2: "Tiền mặt",
        type: 1,
        money: 10000000,
        hour: 7,
        minute: 43,
        second: 25,
      },
    ],
  },
];

const Fluctuations = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "95%",
        height: "600px",
        borderRadius: theme.primary.borderRadius,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "30px",
      }}
      boxShadow={3}
    >
      <Typography
        sx={{
          color: theme.primary.main,
          fontSize: "2vh",
          fontWeight: 600,
          fontFamily: theme.primary.fontFamily,
          marginTop: "20px",
        }}
        textAlign="center"
      >
        LỊCH SỬ BIẾN ĐỘNG
      </Typography>

      {fluctuationsHistory.map((data, idx) => (
        <Box sx={{ width: "80%" }}>
          <Box
            sx={{
              display: "flex",

              alignItems: "center",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: theme.primary.main,
                width: "100px",
                padding: "5px",
                alignItems: "center",
                borderRadius: theme.primary.borderRadius,
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: theme.primary.small,
                  fontWeight: 700,
                  fontFamily: theme.primary.fontFamily,
                }}
              >
                Ngày {data.day < 10 ? "0" + data.day : data.day}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: theme.primary.main,
                width: "100%",
                height: "5px",
                alignItems: "center",
                borderTopRightRadius: theme.primary.borderRadius,
                borderBottomRightRadius: theme.primary.borderRadius,
              }}
            ></Box>
          </Box>

          {data.history.map((his, idx) => (
            <Box sx={{ display: "flex", marginTop: "10px" }}>
              {his.category1 === "Tài sản" ? (
                <PaidIcon sx={{ color: theme.primary.sub, fontSize: "50px" }} />
              ) : (
                <ErrorIcon
                  sx={{ color: theme.primary.red, fontSize: "50px" }}
                />
              )}
              {his.type === 0 ? (
                <AddBoxIcon
                  sx={{
                    color:
                      his.category1 === "Tài sản"
                        ? theme.primary.green
                        : theme.primary.red,
                    fontSize: "50px",
                  }}
                />
              ) : (
                <IndeterminateCheckBoxIcon
                  sx={{
                    color:
                      his.category1 === "Tài sản"
                        ? theme.primary.red
                        : theme.primary.green,
                    fontSize: "50px",
                  }}
                />
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  marginLeft: "10px",
                }}
              >
                <Typography
                  sx={{
                    color: theme.primary.main,
                    fontSize: "1.5vh",
                    fontWeight: 700,
                    fontFamily: theme.primary.fontFamily,
                  }}
                >
                  {his.category1} {his.category2 === "" ? "" : "- "}
                  {his.category2}
                </Typography>
                <Typography
                  sx={{
                    color: "#192841",
                    fontSize: "1.5vh",
                    fontWeight: 600,
                    fontFamily: "Montserrat",
                  }}
                >
                  {(his.hour < 10 ? "0" + his.hour : his.hour) +
                    ":" +
                    (his.minute < 10 ? "0" + his.minute : his.minute) +
                    ":" +
                    (his.second < 10 ? "0" + his.second : his.second)}
                </Typography>
                <Typography
                  sx={{
                    color:
                      (his.category1 === "Tài sản" && his.type === 0) ||
                      (his.category1 === "Nợ" && his.type === 1)
                        ? theme.primary.green
                        : theme.primary.red,
                    fontSize: "1.5vh",
                    fontWeight: 600,
                    fontFamily: "Montserrat",
                  }}
                >
                  {numToMoney(his.money)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default Fluctuations;
