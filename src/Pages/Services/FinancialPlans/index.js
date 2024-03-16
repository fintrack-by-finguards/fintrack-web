import React, { useState } from "react";
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
import { toDateString, numToMoney } from "../../Functions/text";
import State1 from "../../../assets/1.png";
import State2 from "../../../assets/2.png";
import State3 from "../../../assets/3.png";
import State4 from "../../../assets/4.png";
import State5 from "../../../assets/5.png";

const financialDistribution = [
  {
    name: "Chi tiêu cần thiết",
    value: "0.55",
    money: 5500000,
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
];

const FinancialPlans = () => {
  const theme = useTheme();

  const [month, setMonth] = useState("03");
  const [year, setYear] = useState("2024");

  const createArray = (N) => {
    return Array.apply(null, { length: N }).map(Number.call, Number);
  };

  const getYear = () => {
    var currentYear = new Date().getFullYear();
    var years = [];
    var startYear = 1980;
    for (var i = startYear; i <= currentYear; i++) {
      years.push(startYear++);
    }
    return years;
  };

  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
  };

  const handleChangeYear = (e) => {
    setYear(e.target.value);
  };

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
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              color: theme.primary.main,
              fontSize: theme.primary.medium,
              fontWeight: 700,
              fontFamily: theme.primary.fontFamily,
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
            }}
          >
            bạn!
          </Typography>
        </Box>

        <Box sx={{ width: "250px", display: "flex", justifyContent: "center" }}>
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
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "50px",
            top: "50%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowLeftIcon sx={{ fontSize: "100px" }} />
        </Box>
        <Grid container sx={{ marginTop: "30px" }}>
          {financialDistribution.map((item, idx) => (
            <Grid xs={4} sx={{ marginBottom: "15px" }}>
              <Rating
                name="customized-color"
                value={item.current}
                precision={0.05}
                max={1}
                readOnly
                icon={<SavingsIcon fontSize="inherit" />}
                emptyIcon={<SavingsIcon fontSize="inherit" />}
                sx={{ fontSize: "170px" }}
              ></Rating>
              <Typography
                sx={{
                  color: theme.primary.main,
                  fontSize: theme.primary.medium,
                  marginLeft: "5px",
                  fontWeight: 700,
                  fontFamily: theme.primary.fontFamily,
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
                  }}
                >
                  {numToMoney(item.money * item.current)}
                </Typography>
                <Typography
                  sx={{
                    color: theme.primary.sub,
                    fontSize: theme.primary.small,
                    marginLeft: "5px",
                    fontWeight: 700,
                    fontFamily: theme.primary.fontFamily,
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
        <Grid xs={7}>
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
                }}
                key={idx}
              >
                {value}
              </Box>
            ))}
          </Box>
          {[
            [
              { number: "26", color: "#BEBEBE" },
              { number: "27", color: "#BEBEBE" },
              { number: "28", color: "#BEBEBE" },
              { number: "29", color: "#BEBEBE" },
              { number: "01", color: "#32de84" },
              { number: "02", color: "#32de84" },
              { number: "03", color: "#E32636" },
            ],
            [
              { number: "04", color: "#32de84" },
              { number: "05", color: "#E32636" },
              { number: "06", color: "#32de84" },
              { number: "07", color: "#32de84" },
              { number: "08", color: "#32de84" },
              { number: "09", color: "#32de84" },
              { number: "10", color: "#E32636" },
            ],
            [
              { number: "11", color: "#E32636" },
              { number: "12", color: "#E32636" },
              { number: "13", color: "#32de84" },
              { number: "14", color: "#BEBEBE" },
              { number: "15", color: "#BEBEBE" },
              { number: "16", color: "#BEBEBE" },
              { number: "17", color: "#BEBEBE" },
            ],
            [
              { number: "18", color: "#BEBEBE" },
              { number: "19", color: "#BEBEBE" },
              { number: "20", color: "#BEBEBE" },
              { number: "21", color: "#BEBEBE" },
              { number: "22", color: "#BEBEBE" },
              { number: "23", color: "#BEBEBE" },
              { number: "24", color: "#BEBEBE" },
            ],
            [
              { number: "25", color: "#BEBEBE" },
              { number: "26", color: "#BEBEBE" },
              { number: "27", color: "#BEBEBE" },
              { number: "28", color: "#BEBEBE" },
              { number: "29", color: "#BEBEBE" },
              { number: "30", color: "#BEBEBE" },
              { number: "31", color: "#BEBEBE" },
            ],
          ].map((array, index) => (
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
                  }}
                  key={idx}
                >
                  <Typography
                    sx={{
                      color: "black",
                      fontWeight: 600,
                      fontFamily: theme.primary.fontFamily,
                    }}
                  >
                    {value.number}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
          <Box>
            <Box sx={{ display: "flex", marginTop: "20px" }}>
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
                }}
              >
                Hoàn thành
              </Typography>
            </Box>
            <Box sx={{ display: "flex", marginTop: "10px" }}>
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
                }}
              >
                Không hoàn thành
              </Typography>
            </Box>
          </Box>
          {/* Chỉnh thời gian */}
        </Grid>

        <Grid
          xs={5}
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
            }}
            image={State4}
            alt="Paella dish"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FinancialPlans;
