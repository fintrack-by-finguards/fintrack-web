import React, { useState } from "react";
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
import { createArray, toDateString } from "../../../Functions/text";

const assetsData = [
  { category: "Tiền mặt", value: 10000000 },
  { category: "Tiền gửi ngân hàng", value: 5000000 },
  { category: "Cho vay", value: 2000000 },
  { category: "Đầu tư", value: 3000000 },
  { category: "Bất động sản", value: 0 },
];

const assetsTimeData = {
  "Tiền mặt": [
    1564000, 2202000, 1726000, 2182000, 2503000, 2884000, 2429000, 1654000,
    1779000, 2458000, 1719000, 2671000, 1202000, 227000, 2209000, 1698000,
    2460000, 1136000, 1603000, 2704000, 1965000, 2082000, 2929000, 2192000,
    1886000, 1865000, 1660000, 2011000, 1558000, 2347000, 2028000,
  ],
  "Tiền gửi ngân hàng": [
    1564000, 2202000, 1726000, 2182000, 2503000, 2884000, 2429000, 1654000,
    1779000, 2458000, 1719000, 2671000, 1202000, 227000, 2209000, 1698000,
    2460000, 1136000, 1603000, 2704000, 1965000, 2082000, 2929000, 2192000,
    1886000, 1865000, 1660000, 2011000, 1558000, 2347000, 2028000,
  ],
  "Cho vay": [
    1564000, 2202000, 1726000, 2182000, 2503000, 2884000, 2429000, 1654000,
    1779000, 2458000, 1719000, 2671000, 1202000, 227000, 2209000, 1698000,
    2460000, 1136000, 1603000, 2704000, 1965000, 2082000, 2929000, 2192000,
    1886000, 1865000, 1660000, 2011000, 1558000, 2347000, 2028000,
  ],
  "Đầu tư": [
    1564000, 2202000, 1726000, 2182000, 2503000, 2884000, 2429000, 1654000,
    1779000, 2458000, 1719000, 2671000, 1202000, 227000, 2209000, 1698000,
    2460000, 1136000, 1603000, 2704000, 1965000, 2082000, 2929000, 2192000,
    1886000, 1865000, 1660000, 2011000, 1558000, 2347000, 2028000,
  ],
  "Bất động sản": [
    1564000, 2202000, 1726000, 2182000, 2503000, 2884000, 2429000, 1654000,
    1779000, 2458000, 1719000, 2671000, 1202000, 227000, 2209000, 1698000,
    2460000, 1136000, 1603000, 2704000, 1965000, 2082000, 2929000, 2192000,
    1886000, 1865000, 1660000, 2011000, 1558000, 2347000, 2028000,
  ],
};

const totalExpensesData = [
  1069000, 2334000, 2233000, 510000, 2651000, 600000, 3432000, 50000, 150000,
  340000, 4300000, 230000, 3640000, 544000, 50000, 1069000, 2334000, 2233000,
  510000, 2651000, 600000, 3432000, 50000, 150000, 340000, 4300000, 230000,
  3640000, 544000, 50000, 0,
];

const totalReceiveData = [
  0, 0, 0, 0, 20000000, 600000, 0, 0, 10000000, 0, 0, 5000000, 0, 0, 400000,
  500000, 0, 0, 0, 0, 20000000, 600000, 0, 0, 10000000, 0, 0, 5000000, 0, 0,
  400000,
];

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
  return [{ name: "Tỷ trọng", colorByPoint: true, data: res }];
}

function getDataRange(min, max, data, timeData) {
  let top5 = getTop5(data);
  let res = [];
  for (let i = 0; i < top5[0].data.length; ++i) {
    let dataInRange = [];
    for (let j = min - 1; j < max; ++j) {
      dataInRange.push(assetsTimeData[top5[0].data[i].name][j]);
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
const options1 = () => {
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

    series: getTop5(assetsData),
    credits: {
      enabled: false,
    },
  };
};

const options2 = (startDay, endDay) => {
  return {
    chart: {
      type: "column",
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      width: 400,
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
          this.y +
          "đ"
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

    series: getDataRange(startDay, endDay, assetsData, totalExpensesData).data,
    colors: getDataRange(startDay, endDay, assetsData, totalExpensesData)
      .colors,
    credits: {
      enabled: false,
    },
  };
};

const AssetsChart = () => {
  const [startDay, setStartDay] = useState("01");
  const [endDay, setEndDay] = useState("31");

  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "95%",
        height: "450px",
        borderRadius: theme.primary.borderRadius,
        display: "flex",
        alignItems: "center",
        margin: "0 auto",
        marginBottom: "30px",
      }}
      boxShadow={3}
    >
      <Grid container sx={{ padding: "20px" }}>
        <Grid
          xs={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: theme.primary.main,
              fontSize: "2vh",
              fontWeight: 600,
              fontFamily: theme.primary.fontFamily,
              marginBottom: "20px",
            }}
            textAlign="center"
          >
            TỔNG QUAN
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              paddingBottom: "50px",
            }}
          >
            <HighchartsReact highcharts={Highcharts} options={options1()} />
          </Box>

          {/* <Box>
            {getTop5(assetsData)[0].data.map((data, idx) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "20px",
                  marginBottom: "5px",
                }}
              >
                <Box
                  sx={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: data.color,
                    borderRadius: "2px",
                  }}
                ></Box>
                <Typography
                  sx={{
                    color: theme.primary.main,
                    fontSize: "1.7vh",
                    marginLeft: "5px",
                    fontWeight: 600,
                    fontFamily: theme.primary.fontFamily,
                  }}
                >
                  {data.name}
                </Typography>
              </Box>
            ))}
          </Box> */}
        </Grid>

        <Grid
          xs={7}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: theme.primary.main,
              fontSize: "2vh",
              fontWeight: 600,
              fontFamily: theme.primary.fontFamily,
              marginBottom: "10px",
            }}
            textAlign="center"
          >
            BIẾN ĐỘNG
          </Typography>
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
          <HighchartsReact
            highcharts={Highcharts}
            options={options2(startDay, endDay)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AssetsChart;
