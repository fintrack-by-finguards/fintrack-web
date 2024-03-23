import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import { SERVER } from "../../../../constant/index";
import { postApi } from "../../../../others/database";
import NumberInput from "../../../../Components/NumberInput";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

import { getCurrentTime, inputMoneyToNum } from "../../../Functions/text";
import {
  EXPENSESCATEGORIES,
  RECEIVECATEGORIES,
} from "../../../../constant/index";

const AddTransactionDialog = ({
  openDialog,
  handleCloseDialog,
  handleAddTrans,
}) => {
  const theme = useTheme();
  const { username } = useContext(GlobalContext);

  const [tranName, setTranName] = useState("");
  const [tranMoney, setTranMoney] = useState(0);
  const [tranCate1, setTranCate1] = useState(0);
  const [tranCate2, setTranCate2] = useState(0);
  const [tranHour, setTranHour] = useState(0);
  const [tranMinute, setTranMinute] = useState(0);
  const [tranSecond, setTranSecond] = useState(0);
  const [tranType, setTranType] = useState(0);
  const [tranMoneyType, setTranMoneyType] = useState(0);
  const [tranSaving, setTranSaving] = useState(0);

  const [savingData, setSavingData] = useState([]);

  useEffect(() => {
    postApi(
      {
        username: username,
      },
      `${SERVER}/goals/get`
    ).then((res) => {
      if (res.status === "success") {
        setSavingData(res.data);
      }
    });
  }, []);

  const handleClose = () => {
    handleCloseDialog();
    setTranName("");
    setTranMoney(0);
    setTranCate1(0);
    setTranCate2(0);
    setTranType(0);
  };

  const submit = () => {
    let finalTranCate2 =
      Object.keys(EXPENSESCATEGORIES)[tranCate1] === "Tiết kiệm" ||
      Object.keys(EXPENSESCATEGORIES)[tranCate1] === "Giáo dục" ||
      Object.keys(EXPENSESCATEGORIES)[tranCate1] === "Giải thưởng" ||
      Object.keys(EXPENSESCATEGORIES)[tranCate1] === "Tiền lãi" ||
      Object.keys(EXPENSESCATEGORIES)[tranCate1] === "Tiền lương" ||
      Object.keys(EXPENSESCATEGORIES)[tranCate1] === "Quà tặng" ||
      Object.keys(EXPENSESCATEGORIES)[tranCate1] === "Bán đồ" ||
      Object.keys(EXPENSESCATEGORIES)[tranCate1] === "Thu khác"
        ? ""
        : EXPENSESCATEGORIES[Object.keys(EXPENSESCATEGORIES)[tranCate1]][
            tranCate2
          ];

    if (tranType === 0) {
      handleAddTrans(
        tranName,
        Object.keys(EXPENSESCATEGORIES)[tranCate1],
        finalTranCate2,
        inputMoneyToNum(tranMoney),
        tranHour,
        tranMinute,
        tranSecond,
        tranType,
        tranMoneyType,
        Object.keys(EXPENSESCATEGORIES)[tranCate1] === "Tiết kiệm" &&
          savingData.length > 0
          ? savingData[tranSaving]._id
          : ""
      );
    } else {
      handleAddTrans(
        tranName,
        RECEIVECATEGORIES[tranCate1],
        "",
        inputMoneyToNum(tranMoney),
        tranHour,
        tranMinute,
        tranSecond,
        tranType,
        tranMoneyType,
        Object.keys(EXPENSESCATEGORIES)[tranCate1] === "Tiết kiệm" &&
          savingData.length > 0
          ? savingData[tranSaving]._id
          : ""
      );
    }

    handleClose();
  };

  useEffect(() => {
    let timeObject = getCurrentTime();
    setTranHour(timeObject.hour);
    setTranMinute(timeObject.minute);
    setTranSecond(timeObject.second);
  }, [openDialog]);

  return (
    <Dialog
      onClose={handleClose}
      open={openDialog}
      PaperProps={{
        sx: {
          width: "520px",
          height: "570px",
          padding: "30px",
          [theme.breakpoints.down("md")]: {
            width: "95%",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          color: theme.primary.main,
          fontSize: theme.primary.medium,
          fontWeight: 700,
          fontFamily: theme.primary.fontFamily,
          [theme.breakpoints.down("md")]: {
            fontSize: "2vh",
          },
        }}
        textAlign="center"
      >
        Thêm giao dịch trong ngày
      </DialogTitle>
      <Box sx={{ marginTop: "10px" }}>
        <Typography
          sx={{
            fontSize: theme.primary.small,
            color: theme.primary.main,
            fontFamily: theme.primary.fontFamily,
            fontWeight: 500,
            marginBottom: "5px",
            [theme.breakpoints.down("md")]: {
              fontSize: "2vh",
            },
            "&:hover": theme.primary.hoverDefault,
          }}
          textAlign="left"
        >
          Phân loại giao dịch
        </Typography>
        <FormControl sx={{ minWidth: 60, height: "40px" }}>
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            value={tranType}
            onChange={(e) => setTranType(e.target.value)}
            sx={{
              backgroundColor: "white",
              width: "100%",
              height: "40px",
              borderRadius: theme.primary.borderRadius,
              [theme.breakpoints.down("md")]: {
                fontSize: "2vh",
              },
            }}
            MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
          >
            <MenuItem
              value={0}
              sx={{
                [theme.breakpoints.down("md")]: {
                  fontSize: "2vh",
                },
              }}
            >
              Giao dịch chi
            </MenuItem>
            <MenuItem
              value={1}
              sx={{
                [theme.breakpoints.down("md")]: {
                  fontSize: "2vh",
                },
              }}
            >
              Giao dịch thu
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ marginTop: "10px" }}>
        <Typography
          sx={{
            fontSize: theme.primary.small,
            color: theme.primary.main,
            fontFamily: theme.primary.fontFamily,
            fontWeight: 500,
            marginBottom: "5px",
            [theme.breakpoints.down("md")]: {
              fontSize: "2vh",
            },
            "&:hover": theme.primary.hoverDefault,
          }}
          textAlign="left"
        >
          Tên khoản giao dịch
        </Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={tranName}
          onChange={(e) => setTranName(e.target.value)}
          sx={{
            backgroundColor: "white",
            width: "100%",
            marginRight: "10px",
            borderRadius: theme.primary.borderRadius,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: theme.primary.borderRadius,
                fontFamily: theme.primary.fontFamily,
              },
              "&.Mui-focused fieldset": {
                border: `3px solid ${theme.primary.sub}`,
                color: theme.primary.sub,
              },
            },
          }}
          InputLabelProps={{ shrink: false, style: { fontSize: 0 } }}
          inputProps={{
            style: {
              height: "7px",
            },
          }}
        />
      </Box>

      <Box sx={{ marginTop: "10px" }}>
        <Typography
          sx={{
            fontSize: theme.primary.small,
            color: theme.primary.main,
            fontFamily: theme.primary.fontFamily,
            fontWeight: 500,
            marginBottom: "5px",
            [theme.breakpoints.down("md")]: {
              fontSize: "2vh",
            },
            "&:hover": theme.primary.hoverDefault,
          }}
          textAlign="left"
        >
          Số tiền
        </Typography>
        <NumberInput value={tranMoney} onChange={setTranMoney} />
      </Box>

      {tranType === 0 ? (
        <Box
          sx={{
            marginTop: "10px",
            [theme.breakpoints.down("md")]: {
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: theme.primary.small,
              color: theme.primary.main,
              fontFamily: theme.primary.fontFamily,
              fontWeight: 500,
              marginBottom: "5px",
              [theme.breakpoints.down("md")]: {
                fontSize: "2vh",
              },
              "&:hover": theme.primary.hoverDefault,
            }}
            textAlign="left"
          >
            Phân loại chi tiêu
          </Typography>
          <FormControl sx={{ minWidth: 60, height: "40px" }}>
            <Select
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={tranCate1}
              onChange={(e) => setTranCate1(e.target.value)}
              sx={{
                backgroundColor: "white",
                width: "100%",
                height: "40px",
                borderRadius: theme.primary.borderRadius,
                [theme.breakpoints.down("md")]: {
                  fontSize: "2vh",
                },
              }}
              MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
            >
              <MenuItem
                value={0}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                  },
                }}
              >
                Chi tiêu cần thiết
              </MenuItem>
              <MenuItem
                value={1}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                  },
                }}
              >
                Tiết kiệm
              </MenuItem>
              <MenuItem
                value={2}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                  },
                }}
              >
                Giáo dục
              </MenuItem>
              <MenuItem
                value={3}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                  },
                }}
              >
                Hưởng thụ
              </MenuItem>
              <MenuItem
                value={4}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                  },
                }}
              >
                Tự do tài chính
              </MenuItem>
              <MenuItem
                value={5}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                  },
                }}
              >
                Quà và từ thiện
              </MenuItem>
              <MenuItem
                value={6}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                  },
                }}
              >
                Trả nợ
              </MenuItem>
            </Select>
          </FormControl>

          {tranCate1 === 0 ? (
            <FormControl sx={{ minWidth: 60, height: "40px" }}>
              <Select
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                value={tranCate2}
                onChange={(e) => setTranCate2(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "40px",
                  borderRadius: theme.primary.borderRadius,
                  marginLeft: "15px",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                    marginLeft: "0px",
                    marginTop: "10px",
                  },
                }}
                MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
              >
                <MenuItem
                  value={0}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Ăn uống
                </MenuItem>
                <MenuItem
                  value={1}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Hoá đơn
                </MenuItem>
                <MenuItem
                  value={2}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Đi lại
                </MenuItem>
                <MenuItem
                  value={3}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Tiền nhà
                </MenuItem>
                <MenuItem
                  value={4}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Sức khoẻ
                </MenuItem>
                <MenuItem
                  value={5}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Gia đình
                </MenuItem>
              </Select>
            </FormControl>
          ) : (
            ""
          )}

          {tranCate1 === 1 ? (
            <FormControl sx={{ minWidth: 60, height: "40px" }}>
              <Select
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                value={tranSaving}
                onChange={(e) => setTranSaving(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "40px",
                  borderRadius: theme.primary.borderRadius,
                  marginLeft: "15px",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                    marginLeft: "0px",
                    marginTop: "10px",
                  },
                }}
                MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
              >
                {savingData.map((saving, idx) => (
                  <MenuItem
                    value={idx}
                    key={idx}
                    sx={{
                      [theme.breakpoints.down("md")]: {
                        fontSize: "2vh",
                      },
                    }}
                  >
                    {saving.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            ""
          )}

          {tranCate1 === 3 ? (
            <FormControl sx={{ minWidth: 60, height: "40px" }}>
              <Select
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                value={tranCate2}
                onChange={(e) => setTranCate2(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "40px",
                  borderRadius: theme.primary.borderRadius,
                  marginLeft: "15px",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                    marginLeft: "0px",
                    marginTop: "10px",
                  },
                }}
                MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
              >
                <MenuItem
                  value={0}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Mua sắm
                </MenuItem>
                <MenuItem
                  value={1}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Xem phim
                </MenuItem>
                <MenuItem
                  value={2}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Trò chơi
                </MenuItem>
                <MenuItem
                  value={3}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Nhà hàng
                </MenuItem>
              </Select>
            </FormControl>
          ) : (
            ""
          )}

          {tranCate1 === 4 ? (
            <FormControl sx={{ minWidth: 60, height: "40px" }}>
              <Select
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                value={tranCate2}
                onChange={(e) => setTranCate2(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "40px",
                  borderRadius: theme.primary.borderRadius,
                  marginLeft: "15px",
                }}
                MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
              >
                <MenuItem
                  value={0}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Bảo hiểm
                </MenuItem>
                <MenuItem
                  value={1}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Tiết kiệm hưu trí
                </MenuItem>
                <MenuItem
                  value={2}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Đầu tư
                </MenuItem>
                <MenuItem
                  value={3}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Bất động sản
                </MenuItem>
              </Select>
            </FormControl>
          ) : (
            ""
          )}

          {tranCate1 === 5 ? (
            <FormControl sx={{ minWidth: 60, height: "40px" }}>
              <Select
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                value={tranCate2}
                onChange={(e) => setTranCate2(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "40px",
                  borderRadius: theme.primary.borderRadius,
                  marginLeft: "15px",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                    marginLeft: "0px",
                    marginTop: "10px",
                  },
                }}
                MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
              >
                <MenuItem
                  value={0}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Từ thiện
                </MenuItem>
                <MenuItem
                  value={1}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Quà lễ
                </MenuItem>
              </Select>
            </FormControl>
          ) : (
            ""
          )}

          {tranCate1 === 6 ? (
            <FormControl sx={{ minWidth: 60, height: "40px" }}>
              <Select
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                value={tranCate2}
                onChange={(e) => setTranCate2(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "40px",
                  borderRadius: theme.primary.borderRadius,
                  marginLeft: "15px",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                    marginLeft: "0px",
                    marginTop: "10px",
                  },
                }}
                MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
              >
                <MenuItem
                  value={0}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Tiền mặt
                </MenuItem>
                <MenuItem
                  value={1}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Trả góp
                </MenuItem>
                <MenuItem
                  value={2}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Thế chấp
                </MenuItem>
                <MenuItem
                  value={3}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "2vh",
                    },
                  }}
                >
                  Thấu chi
                </MenuItem>
              </Select>
            </FormControl>
          ) : (
            ""
          )}
        </Box>
      ) : (
        <Box sx={{ marginTop: "10px" }}>
          <Typography
            sx={{
              fontSize: theme.primary.small,
              color: theme.primary.main,
              fontFamily: theme.primary.fontFamily,
              fontWeight: 500,
              marginBottom: "5px",
              [theme.breakpoints.down("md")]: {
                fontSize: "2vh",
              },
              "&:hover": theme.primary.hoverDefault,
            }}
            textAlign="left"
          >
            Phân loại nguồn thu
          </Typography>
          <FormControl sx={{ minWidth: 60, height: "40px" }}>
            <Select
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={tranCate1}
              onChange={(e) => setTranCate1(e.target.value)}
              sx={{
                backgroundColor: "white",
                width: "100%",
                height: "40px",
                borderRadius: theme.primary.borderRadius,
              }}
              MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
            >
              <MenuItem
                value={0}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                  },
                }}
              >
                Giải thưởng
              </MenuItem>
              <MenuItem
                value={1}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                  },
                }}
              >
                Tiền lãi
              </MenuItem>
              <MenuItem
                value={2}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                  },
                }}
              >
                Tiền lương
              </MenuItem>
              <MenuItem
                value={3}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                  },
                }}
              >
                Quà tặng
              </MenuItem>
              <MenuItem
                value={4}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                  },
                }}
              >
                Bán đồ
              </MenuItem>
              <MenuItem
                value={5}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                  },
                }}
              >
                Vay nợ
              </MenuItem>
              <MenuItem
                value={6}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                  },
                }}
              >
                Nguồn thu khác
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
      <Box sx={{ marginTop: "10px" }}>
        <Typography
          sx={{
            fontSize: theme.primary.small,
            color: theme.primary.main,
            fontFamily: theme.primary.fontFamily,
            fontWeight: 500,
            marginBottom: "5px",
            [theme.breakpoints.down("md")]: {
              fontSize: "2vh",
              marginTop: "10px",
            },
            "&:hover": theme.primary.hoverDefault,
          }}
          textAlign="left"
        >
          Thời gian
        </Typography>
        <Box>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={tranHour}
            onChange={(e) => setTranHour(e.target.value)}
            sx={{
              backgroundColor: "white",
              width: "15%",
              marginRight: "10px",
              borderRadius: theme.primary.borderRadius,
              [theme.breakpoints.down("md")]: {
                fontSize: "2vh",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: theme.primary.borderRadius,
                  fontFamily: theme.primary.fontFamily,
                },
                "&.Mui-focused fieldset": {
                  border: `3px solid ${theme.primary.sub}`,
                  color: theme.primary.sub,
                },
              },
            }}
            InputLabelProps={{ shrink: false, style: { fontSize: 0 } }}
            inputProps={{
              style: {
                height: "7px",
              },
            }}
          />

          <TextField
            id="outlined-basic"
            variant="outlined"
            value={tranMinute}
            onChange={(e) => setTranMinute(e.target.value)}
            sx={{
              backgroundColor: "white",
              width: "15%",
              marginRight: "10px",
              borderRadius: theme.primary.borderRadius,
              [theme.breakpoints.down("md")]: {
                fontSize: "2vh",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: theme.primary.borderRadius,
                  fontFamily: theme.primary.fontFamily,
                },
                "&.Mui-focused fieldset": {
                  border: `3px solid ${theme.primary.sub}`,
                  color: theme.primary.sub,
                },
              },
            }}
            InputLabelProps={{ shrink: false, style: { fontSize: 0 } }}
            inputProps={{
              style: {
                height: "7px",
              },
            }}
          />

          <TextField
            id="outlined-basic"
            variant="outlined"
            value={tranSecond}
            onChange={(e) => setTranSecond(e.target.value)}
            sx={{
              backgroundColor: "white",
              width: "15%",
              marginRight: "10px",
              borderRadius: theme.primary.borderRadius,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: theme.primary.borderRadius,
                  fontFamily: theme.primary.fontFamily,
                },
                "&.Mui-focused fieldset": {
                  border: `3px solid ${theme.primary.sub}`,
                  color: theme.primary.sub,
                },
              },
            }}
            InputLabelProps={{ shrink: false, style: { fontSize: 0 } }}
            inputProps={{
              style: {
                height: "7px",
              },
            }}
          />
        </Box>
      </Box>
      <Box sx={{ marginTop: "10px" }}>
        <Typography
          sx={{
            fontSize: theme.primary.small,
            color: theme.primary.main,
            fontFamily: theme.primary.fontFamily,
            fontWeight: 500,
            marginBottom: "5px",
            [theme.breakpoints.down("md")]: {
              fontSize: "2vh",
            },
            "&:hover": theme.primary.hoverDefault,
          }}
          textAlign="left"
        >
          Dạng tiền
        </Typography>
        <FormControl sx={{ minWidth: 60, height: "40px" }}>
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            value={tranMoneyType}
            onChange={(e) => setTranMoneyType(e.target.value)}
            sx={{
              backgroundColor: "white",
              width: "100%",
              height: "40px",
              borderRadius: theme.primary.borderRadius,
              [theme.breakpoints.down("md")]: {
                fontSize: "2vh",
              },
            }}
            MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
          >
            <MenuItem
              value={0}
              sx={{
                [theme.breakpoints.down("md")]: {
                  fontSize: "2vh",
                },
              }}
            >
              Tiền mặt
            </MenuItem>
            <MenuItem
              value={1}
              sx={{
                [theme.breakpoints.down("md")]: {
                  fontSize: "2vh",
                },
              }}
            >
              Tiền gửi ngân hàng
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button
        sx={{
          backgroundColor: theme.primary.sub,
          marginRight: "10px",
          display: "block",
          margin: "0 auto",
          marginTop: "20px",
        }}
        onClick={submit}
      >
        <Typography
          sx={{
            fontSize: theme.primary.small,
            color: theme.primary.main,
            fontFamily: theme.primary.fontFamily,
            fontWeight: 600,
            [theme.breakpoints.down("md")]: {
              fontSize: "2vh",
            },
            "&:hover": theme.primary.hoverDefault,
          }}
        >
          Thêm giao dịch
        </Typography>
      </Button>
    </Dialog>
  );
};

export default AddTransactionDialog;
