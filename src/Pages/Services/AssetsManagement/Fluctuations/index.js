import React, { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { numToMoney, sortBy } from "../../../Functions/text";
import PaidIcon from "@mui/icons-material/Paid";
import ErrorIcon from "@mui/icons-material/Error";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { GlobalContext } from "../../../../context/GlobalState";
import { postApi } from "../../../../others/database";
import { SERVER } from "../../../../constant";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import ReportIcon from "@mui/icons-material/Report";

const Fluctuations = ({ month, year }) => {
  const [fluctuationsHistory, setFluctuationHistory] = useState([
    {
      day: 13,
      month: 3,
      year: 2024,
      user: "notta",
      assets: [0, 0, 0, 0, 0],
      debt: [0, 0, 0, 0],
      history: [],
    },
  ]);

  const [resetPage, setResetPage] = useState(false);

  const { username } = useContext(GlobalContext);

  useEffect(() => {
    postApi(
      { username: username, month: month, year: year },
      `${SERVER}/assets/getMonthYear`
    ).then((res) => {
      let sortedData = res.data.sort(sortBy("day"));
      let data = sortedData.filter((data) => data.history.length > 0);
      setFluctuationHistory(data);
      setResetPage(!resetPage);
    });
  }, [month, year, resetPage]);

  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "95%",
        maxHeight: "550px",
        paddingBottom: "50px",
        borderRadius: theme.primary.borderRadius,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "30px",
        [theme.breakpoints.down("md")]: {
          marginTop: "30px",
          display: "block",
          margin: "0 auto",
          width: "95%",
        },
      }}
      boxShadow={3}
    >
      <Typography
        sx={{
          color: theme.primary.main,
          fontSize: "2vh",
          fontWeight: 700,
          fontFamily: theme.primary.fontFamily,
          marginTop: "20px",
          [theme.breakpoints.down("md")]: {
            paddingTop: "20px",
          },
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
            <Box
              sx={{
                display: "flex",
                marginTop: "10px",
                alignItems: "center",
                boxShadow: 5,
                borderRadius: theme.primary.borderRadius,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {his.category1 === "Tài sản" ? (
                  <PaidIcon
                    sx={{ color: theme.primary.sub, fontSize: "40px" }}
                  />
                ) : (
                  <ErrorIcon
                    sx={{ color: theme.primary.red, fontSize: "40px" }}
                  />
                )}
                {his.type === 0 ? (
                  <AddBoxIcon
                    sx={{
                      color:
                        his.category1 === "Tài sản"
                          ? theme.primary.green
                          : theme.primary.red,
                      fontSize: "40px",
                    }}
                  />
                ) : (
                  <IndeterminateCheckBoxIcon
                    sx={{
                      color:
                        his.category1 === "Tài sản"
                          ? theme.primary.red
                          : theme.primary.green,
                      fontSize: "40px",
                    }}
                  />
                )}
              </Box>

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
                    fontSize: "1.7vh",
                    fontWeight: 700,
                    fontFamily: theme.primary.fontFamily,
                  }}
                >
                  {his.type === 0 ? "↑ Tăng " : "↓ Giảm "} {his.category1}{" "}
                  {his.category2 === "" ? "" : " - " + his.category2}
                </Typography>

                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      color: "#192841",
                      fontSize: "1.7vh",
                      fontWeight: 600,
                      fontFamily: "Montserrat",
                      width: "50px",
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
                      marginLeft: "10px",
                    }}
                  >
                    {his.name}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      color: "#192841",
                      fontSize: "1.7vh",
                      fontWeight: 600,
                      fontFamily: "Montserrat",
                      width: "50px",
                    }}
                    textAlign="left"
                  >
                    T/g:
                  </Typography>
                  <Typography
                    sx={{
                      color: "#192841",
                      fontSize: "1.7vh",
                      fontWeight: 600,
                      fontFamily: "Montserrat",
                      marginLeft: "10px",
                    }}
                  >
                    {(his.hour < 10 ? "0" + his.hour : his.hour) +
                      ":" +
                      (his.minute < 10 ? "0" + his.minute : his.minute) +
                      ":" +
                      (his.second < 10 ? "0" + his.second : his.second)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      color: "#192841",
                      fontSize: "1.7vh",
                      fontWeight: 600,
                      fontFamily: "Montserrat",
                      width: "50px",
                    }}
                    textAlign="left"
                  >
                    Số tiền:
                  </Typography>
                  <Typography
                    sx={{
                      color:
                        (his.category1 === "Tài sản" && his.type === 0) ||
                        (his.category1 === "Nợ" && his.type === 1)
                          ? theme.primary.green
                          : theme.primary.red,
                      fontSize: "1.7vh",
                      fontWeight: 600,
                      fontFamily: "Montserrat",
                      marginLeft: "10px",
                    }}
                  >
                    {numToMoney(his.money)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
          {fluctuationsHistory.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue?.history.length
          ) === 0 || fluctuationsHistory.length === 0 ? (
            <Box>
              <ReportIcon
                sx={{
                  fontSize: "70px",
                  color: theme.primary.main,
                }}
              />
              <Typography
                sx={{
                  fontSize: theme.primary.small,
                  color: theme.primary.main,
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: 700,
                  marginRight: "5px",
                  marginLeft: "5px",
                  "&:hover": theme.primary.hoverDefault,
                  [theme.breakpoints.down("md")]: {
                    fontSize: theme.primary.smallMobile,
                    marginBottom: "10px",
                    marginRight: "0px",
                  },
                }}
              >
                Chưa có dữ liệu để phân tích!
              </Typography>
            </Box>
          ) : (
            ""
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Fluctuations;
