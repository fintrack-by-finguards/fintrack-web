import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { FIVECOLORS } from "../../../../constant/index";
import { createArray, toDateString, numToMoney } from "../../../Functions/text";
import { postApi } from "../../../../others/database";
import { SERVER } from "../../../../constant";
import { GlobalContext } from "../../../../context/GlobalState";
import ReportIcon from "@mui/icons-material/Report";

function range(min, max) {
  min = Number(min);
  max = Number(max);
  var len = max - min + 1;
  var arr = new Array(len);
  for (var i = 0; i < len; i++) {
    arr[i] = min + i;
  }

  return arr;
}

function getTop5(data) {
  let top5 = data.sort((a, b) => b.value - a.value).slice(0, 5);
  let res = [];
  for (let i = 0; i < top5.length; ++i) {
    if (top5[i].value > 0) {
      let newData = {
        name: top5[i].category,
        y: top5[i].value,
        color: FIVECOLORS[res.length],
      };
      res.push(newData);
    } else {
      break;
    }
  }

  console.log([{ name: "Tỷ trọng", colorByPoint: true, data: res }]);
  return [{ name: "Tỷ trọng", colorByPoint: true, data: res }];
}

function getDataRange(min, max, data, timeData) {
  let top5 = getTop5(data);
  let res = [];
  for (let i = 0; i < top5[0].data.length; ++i) {
    let dataInRange = [];
    for (let j = min - 1; j < max; ++j) {
      dataInRange.push(timeData[top5[0].data[i].name][j]);
    }
    let newData = { name: top5[0].data[i].name, data: dataInRange };
    res.push(newData);
  }

  let colors = [];
  for (let i = 0; i < top5[0].data.length; ++i) {
    colors.push(top5[0].data[i].color);
  }
  return { colors: colors, data: res };

  //    {
  //     name: "Tổng thu",
  //     data: getDataRange(startDay, endDay, totalReceiveData),
  //   },
}
const options1 = (data) => {
  return {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      width: 200,
      height: 200,
      backgroundColor: null,
    },
    title: "",
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        innerSize: "60%",
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: getTop5(data),
    credits: {
      enabled: false,
    },
  };
};

const options2 = (startDay, endDay, data, totalData) => {
  return {
    chart: {
      type: "column",
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      width: 700,
      height: 300,
    },
    title: {
      text: "",
    },
    tooltip: {
      formatter: function () {
        return (
          "<b>" +
          this.series.name +
          "</b> cho ngày " +
          this.x +
          " là: " +
          numToMoney(this.y)
        );
      },
    },
    xAxis: {
      categories: range(startDay, endDay),
    },
    yAxis: {
      crosshair: true,
      title: {
        text: "VNĐ",
      },
    },

    series: getDataRange(startDay, endDay, data, totalData).data,
    colors: getDataRange(startDay, endDay, data, totalData).colors,
    credits: {
      enabled: false,
    },
  };
};

