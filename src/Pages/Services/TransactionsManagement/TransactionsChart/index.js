import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

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

function getDataRange(min, max, data) {
  let curData = [];
  for (let i = min - 1; i < max; ++i) {
    curData.push(data[i]);
  }
  return curData;
}

function range(min, max) {
  var len = max - min + 1;
  var arr = new Array(len);
  for (var i = 0; i < len; i++) {
    arr[i] = min + i;
  }
  return arr;
}

const options = (startDay, endDay) => {
  return {
    chart: {
      type: "column",
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      width: 900,
      height: 400,
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

    series: [
      {
        name: "Tổng chi",
        data: getDataRange(startDay, endDay, totalExpensesData),
      },
      {
        name: "Tổng thu",
        data: getDataRange(startDay, endDay, totalReceiveData),
      },
    ],
    colors: ["#E32636", "#32de84"],
    credits: {
      enabled: false,
    },
  };
};

const TransactionsChart = ({ startDay, endDay }) => {
  let sDay = Number(startDay);
  let eDay = Number(endDay);
  console.log(sDay, eDay);
  return (
    <HighchartsReact highcharts={Highcharts} options={options(sDay, eDay)} />
  );
};

export default TransactionsChart;
