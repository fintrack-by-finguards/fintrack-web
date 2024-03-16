import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import Carousel from "./Carousel";
import TransactionsChart from "./TransactionsChart";
import { numToMoney } from "../../Functions/text";
import { useTheme } from "@mui/material/styles";
import { createArray } from "../../Functions/text";
import { toDateString } from "../../Functions/text";

const time = [
  { month: 1, year: 2023 },
  { month: 2, year: 2023 },
  { month: 3, year: 2023 },
  { month: 4, year: 2023 },
  { month: 5, year: 2023 },
  { month: 6, year: 2023 },
  { month: 7, year: 2023 },
  { month: 8, year: 2023 },
  { month: 9, year: 2023 },
  { month: 10, year: 2023 },
  { month: 11, year: 2023 },
  { month: 12, year: 2023 },
  { month: 1, year: 2024 },
  { month: 2, year: 2024 },
  { month: 3, year: 2024 },
];

const expensesHistories = [
  {
    day: 13,
    month: 3,
    year: 2024,
    user: "notta",
    history: [
      {
        name: "Ăn bún bò Huế",
        category1: "Chi tiêu cần thiết",
        category2: "Ăn uống",
        money: 40000,
        hour: 6,
        minute: 4,
        second: 20,
      },
      {
        name: "Đóng tiền nhà",
        category1: "Chi tiêu cần thiết",
        category2: "Tiền nhà",
        money: 3500000,
        hour: 10,
        minute: 35,
        second: 56,
      },
      {
        name: "Ăn nem nướng",
        category1: "Chi tiêu cần thiết",
        category2: "Ăn uống",
        money: 30000,
        hour: 18,
        minute: 5,
        second: 3,
      },
      {
        name: "Xem phim",
        category1: "Hưởng thụ",
        category2: "Xem phim",
        money: 100000,
        hour: 22,
        minute: 5,
        second: 3,
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
        name: "Đi ăn cưới",
        category1: "Quà và từ thiện",
        category2: "Quà lễ",
        money: 50000,
        hour: 7,
        minute: 43,
        second: 25,
      },
      {
        name: "Mua sách Thuế",
        category1: "Giáo dục",
        category2: "",
        money: 99000,
        hour: 11,
        minute: 34,
        second: 64,
      },
    ],
  },
  {
    day: 11,
    month: 3,
    year: 2024,
    user: "notta",
    history: [
      {
        name: "Tiết kiệm đi du lịch",
        category1: "Tiết kiệm",
        category2: "",
        money: 500000,
        hour: 8,
        minute: 43,
        second: 25,
      },
    ],
  },
  {
    day: 10,
    month: 3,
    year: 2024,
    user: "notta",
    history: [
      {
        name: "Đóng bảo hiểm",
        category1: "Tự do tài chính",
        category2: "Bảo hiểm",
        money: 3000000,
        hour: 16,
        minute: 45,
        second: 56,
      },
    ],
  },
];

