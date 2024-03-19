import React, { useEffect, useState, useContext } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { postApi } from "../../../../others/database";
import { GlobalContext } from "../../../../context/GlobalState";
import { SERVER } from "../../../../constant";

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

const options = (totalExpensesData, totalReceiveData, startDay, endDay) => {
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

const TransactionsChart = ({
  startDay,
  endDay,
  choseMonth,
  choseYear,
  resetPage,
}) => {
  const [totalExpensesData, setTotalExpensesData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ]);
  const [totalReceiveData, setTotalReceiveData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ]);

  let sDay = Number(startDay);
  let eDay = Number(endDay);

  const { username } = useContext(GlobalContext);

  useEffect(() => {
    postApi(
      {
        username: username,
        month: choseMonth,
        year: choseYear,
      },
      `${SERVER}/transactions/getMonthYear`
    ).then((res) => {
      let curTotalExpensesData = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ];
      let curTotalReceiveData = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ];
      for (let i = 0; i < res.data.length; ++i) {
        let curTotalExpenses = 0;
        let curTotalReceive = 0;
        for (let j = 0; j < res.data[i].history.length; ++j) {
          if (res.data[i].history[j].type === 0)
            curTotalExpenses += Number(res.data[i].history[j].money);
          else curTotalReceive += Number(res.data[i].history[j].money);
        }
        curTotalExpensesData[res.data[i].day - 1] = curTotalExpenses;
        curTotalReceiveData[res.data[i].day - 1] = curTotalReceive;
      }
      setTotalExpensesData(curTotalExpensesData);
      setTotalReceiveData(curTotalReceiveData);
    });
  }, [choseMonth, choseYear, sDay, eDay, resetPage]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options(totalExpensesData, totalReceiveData, sDay, eDay)}
    />
  );
};

export default TransactionsChart;
