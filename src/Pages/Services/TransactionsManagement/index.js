import React, { useState, useEffect, useContext } from "react";
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
import { getCurrentTime, numToMoney } from "../../Functions/text";
import { useTheme } from "@mui/material/styles";
import { createArray, toDateString, getDays } from "../../Functions/text";
import { postApi } from "../../../others/database";
import { GlobalContext } from "../../../context/GlobalState";
import { SERVER, TIME } from "../../../constant";
import { useSnackbar } from "notistack";

const TransactionsManagement = () => {
  let currentTime = getCurrentTime();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const [choseMonth, setChoseMonth] = useState(currentTime.month);
  const [choseYear, setChoseYear] = useState(currentTime.year);

  const [startDay, setStartDay] = useState("01");
  const [endDay, setEndDay] = useState(currentTime.day);

  const [displayDay, setDisplayDay] = useState(currentTime.day);
  const [displayHis, setDisplayHis] = useState({
    day: 0,
    month: 0,
    year: 0,
    user: "notta",
    history: [],
  });

  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalReceive, setTotalReceive] = useState(0);
  const [resetPage, setResetPage] = useState(false);

  const { username } = useContext(GlobalContext);

  useEffect(() => {
    postApi(
      {
        username: username,
        day: displayDay,
        month: choseMonth,
        year: choseYear,
      },
      `${SERVER}/transactions/getOne`
    ).then((res) => {
      handleChangeData(res);
    });
  }, [displayDay, choseMonth, choseYear, resetPage]);

  const handleAddTrans = (
    _name,
    _cate1,
    _cate2,
    _money,
    _hour,
    _minute,
    _second,
    _type,
    _moneytype,
    _saving
  ) => {
    postApi(
      {
        username: username,
        day: Number(displayDay),
        month: Number(choseMonth),
        year: Number(choseYear),
        name: _name,
        category1: _cate1,
        category2: _cate2,
        money: Number(_money),
        hour: Number(_hour),
        minute: Number(_minute),
        second: Number(_second),
        type: Number(_type),
        moneytype: Number(_moneytype),
      },
      `${SERVER}/transactions/add`
    ).then((res) => {
      if (res.status === "success") {
        if (Number(_type) === 1) {
          postApi(
            {
              username: username,
              day: Number(displayDay),
              month: Number(choseMonth),
              year: Number(choseYear),
              name: _name,
              category1: "Tài sản",
              category2: _moneytype === 0 ? "Tiền mặt" : "Tiền gửi ngân hàng",
              money: Number(_money),
              hour: Number(_hour),
              minute: Number(_minute),
              second: Number(_second),
              type: 0,
              tran_id: res.tran_id,
            },
            `${SERVER}/assets/add`
          ).then((res) => {});
        }

        if (Number(_type) === 1 && _cate1 === "Vay nợ") {
          postApi(
            {
              username: username,
              day: Number(displayDay),
              month: Number(choseMonth),
              year: Number(choseYear),
              name: _name,
              category1: "Nợ",
              category2: "Tiền mặt",
              money: Number(_money),
              hour: Number(_hour),
              minute: Number(_minute),
              second: Number(_second),
              type: 0,
              tran_id: res.tran_id,
            },
            `${SERVER}/assets/add`
          ).then((res) => {});
        }

        if (Number(_type) === 0) {
          postApi(
            {
              username: username,
              day: Number(displayDay),
              month: Number(choseMonth),
              year: Number(choseYear),
              name: _name,
              category1: "Tài sản",
              category2: _moneytype === 0 ? "Tiền mặt" : "Tiền gửi ngân hàng",
              money: Number(_money),
              hour: Number(_hour),
              minute: Number(_minute),
              second: Number(_second),
              type: 1,
              tran_id: res.tran_id,
            },
            `${SERVER}/assets/add`
          ).then((res) => {});
        }

        if (
          Number(_type) === 0 &&
          (_cate2 === "Đầu tư" || _cate2 === "Bất động sản")
        ) {
          postApi(
            {
              username: username,
              day: Number(displayDay),
              month: Number(choseMonth),
              year: Number(choseYear),
              name: _name,
              category1: "Tài sản",
              category2: _cate2,
              money: Number(_money),
              hour: Number(_hour),
              minute: Number(_minute),
              second: Number(_second),
              type: 0,
              tran_id: res.tran_id,
            },
            `${SERVER}/assets/add`
          ).then((res) => {});
        }

        if (Number(_type) === 0 && _cate1 === "Trả nợ") {
          postApi(
            {
              username: username,
              day: Number(displayDay),
              month: Number(choseMonth),
              year: Number(choseYear),
              name: _name,
              category1: "Nợ",
              category2: "Tiền mặt",
              money: Number(_money),
              hour: Number(_hour),
              minute: Number(_minute),
              second: Number(_second),
              type: 1,
              tran_id: res.tran_id,
            },
            `${SERVER}/assets/add`
          ).then((res) => {});
        }

        if (Number(_type) === 0 && _cate1 === "Tiết kiệm") {
          postApi(
            {
              username: username,
              id: _saving,
              tran_id: res.tran_id,
              day: Number(displayDay),
              month: Number(choseMonth),
              year: Number(choseYear),
              name: _name,
              money: Number(_money),
              hour: Number(_hour),
              minute: Number(_minute),
              second: Number(_second),
              moneytype: _moneytype,
            },
            `${SERVER}/goals/add_transaction`
          ).then((res) => {});
        }

        handleChangeData(res);
        setResetPage(!resetPage);
        enqueueSnackbar("Tạo giao dịch thành công!", {
          variant: "success",
          autoHideDuration: 5000,
        });
      } else if (res.status === "false") {
        enqueueSnackbar("Tạo giao dịch thất bại!", {
          variant: "error",
          autoHideDuration: 5000,
        });
      }
    });
  };

  const handleDeleteTrans = (data) => {
    postApi(
      {
        username: username,
        day: displayDay,
        month: choseMonth,
        year: choseYear,
        tran_id: data.tran_id,
      },
      `${SERVER}/transactions/delete`
    ).then((res) => {
      if (res.status === "success") {
        postApi(
          {
            username: username,
            day: Number(displayDay),
            month: Number(choseMonth),
            year: Number(choseYear),
            parent_id: data.tran_id,
          },
          `${SERVER}/assets/delete`
        ).then((res) => {});

        if (Number(data.type) === 0 && data.category1 === "Tiết kiệm") {
          postApi(
            {
              username: username,
              tran_id: data.tran_id,
            },
            `${SERVER}/goals/delete_transaction`
          ).then((res) => {});
        }

        handleChangeData(res);
        setResetPage(!resetPage);
        enqueueSnackbar("Xoá giao dịch thành công!", {
          variant: "success",
          autoHideDuration: 5000,
        });
      } else if (res.status === "existed") {
        enqueueSnackbar("Xoá giao dịch thất bại!", {
          variant: "error",
          autoHideDuration: 5000,
        });
      }
    });
  };

  const handleUpdateTrans = (
    data,
    new_name,
    new_cate1,
    new_cate2,
    new_money,
    new_hour,
    new_minute,
    new_second,
    new_type,
    new_moneytype,
    _saving
  ) => {
    postApi(
      {
        username: username,
        day: displayDay,
        month: choseMonth,
        year: choseYear,
        tran_id: data.tran_id,
        new_name: new_name,
        new_category1: new_cate1,
        new_category2: new_cate2,
        new_money: new_money,
        new_hour: new_hour,
        new_minute: new_minute,
        new_second: new_second,
        new_type: new_type,
        new_moneytype: new_moneytype,
      },
      `${SERVER}/transactions/update`
    ).then((res) => {
      if (res.status === "success") {
        postApi(
          {
            username: username,
            day: Number(displayDay),
            month: Number(choseMonth),
            year: Number(choseYear),
            parent_id: data.tran_id,
          },
          `${SERVER}/assets/delete`
        ).then((res) => {});

        if (Number(data.type) === 0 && data.category1 === "Tiết kiệm") {
          postApi(
            {
              username: username,
              tran_id: data.tran_id,
            },
            `${SERVER}/goals/delete_transaction`
          ).then((res) => {
            if (Number(new_type) === 0 && new_cate1 === "Tiết kiệm") {
              postApi(
                {
                  username: username,
                  id: _saving,
                  tran_id: data.tran_id,
                  day: Number(displayDay),
                  month: Number(choseMonth),
                  year: Number(choseYear),
                  name: new_name,
                  money: Number(new_money),
                  hour: Number(new_hour),
                  minute: Number(new_minute),
                  second: Number(new_second),
                  moneytype: new_moneytype,
                },
                `${SERVER}/goals/add_transaction`
              ).then((res) => {});
            }
          });
        }

        if (Number(new_type) === 1) {
          postApi(
            {
              username: username,
              day: Number(displayDay),
              month: Number(choseMonth),
              year: Number(choseYear),
              name: new_name,
              category1: "Tài sản",
              category2:
                new_moneytype === 0 ? "Tiền mặt" : "Tiền gửi ngân hàng",
              money: Number(new_money),
              hour: Number(new_hour),
              minute: Number(new_minute),
              second: Number(new_second),
              type: 0,
              tran_id: data.tran_id,
            },
            `${SERVER}/assets/add`
          ).then((res) => {});
        }

        if (Number(new_type) === 1 && new_cate1 === "Vay nợ") {
          postApi(
            {
              username: username,
              day: Number(displayDay),
              month: Number(choseMonth),
              year: Number(choseYear),
              name: new_name,
              category1: "Nợ",
              category2: "Tiền mặt",
              money: Number(new_money),
              hour: Number(new_hour),
              minute: Number(new_minute),
              second: Number(new_second),
              type: 0,
              tran_id: data.tran_id,
            },
            `${SERVER}/assets/add`
          ).then((res) => {});
        }

        if (Number(new_type) === 0) {
          postApi(
            {
              username: username,
              day: Number(displayDay),
              month: Number(choseMonth),
              year: Number(choseYear),
              name: new_name,
              category1: "Tài sản",
              category2:
                new_moneytype === 0 ? "Tiền mặt" : "Tiền gửi ngân hàng",
              money: Number(new_money),
              hour: Number(new_hour),
              minute: Number(new_minute),
              second: Number(new_second),
              type: 1,
              tran_id: data.tran_id,
            },
            `${SERVER}/assets/add`
          ).then((res) => {});
        }

        if (
          Number(new_type) === 0 &&
          (new_cate2 === "Đầu tư" || new_cate2 === "Bất động sản")
        ) {
          postApi(
            {
              username: username,
              day: Number(displayDay),
              month: Number(choseMonth),
              year: Number(choseYear),
              name: new_name,
              category1: "Tài sản",
              category2: new_cate2,
              money: Number(new_money),
              hour: Number(new_hour),
              minute: Number(new_minute),
              second: Number(new_second),
              type: 0,
              tran_id: data.tran_id,
            },
            `${SERVER}/assets/add`
          ).then((res) => {});
        }

        if (Number(new_type) === 0 && new_cate1 === "Trả nợ") {
          postApi(
            {
              username: username,
              day: Number(displayDay),
              month: Number(choseMonth),
              year: Number(choseYear),
              name: new_name,
              category1: "Nợ",
              category2: "Tiền mặt",
              money: Number(new_money),
              hour: Number(new_hour),
              minute: Number(new_minute),
              second: Number(new_second),
              type: 1,
              tran_id: res.tran_id,
            },
            `${SERVER}/assets/add`
          ).then((res) => {});
        }

        handleChangeData(res);
        setResetPage(!resetPage);
        enqueueSnackbar("Cập nhật giao dịch thành công!", {
          variant: "success",
          autoHideDuration: 5000,
        });
      } else if (res.status === "existed") {
        enqueueSnackbar("Cập nhật giao dịch thất bại!", {
          variant: "error",
          autoHideDuration: 5000,
        });
      }
    });
  };

  const handleChangeTime = (data) => {
    setChoseMonth(data.month);
    setChoseYear(data.year);
  };

  const handleChangeData = (data) => {
    setDisplayHis(data.data);
    let curExpenses = 0;
    let curReceive = 0;
    for (let i = 0; i < data.data.history.length; ++i) {
      if (data.data.history[i].type === 0) {
        curExpenses += Number(data.data.history[i].money);
      } else {
        curReceive += Number(data.data.history[i].money);
      }
    }
    setTotalExpenses(curExpenses);
    setTotalReceive(curReceive);
  };

  const handleChangeDisplayDay = (data) => {
    setDisplayDay(data);
    setEndDay(data);
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
        {TIME.map((data, id) => (
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
        {createArray(getDays(choseYear, choseMonth)).map((data, id) => (
          <MenuItem
            value={1}
            onClick={() => handleChangeDisplayDay(data + 1)}
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
        <Carousel
          item={displayHis}
          handleAddTrans={handleAddTrans}
          handleDeleteTrans={handleDeleteTrans}
          handleUpdateTrans={handleUpdateTrans}
          day={displayDay}
          month={choseMonth}
          year={choseYear}
          username={username}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            width: "200px",
            marginLeft: "20px",
          }}
        >
          <Box
            sx={{
              width: "120px",
              height: "50px",
              borderRadius: "8px",
              marginTop: "10px",
              padding: "20px",
            }}
            boxShadow={4}
          >
            <Typography
              sx={{
                color: "#E32636",
                fontSize: "3vh",
                fontWeight: 800,
                fontFamily: "Montserrat",
              }}
            >
              TỔNG CHI
            </Typography>
            <Typography
              sx={{
                color: "#FFB000",
                fontSize: "2vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
              }}
            >
              {numToMoney(totalExpenses)}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "120px",
              height: "50px",
              borderRadius: "8px",
              marginTop: "10px",
              padding: "20px",
            }}
            boxShadow={4}
          >
            <Typography
              sx={{
                color: "#32de84",
                fontSize: "2.9vh",
                fontWeight: 800,
                fontFamily: "Montserrat",
              }}
            >
              TỔNG THU
            </Typography>
            <Typography
              sx={{
                color: "#FFB000",
                fontSize: "2vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
              }}
            >
              {numToMoney(totalReceive)}
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
        <TransactionsChart
          startDay={startDay}
          endDay={endDay}
          choseMonth={choseMonth}
          choseYear={choseYear}
          resetPage={resetPage}
        />
      </Box>
    </Container>
  );
};

export default TransactionsManagement;
