import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
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
  yAxis: {
    crosshair: true,
    title: {
      text: "VNĐ",
    },
  },

  series: [
    {
      name: "Tổng chi",
      data: [
        1069000, 2334000, 2233000, 510000, 2651000, 600000, 3432000, 50000,
        150000, 340000, 4300000, 230000, 3640000, 544000, 50000,
      ],
    },
    {
      name: "Tổng thu",
      data: [
        0, 0, 0, 0, 20000000, 600000, 0, 0, 10000000, 0, 0, 5000000, 0, 0,
        400000, 500000,
      ],
    },
  ],
  colors: ["#E32636", "#32de84"],
  credits: {
    enabled: false,
  },
};

const TransactionsChart = () => {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default TransactionsChart;
