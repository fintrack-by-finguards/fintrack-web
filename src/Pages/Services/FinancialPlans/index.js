import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  FormControl,
  Grid,
  CardMedia,
  Select,
  MenuItem,
  Rating,
  Button,
} from "@mui/material";
import SavingsIcon from "@mui/icons-material/Savings";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useTheme } from "@mui/material/styles";
import { toDateString, numToMoney, getCurrentTime } from "../../Functions/text";
import State1 from "../../../assets/1.png";
import State2 from "../../../assets/2.png";
import State3 from "../../../assets/3.png";
import State4 from "../../../assets/4.png";
import State5 from "../../../assets/5.png";
import { postApi } from "../../../others/database";
import { GlobalContext } from "../../../context/GlobalState";
import { SERVER, CALENDAR } from "../../../constant";

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const FinancialPlans = () => {
  const { username } = useContext(GlobalContext);
  const theme = useTheme();

  const [pickyState, setPickyState] = useState(State5);

  const [userData, setUserData] = useState([
    {
      name: "Chi tiêu cần thiết",
      value: "0.55",
      money: 0,
      current: "0.2",
    },
    {
      name: "Tiết kiệm dài hạn",
      value: "0.1",
      money: 1000000,
      current: "0.15",
    },
    {
      name: "Quỹ giáo dục",
      value: "0.1",
      money: 1000000,
      current: "0.15",
    },
    {
      name: "Hưởng thụ",
      value: "0.1",
      money: 1000000,
      current: "0.15",
    },
    {
      name: "Tự do tài chính",
      value: "0.1",
      money: 1000000,
      current: "0.15",
    },
    {
      name: "Quỹ từ thiện",
      value: "0.05",
      money: 1000000,
      current: "0",
    },
  ]);

  const [calendarData, setCalendarData] = useState([
    [
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
    ],
    [
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
    ],
    [
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
    ],
    [
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
    ],
    [
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
      { number: "00", color: "#BEBEBE" },
    ],
  ]);

  const handleCalendarData = (planData) => {
    let curData = [];
    let currentTime = getCurrentTime();
    for (let i = 0; i < CALENDAR.length; ++i) {
      if (
        CALENDAR[i].month === currentTime.month &&
        CALENDAR[i].year === currentTime.year
      ) {
        curData = CALENDAR[i];
      }
    }

    let daysThisMonth = daysInMonth(currentTime.month, currentTime.year);

    let threshhold1 = Math.floor(planData[0].money / daysThisMonth);
    let threshhold2 = Math.floor(planData[1].money / daysThisMonth);
    let threshhold3 = Math.floor(planData[2].money / daysThisMonth);
    let threshhold4 = Math.floor(planData[3].money / daysThisMonth);
    let threshhold5 = Math.floor(planData[4].money / daysThisMonth);
    let threshhold6 = Math.floor(planData[5].money / daysThisMonth);

    let success = 0;
    let fail = 0;

    let changeMonth = false;
    for (let i = 0; i < curData.calendar.length; ++i) {
      for (let j = 0; j < curData.calendar[0].length; ++j) {
        if (
          Number(curData.calendar[i][j].number) !== 1 &&
          changeMonth === false
        ) {
          continue;
        } else if (
          (Number(curData.calendar[i][j].number) === 1 &&
            changeMonth === false) ||
          (Number(curData.calendar[i][j].number) <= currentTime.day &&
            changeMonth === true)
        ) {
          changeMonth = true;
          postApi(
            {
              username: username,
              day: Number(curData.calendar[i][j].number),
              month: currentTime.month,
              year: currentTime.year,
            },
            `${SERVER}/transactions/getOne`
          ).then((res) => {
            let fund1 = 0;
            let fund2 = 0;
            let fund3 = 0;
            let fund4 = 0;
            let fund5 = 0;
            let fund6 = 0;
            for (let k = 0; k < res.data.history.length; ++k) {
              if (res.data.history[k].category1 === "Chi tiêu cần thiết")
                fund1 += res.data.history[k].money;
              else if (res.data.history[k].category1 === "Tiết kiệm")
                fund2 += res.data.history[k].money;
              else if (res.data.history[k].category1 === "Giáo dục")
                fund3 += res.data.history[k].money;
              else if (res.data.history[k].category1 === "Hưởng thụ")
                fund4 += res.data.history[k].money;
              else if (res.data.history[k].category1 === "Tự do tài chính")
                fund5 += res.data.history[k].money;
              else if (res.data.history[k].category1 === "Quà và từ thiện")
                fund6 += res.data.history[k].money;
            }
            if (
              fund1 > threshhold1 ||
              fund2 > threshhold2 ||
              fund3 > threshhold3 ||
              fund4 > threshhold4 ||
              fund5 > threshhold5 ||
              fund6 > threshhold6
            ) {
              curData.calendar[i][j] = {
                number: curData.calendar[i][j].number,
                color: "#E32636",
              };
              fail += 1;
            } else {
              curData.calendar[i][j] = {
                number: curData.calendar[i][j].number,
                color: "#32de84",
              };
              success += 1;
            }
          });
        } else if (
          Number(curData.calendar[i][j].number) > currentTime.day &&
          changeMonth === true
        ) {
          continue;
        }
      }
    }

    setCalendarData(curData.calendar);
    if (success >= 3 * fail || success === 0) setPickyState(State5);
    else if (success >= 2 * fail) setPickyState(State4);
    else if (success >= fail) setPickyState(State3);
    else if (success <= fail && success > 0) setPickyState(State2);
    else setPickyState(State1);
  };

  useEffect(() => {
    postApi({ username: username }, `${SERVER}/user/getOne`).then((res) => {
      let userIncome = res.data.income;

      let currentTime = getCurrentTime();
      postApi(
        {
          username: username,
          month: currentTime.month,
          year: currentTime.year,
        },
        `${SERVER}/transactions/getMonthYear`
      ).then((data) => {
        let fund1 = 0;
        let fund2 = 0;
        let fund3 = 0;
        let fund4 = 0;
        let fund5 = 0;
        let fund6 = 0;
        for (let i = 0; i < data.data.length; ++i) {
          for (let j = 0; j < data.data[i].history.length; ++j) {
            if (data.data[i].history[j].category1 === "Chi tiêu cần thiết")
              fund1 += data.data[i].history[j].money;
            else if (data.data[i].history[j].category1 === "Tiết kiệm")
              fund2 += data.data[i].history[j].money;
            else if (data.data[i].history[j].category1 === "Giáo dục")
              fund3 += data.data[i].history[j].money;
            else if (data.data[i].history[j].category1 === "Hưởng thụ")
              fund4 += data.data[i].history[j].money;
            else if (data.data[i].history[j].category1 === "Tự do tài chính")
              fund5 += data.data[i].history[j].money;
            else if (data.data[i].history[j].category1 === "Quà và từ thiện")
              fund6 += data.data[i].history[j].money;
          }
        }
        data = [
          {
            name: "Chi tiêu cần thiết",
            money: Math.floor(userIncome * 0.55),
            current: fund1,
          },
          {
            name: "Tiết kiệm dài hạn",
            money: Math.floor(userIncome * 0.1),
            current: fund2,
          },
          {
            name: "Quỹ giáo dục",
            money: Math.floor(userIncome * 0.1),
            current: fund3,
          },
          {
            name: "Hưởng thụ",
            money: Math.floor(userIncome * 0.1),
            current: fund4,
          },
          {
            name: "Tự do tài chính",
            money: Math.floor(userIncome * 0.1),
            current: fund5,
          },
          {
            name: "Quỹ từ thiện",
            money: Math.floor(userIncome * 0.05),
            current: fund6,
          },
        ];

        handleCalendarData(data);
        setUserData(data);
      });
    });
  }, []);

  return (
    <Container
      sx={{
        marginBottom: "100px",
        minHeight: "50vh",
        marginTop: "50px",
        [theme.breakpoints.down("md")]: {
          marginBottom: "50px",
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
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "250px",
          }}
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
              value={month}
              onChange={handleChangeMonth}
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
              {createArray(12).map((value, id) => (
                <MenuItem value={toDateString(value + 1)} key={id}>
                  {toDateString(value + 1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography
            sx={{
              fontSize: theme.primary.small,
              color: "white",
              fontFamily: theme.primary.fontFamily,
              fontWeight: 700,
              marginRight: "5px",
              "&:hover": theme.primary.hoverDefault,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
                marginBottom: "10px",
                marginRight: "0px",
              },
            }}
          >
            /
          </Typography>

          <FormControl sx={{ minWidth: 60, height: "40px" }}>
            <Select
              value={year}
              onChange={handleChangeYear}
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
              {getYear().map((value, id) => (
                <MenuItem value={toDateString(value)} key={id}>
                  {toDateString(value)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box> */}

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              color: theme.primary.main,
              fontSize: theme.primary.medium,
              fontWeight: 700,
              fontFamily: theme.primary.fontFamily,
              [theme.breakpoints.down("md")]: {
                fontSize: "2.5vh",
              },
            }}
          >
            Mục tiêu tài chính tháng này của
          </Typography>
          <Typography
            sx={{
              color: theme.primary.sub,
              fontSize: theme.primary.medium,
              marginLeft: "5px",
              fontWeight: 700,
              fontFamily: theme.primary.fontFamily,
              [theme.breakpoints.down("md")]: {
                fontSize: "2.5vh",
              },
            }}
          >
            bạn!
          </Typography>
        </Box>

        {/* <Box sx={{ width: "250px", display: "flex", justifyContent: "center" }}>
          <Button sx={{ backgroundColor: theme.primary.sub }}>
            <Typography
              sx={{
                color: theme.primary.main,
                fontSize: theme.primary.small,
                fontWeight: 700,
                fontFamily: theme.primary.fontFamily,
              }}
            >
              Chi tiết
            </Typography>
          </Button>
            </Box> */}
      </Box>

      <Box sx={{ display: "flex" }}>
        {/* <Box
          sx={{
            width: "50px",
            top: "50%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowLeftIcon sx={{ fontSize: "100px" }} />
        </Box> */}
        <Grid container sx={{ marginTop: "30px" }}>
          {userData.map((item, idx) => (
            <Grid xs={6} md={4} sx={{ marginBottom: "15px" }}>
              <Rating
                name="customized-color"
                value={item.current / item.money}
                precision={0.05}
                max={1}
                readOnly
                icon={
                  <SavingsIcon
                    fontSize="inherit"
                    sx={{
                      color:
                        item.current > item.money
                          ? theme.primary.red
                          : theme.primary.sub,
                    }}
                  />
                }
                emptyIcon={
                  <SavingsIcon
                    fontSize="inherit"
                    sx={{
                      [theme.breakpoints.down("md")]: {
                        fontSize: "20vh",
                      },
                    }}
                  />
                }
                sx={{ fontSize: "170px" }}
              ></Rating>
              <Typography
                sx={{
                  color: theme.primary.main,
                  fontSize: theme.primary.medium,
                  marginLeft: "5px",
                  fontWeight: 700,
                  fontFamily: theme.primary.fontFamily,
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                  },
                }}
              >
                {item.name}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  sx={{
                    color: theme.primary.main,
                    fontSize: theme.primary.small,
                    marginLeft: "5px",
                    fontWeight: 700,
                    fontFamily: theme.primary.fontFamily,
                    [theme.breakpoints.down("md")]: {
                      fontSize: "1.5vh",
                    },
                  }}
                >
                  {numToMoney(item.current)}
                </Typography>
                <Typography
                  sx={{
                    color: theme.primary.sub,
                    fontSize: theme.primary.small,
                    marginLeft: "5px",
                    fontWeight: 700,
                    fontFamily: theme.primary.fontFamily,
                    [theme.breakpoints.down("md")]: {
                      fontSize: "1.5vh",
                    },
                  }}
                >
                  / {numToMoney(item.money)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* #Calendar and Picky/ */}
      <Grid container>
        <Grid xs={12} md={7}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "50px",
            }}
          >
            {["S", "M", "T", "W", "T", "F", "S"].map((value, idx) => (
              <Box
                sx={{
                  width: "12%",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  backgroundColor: theme.primary.main,
                  borderRadius: "5px",
                  color: "white",
                  fontWeight: 600,
                  fontFamily: theme.primary.fontFamily,
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                  },
                }}
                key={idx}
              >
                {value}
              </Box>
            ))}
          </Box>
          {calendarData.map((array, index) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
              key={index}
            >
              {array.map((value, idx) => (
                <Box
                  sx={{
                    width: "12%",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    backgroundColor: value.color,
                    borderRadius: "5px",
                    [theme.breakpoints.down("md")]: {
                      height: "30px",
                    },
                  }}
                  key={idx}
                >
                  <Typography
                    sx={{
                      color: "black",
                      fontWeight: 600,
                      fontFamily: theme.primary.fontFamily,
                      [theme.breakpoints.down("md")]: {
                        fontSize: "2vh",
                      },
                    }}
                  >
                    {value.number}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
          <Box>
            <Box
              sx={{ display: "flex", marginTop: "20px", alignItems: "center" }}
            >
              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#32de84",
                  borderRadius: "2px",
                }}
              ></Box>
              <Typography
                sx={{
                  color: theme.primary.main,
                  fontSize: theme.primary.small,
                  marginLeft: "5px",
                  fontWeight: 700,
                  fontFamily: theme.primary.fontFamily,
                  [theme.breakpoints.down("md")]: {
                    fontSize: "1.5vh",
                  },
                }}
              >
                Hoàn thành
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", marginTop: "10px", alignItems: "center" }}
            >
              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#E32636",
                  borderRadius: "2px",
                }}
              ></Box>
              <Typography
                sx={{
                  color: theme.primary.main,
                  fontSize: theme.primary.small,
                  marginLeft: "5px",
                  fontWeight: 700,
                  fontFamily: theme.primary.fontFamily,
                  [theme.breakpoints.down("md")]: {
                    fontSize: "1.5vh",
                  },
                }}
              >
                Không hoàn thành
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid
          xs={12}
          md={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "400px",
              marginLeft: "20px",
              marginTop: "20px",
              [theme.breakpoints.down("md")]: {
                width: "90%",
                marginLeft: 0,
              },
            }}
            image={pickyState}
            alt="Paella dish"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FinancialPlans;