const AssetsChart = ({ day, month, year }) => {
  const [startDay, setStartDay] = useState("01");
  const [endDay, setEndDay] = useState(day);

  const [checkNoAssetsData, setCheckNoAssetsData] = useState(false);
  const [checkNoDebtData, setCheckNoDebtData] = useState(false);
  const [checkNoAssetsTimeData, setCheckNoAssetsTimeData] = useState(false);
  const [checkNoDebtTimeData, setCheckNoDebtTimeData] = useState(false);

  const [assetsTimeData, setAssetsTimeData] = useState({
    "Tiền mặt": [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ],
    "Tiền gửi ngân hàng": [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ],
    "Cho vay": [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ],
    "Đầu tư": [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ],
    "Bất động sản": [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ],
  });

  const [debtTimeData, setDebtTimeData] = useState({
    "Tiền mặt": [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ],
    "Trả góp": [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ],
    "Thế chấp": [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ],
    "Thấu chi": [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ],
  });

  const [graphCategory, setGraphCategory] = useState(0);

  const [assetsData, setAssetsData] = useState([
    { category: "Tiền mặt", value: 1 },
    { category: "Tiền gửi ngân hàng", value: 2 },
    { category: "Cho vay", value: 3 },
    { category: "Đầu tư", value: 4 },
    { category: "Bất động sản", value: 5 },
  ]);

  const [debtData, setDebtData] = useState([
    { category: "Tiền mặt", value: 1 },
    { category: "Trả góp", value: 2 },
    { category: "Thế chấp", value: 3 },
    { category: "Thấu chi", value: 4 },
  ]);

  useEffect(() => {
    let curAssetsTimeData = {
      "Tiền mặt": [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ],
      "Tiền gửi ngân hàng": [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ],
      "Cho vay": [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ],
      "Đầu tư": [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ],
      "Bất động sản": [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ],
    };

    let curDebtTimeData = {
      "Tiền mặt": [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ],
      "Trả góp": [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ],
      "Thế chấp": [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ],
      "Thấu chi": [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ],
    };

    postApi(
      { username: username, month: month, year: year },
      `${SERVER}/assets/getMonthYear`
    ).then((res) => {
      for (let i = 0; i < res.data.length; ++i) {
        curAssetsTimeData["Tiền mặt"][res.data[i].day - 1] +=
          res.data[i].assets[0];
        curAssetsTimeData["Tiền gửi ngân hàng"][res.data[i].day - 1] +=
          res.data[i].assets[1];
        curAssetsTimeData["Cho vay"][res.data[i].day - 1] +=
          res.data[i].assets[2];
        curAssetsTimeData["Đầu tư"][res.data[i].day - 1] +=
          res.data[i].assets[3];
        curAssetsTimeData["Bất động sản"][res.data[i].day - 1] +=
          res.data[i].assets[5];

        curDebtTimeData["Tiền mặt"][res.data[i].day - 1] += res.data[i].debt[0];
        curDebtTimeData["Trả góp"][res.data[i].day - 1] += res.data[i].debt[1];
        curDebtTimeData["Thế chấp"][res.data[i].day - 1] += res.data[i].debt[2];
        curDebtTimeData["Thấu chi"][res.data[i].day - 1] += res.data[i].debt[3];
      }

      setAssetsTimeData(curAssetsTimeData);
      setDebtTimeData(curDebtTimeData);

      if (
        curAssetsTimeData["Tiền mặt"].reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0) +
          curAssetsTimeData["Tiền gửi ngân hàng"].reduce(
            (accumulator, currentValue) => {
              return accumulator + currentValue;
            },
            0
          ) +
          curAssetsTimeData["Cho vay"].reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0) +
          curAssetsTimeData["Đầu tư"].reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0) +
          curAssetsTimeData["Bất động sản"].reduce(
            (accumulator, currentValue) => {
              return accumulator + currentValue;
            },
            0
          ) ===
        0
      ) {
        setCheckNoAssetsTimeData(true);
      } else {
        setCheckNoAssetsTimeData(false);
      }

      if (
        curDebtTimeData["Tiền mặt"].reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0) +
          curDebtTimeData["Trả góp"].reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0) +
          curDebtTimeData["Thế chấp"].reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0) +
          curDebtTimeData["Thấu chi"].reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0) ===
        0
      ) {
        setCheckNoDebtTimeData(true);
      } else {
        setCheckNoDebtTimeData(false);
      }
    });
  }, [startDay, endDay, day, month, year]);

  useEffect(() => {
    postApi(
      { username: username, day: day, month: month, year: year },
      `${SERVER}/assets/getOne`
    ).then((res) => {
      setAssetsData([
        {
          category: "Tiền mặt",
          value: res.data.assets[0] < 0 ? 0 : res.data.assets[0],
        },
        {
          category: "Tiền gửi ngân hàng",
          value: res.data.assets[1] < 0 ? 0 : res.data.assets[1],
        },
        {
          category: "Cho vay",
          value: res.data.assets[2] < 0 ? 0 : res.data.assets[2],
        },
        {
          category: "Đầu tư",
          value: res.data.assets[3] < 0 ? 0 : res.data.assets[3],
        },
        {
          category: "Bất động sản",
          value: res.data.assets[4] < 0 ? 0 : res.data.assets[4],
        },
      ]);
      setDebtData([
        {
          category: "Tiền mặt",
          value: res.data.debt[0] < 0 ? 0 : res.data.debt[0],
        },
        {
          category: "Trả góp",
          value: res.data.debt[1] < 0 ? 0 : res.data.debt[1],
        },
        {
          category: "Thế chấp",
          value: res.data.debt[2] < 0 ? 0 : res.data.debt[2],
        },
        {
          category: "Thấu chi",
          value: res.data.debt[3] < 0 ? 0 : res.data.debt[3],
        },
      ]);
      if (
        res.data.assets.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0) === 0
      ) {
        setCheckNoAssetsData(true);
      } else {
        setCheckNoAssetsData(false);
      }
      if (
        res.data.debt.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0) === 0
      ) {
        setCheckNoDebtData(true);
      } else {
        setCheckNoDebtData(false);
      }
    });
  }, [day, month, year]);

  console.log(assetsData);

  const { username } = useContext(GlobalContext);

  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "95%",
        display: "block",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{ height: "300px", borderRadius: theme.primary.borderRadius }}
        boxShadow={3}
      >
        <Typography
          sx={{
            color: theme.primary.main,
            fontSize: "2vh",
            fontWeight: 700,
            fontFamily: theme.primary.fontFamily,
            paddingTop: "20px",
          }}
          textAlign="center"
        >
          CẤU TRÚC TÀI SẢN - NỢ TRONG NGÀY
        </Typography>
        <Grid
          sx={{
            display: "flex",
          }}
        >
          <Grid
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100px",
                padding: "5px",
                marginTop: "30px",
                backgroundColor: theme.primary.main,
                borderRadius: theme.primary.borderRadius,
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "1.7vh",
                  fontWeight: 700,
                  fontFamily: theme.primary.fontFamily,
                }}
                textAlign="center"
              >
                TÀI SẢN
              </Typography>
            </Box>

            {!checkNoAssetsData ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={options1(assetsData)}
                />

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {getTop5(assetsData)[0].data.map((chartData, idx) => (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: "10px",
                          height: "10px",
                          backgroundColor: chartData.color,
                          color: "black",
                          borderRadius: "2px",
                        }}
                      ></Box>
                      <Typography
                        sx={{
                          color: theme.primary.main,
                          fontSize: "1.5vh",
                          fontWeight: 700,
                          fontFamily: theme.primary.fontFamily,
                          marginLeft: "10px",
                        }}
                        textAlign="center"
                      >
                        {chartData.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  marginTop: "30px",
                }}
              >
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
            )}
          </Grid>

          <Grid
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100px",
                padding: "5px",
                marginTop: "30px",
                backgroundColor: theme.primary.main,
                borderRadius: theme.primary.borderRadius,
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "1.7vh",
                  fontWeight: 700,
                  fontFamily: theme.primary.fontFamily,
                }}
                textAlign="center"
              >
                Nợ
              </Typography>
            </Box>

            {!checkNoDebtData ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={options1(debtData)}
                />

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {getTop5(debtData)[0].data.map((chartData, idx) => (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: "10px",
                          height: "10px",
                          backgroundColor: chartData.color,
                          color: "black",
                          borderRadius: "2px",
                        }}
                      ></Box>
                      <Typography
                        sx={{
                          color: theme.primary.main,
                          fontSize: "1.5vh",
                          fontWeight: 700,
                          fontFamily: theme.primary.fontFamily,
                          marginLeft: "10px",
                        }}
                        textAlign="center"
                      >
                        {chartData.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  marginTop: "30px",
                }}
              >
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
            )}
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          height:
            checkNoAssetsTimeData || checkNoDebtTimeData ? "300px" : "430px",
          borderRadius: theme.primary.borderRadius,
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        boxShadow={3}
      >
        <Typography
          sx={{
            color: theme.primary.main,
            fontSize: "2vh",
            fontWeight: 600,
            fontFamily: theme.primary.fontFamily,
            marginBottom: "10px",
            paddingTop: "20px",
          }}
          textAlign="center"
        >
          BIẾN ĐỘNG TRONG KHOẢNG
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
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
            Của:
          </Typography>
          <FormControl sx={{ minWidth: 60, height: "40px" }}>
            <Select
              value={graphCategory}
              onChange={(e) => setGraphCategory(e.target.value)}
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
              <MenuItem value={0}>Tài sản</MenuItem>
              <MenuItem value={1}>Nợ</MenuItem>
            </Select>
          </FormControl>
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "600",
              fontSize: theme.primary.small,
              marginLeft: "10px",
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
        {graphCategory === 0 ? (
          <Box>
            {!checkNoAssetsTimeData ? (
              <HighchartsReact
                highcharts={Highcharts}
                options={options2(startDay, endDay, assetsData, assetsTimeData)}
              />
            ) : (
              <Box
                sx={{
                  marginTop: "30px",
                }}
              >
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
            )}
          </Box>
        ) : (
          <Box>
            {!checkNoDebtTimeData ? (
              <HighchartsReact
                highcharts={Highcharts}
                options={options2(startDay, endDay, debtData, debtTimeData)}
              />
            ) : (
              <Box
                sx={{
                  marginTop: "30px",
                }}
              >
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
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AssetsChart;