const TransactionsManagement = () => {
  const theme = useTheme();

  const [choseMonth, setChoseMonth] = useState(3);
  const [choseYear, setChoseYear] = useState(2024);

  const [startDay, setStartDay] = useState("01");
  const [endDay, setEndDay] = useState("31");

  const [displayDay, setDisplayDay] = useState(13);
  const [displayHis, setDisplayHis] = useState({
    day: 0,
    month: 0,
    year: 0,
    user: "notta",
    history: [],
  });

  const handleAddTrans = (
    _name,
    _cate1,
    _cate2,
    _money,
    _hour,
    _minute,
    _second
  ) => {
    for (let i = 0; i < expensesHistories.length; ++i) {
      if (
        expensesHistories[i].year === choseYear &&
        expensesHistories[i].month === choseMonth &&
        expensesHistories[i].day === displayDay
      ) {
        expensesHistories[i].history.push({
          name: _name,
          category1: _cate1,
          category2: _cate2,
          money: _money,
          hour: _hour,
          minute: _minute,
          second: _second,
        });
        break;
      }
    }
  };

  const handleChangeTime = (data) => {
    setChoseMonth(data.month);
    setChoseYear(data.year);
  };

  useEffect(() => {
    for (let i = 0; i < expensesHistories.length; ++i) {
      if (
        displayDay === expensesHistories[i].day &&
        choseMonth === expensesHistories[i].month &&
        choseYear === expensesHistories[i].year
      ) {
        setDisplayHis(expensesHistories[i]);
        break;
      }
    }
  }, [displayDay, choseMonth, choseYear]);

  return (
    <Container
      sx={{
        marginBottom: "100px",
        minHeight: "50vh",
        marginTop: "50px",
        [theme.breakpoints.down("md")]: {
          marginBottom: "150px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <Typography
            sx={{
              color: theme.primary.main,
              fontSize: theme.primary.medium,
              fontWeight: 700,
              fontFamily: theme.primary.fontFamily,
            }}
          >
            Cùng
          </Typography>
          <Typography
            sx={{
              color: theme.primary.sub,
              fontSize: theme.primary.medium,
              marginLeft: "5px",
              fontWeight: 700,
              fontFamily: theme.primary.fontFamily,
            }}
          >
            FinTrack
          </Typography>
          <Typography
            sx={{
              color: theme.primary.main,
              fontSize: theme.primary.medium,
              marginLeft: "5px",
              fontWeight: 700,
              fontFamily: theme.primary.fontFamily,
            }}
          >
            quản lý chi tiêu của
          </Typography>
          <Typography
            sx={{
              color: theme.primary.sub,
              fontSize: theme.primary.medium,
              marginLeft: "5px",
              fontWeight: 700,
              fontFamily: theme.primary.fontFamily,
            }}
          >
            bạn!
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: theme.primary.borderRadius,
          display: "flex",
          overflow: "hidden",
          overflowX: "scroll",
          height: "40px",
          width: "80%",
          margin: "0 auto",
          marginTop: "10px",
          padding: "5px",
          border: `6px solid ${theme.primary.sub}`,
        }}
      >
        {time.map((data, id) => (
          <MenuItem
            value={1}
            onClick={() => handleChangeTime(data)}
            key={id}
            sx={{
              backgroundColor:
                choseMonth === data.month && choseYear === data.year
                  ? theme.primary.main
                  : "white",
            }}
          >
            <Typography
              sx={{
                color:
                  choseMonth === data.month && choseYear === data.year
                    ? "white"
                    : theme.primary.main,
                fontSize: theme.primary.small,
                fontWeight: 600,
                fontFamily: theme.primary.fontFamily,
              }}
            >
              {(data.month < 10 ? "0" + data.month : data.month) +
                "/" +
                data.year}
            </Typography>
          </MenuItem>
        ))}
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: theme.primary.borderRadius,
          display: "flex",
          overflow: "hidden",
          overflowX: "scroll",
          height: "40px",
          width: "60%",
          margin: "0 auto",
          marginTop: "10px",
          padding: "5px",
        }}
      >
        {createArray(31).map((data, id) => (
          <MenuItem
            value={1}
            onClick={() => setDisplayDay(data + 1)}
            key={id}
            sx={{
              backgroundColor:
                data + 1 === displayDay ? theme.primary.main : "white",
              height: "40px",
              width: "40px",
              borderRadius: "50px",
              marginLeft: "5px",
              marginRight: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: data + 1 === displayDay ? "white" : theme.primary.main,
                fontSize: theme.primary.small,
                fontWeight: 600,
                fontFamily: theme.primary.fontFamily,
              }}
            >
              {data + 1}
            </Typography>
          </MenuItem>
        ))}
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Carousel item={displayHis} handleAddTrans={handleAddTrans} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <Box
            sx={{
              width: "250px",
              height: "100px",
              borderRadius: "8px",
              marginTop: "10px",
              padding: "20px",
            }}
            boxShadow={4}
          >
            <Typography
              sx={{
                color: "#E32636",
                fontSize: "4vh",
                fontWeight: 800,
                fontFamily: "Montserrat",
              }}
            >
              TỔNG CHI
            </Typography>
            <Typography
              sx={{
                color: "#FFB000",
                fontSize: "5vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
              }}
            >
              {numToMoney(3670000)}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "250px",
              height: "100px",
              borderRadius: "8px",
              marginTop: "10px",
              padding: "20px",
            }}
            boxShadow={4}
          >
            <Typography
              sx={{
                color: "#32de84",
                fontSize: "4vh",
                fontWeight: 800,
                fontFamily: "Montserrat",
              }}
            >
              TỔNG THU
            </Typography>
            <Typography
              sx={{
                color: "#FFB000",
                fontSize: "5vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
              }}
            >
              {numToMoney(0)}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "30px",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Typography
            sx={{
              color: theme.primary.main,
              fontSize: theme.primary.medium,
              fontWeight: 700,
              fontFamily: theme.primary.fontFamily,
            }}
          >
            Tổng quan chi tiêu của
          </Typography>
          <Typography
            sx={{
              color: theme.primary.sub,
              fontSize: theme.primary.medium,
              marginLeft: "5px",
              fontWeight: 700,
              fontFamily: theme.primary.fontFamily,
            }}
          >
            bạn!
          </Typography>
        </Box>

        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
        >
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "600",
              fontSize: theme.primary.small,
              marginRight: "10px",
              "&:hover": theme.primary.hoverDefault,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.medium,
              },
            }}
          >
            Thời gian:
          </Typography>
          <FormControl sx={{ minWidth: 60, height: "40px" }}>
            <Select
              value={startDay}
              onChange={(e) => setStartDay(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                backgroundColor: "white",
                width: "100%",
                height: "40px",
                borderRadius: theme.primary.borderRadius,
              }}
              MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
            >
              {createArray(31).map((value, id) => (
                <MenuItem value={toDateString(value + 1)} key={id}>
                  {toDateString(value + 1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            đến
          </Typography>
          <FormControl sx={{ minWidth: 60, height: "40px" }}>
            <Select
              displayEmpty
              value={endDay}
              onChange={(e) => setEndDay(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                backgroundColor: "white",
                width: "100%",
                height: "40px",
                borderRadius: theme.primary.borderRadius,
              }}
              MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
            >
              {createArray(31).map((value, id) => (
                <MenuItem value={toDateString(value + 1)} key={id}>
                  {toDateString(value + 1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <TransactionsChart />
      </Box>
    </Container>
  );
};

export default TransactionsManagement;
