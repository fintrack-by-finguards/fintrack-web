import React, { useState } from "react";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { numToMoney } from "../../Functions/text";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CardMedia from "@mui/material/CardMedia";
import LinearProgress from "@mui/material/LinearProgress";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateGoalDialog from "./CreateGoalDialog";

const financialGoal = [
  {
    id: 0,
    name: "Tiết kiệm tiền đi du học",
    money: 200000000,
    time: 3,
    unit: 0,
    start: "13/03/2024",
    end: "13/03/2027",
    progress: 10000000,
    img: "https://www.edroots.com/uploads/media/education%20fair60a4b5f337460.jpg",
    type: 1,
  },
  {
    id: 1,
    name: "Mua máy tính",
    money: 15000000,
    time: 10,
    unit: 1,
    start: "15/02/2024",
    end: "15/12/2024",
    progress: 3000000,
    img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_6__17.png",
    type: 0,
  },
];

const completedGoals = [
  {
    id: 0,
    name: "Tiết kiệm tiền đi du lịch",
    money: 200000000,
    time: 3,
    unit: 0,
    end: "13/03/2024",
    img: "https://umovetravel.com/upload/images/Phong%20c%C3%A1ch%20du%20l%E1%BB%8Bch/du-lich-nghi-duong-la-gi.jpg",
    type: 1,
  },
  {
    id: 1,
    name: "Mua Ipad",
    money: 80000000,
    time: 4,
    unit: 1,
    end: "12/01/2023",
    img: "https://vtv1.mediacdn.vn/zoom/640_400/2022/10/22/gsmarena002-16664179513151637538550-crop-1666417958742447613554.jpg",
    type: 0,
  },
];

const GoalsManagement = () => {
  const theme = useTheme();

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [targetType, setTargetType] = useState(0);

  const createGoal = (name, money, time, unit, img) => {
    const d = new Date();
    let day = Number(d.getDate());
    let month = Number(d.getMonth() + 1);
    let year = Number(d.getFullYear());
    let endMonth =
      unit === 1
        ? month + time > 12
          ? month + time - 12
          : month + time
        : month;
    let endYear = unit === 0 ? year + time : Math.floor((month + time) / 12);

    let type = 0;
    if (unit === 0) {
      if (time > 3 && time < 10) {
        type = 1;
      } else if (time >= 10) {
        type = 2;
      }
    } else {
      if (time > 36 && time < 60) {
        type = 1;
      } else if (time >= 60) {
        type = 2;
      }
    }

    console.log(day);
    console.log(type);
    financialGoal.push({
      id: financialGoal.length,
      name: name,
      money: money,
      time: time,
      unit: unit,
      start:
        day < 10
          ? "0" + String(day)
          : String(day) + "/" + month < 10
          ? "0" + String(month)
          : String(month) + "/" + String(year),
      end:
        day < 10
          ? "0" + String(day)
          : String(day) + "/" + endMonth < 10
          ? "0" + String(endMonth)
          : String(endMonth) + "/" + String(endYear),
      progress: 0,
      img: img,
      type: type,
    });
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
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
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          sx={{
            color: theme.primary.main,
            fontSize: theme.primary.medium,
            fontWeight: 700,
            fontFamily: theme.primary.fontFamily,
          }}
        >
          Quản lý mục tiêu tài chính của
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
        sx={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            marginLeft: "20px",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              backgroundColor:
                targetType === 0 ? theme.primary.sub : theme.primary.greyLight,
              marginRight: "10px",
            }}
            onClick={() => setTargetType(0)}
          >
            <Typography
              sx={{
                color: theme.primary.main,
                fontSize: theme.primary.small,
                fontWeight: 700,
                fontFamily: theme.primary.fontFamily,
              }}
            >
              Tất cả
            </Typography>
          </Button>
          <Button
            sx={{
              backgroundColor:
                targetType === 1 ? theme.primary.sub : theme.primary.greyLight,
              marginRight: "10px",
            }}
            onClick={() => setTargetType(1)}
          >
            <Typography
              sx={{
                color: theme.primary.main,
                fontSize: theme.primary.small,
                fontWeight: 700,
                fontFamily: theme.primary.fontFamily,
              }}
            >
              Ngắn hạn
            </Typography>
          </Button>
          <Button
            sx={{
              backgroundColor:
                targetType === 2 ? theme.primary.sub : theme.primary.greyLight,
              marginRight: "10px",
            }}
            onClick={() => setTargetType(2)}
          >
            <Typography
              sx={{
                color: theme.primary.main,
                fontSize: theme.primary.small,
                fontWeight: 700,
                fontFamily: theme.primary.fontFamily,
              }}
            >
              Trung hạn
            </Typography>
          </Button>
          <Button
            sx={{
              backgroundColor:
                targetType === 3 ? theme.primary.sub : theme.primary.greyLight,
              marginRight: "10px",
            }}
            onClick={() => setTargetType(3)}
          >
            <Typography
              sx={{
                color: theme.primary.main,
                fontSize: theme.primary.small,
                fontWeight: 700,
                fontFamily: theme.primary.fontFamily,
              }}
            >
              Dài hạn
            </Typography>
          </Button>

          <AddCircleIcon
            sx={{
              color: theme.primary.main,
              fontSize: "35px",
            }}
            onClick={() => setOpenCreateDialog(true)}
          />
        </Box>
      </Box>
      <CreateGoalDialog
        openDialog={openCreateDialog}
        handleCloseDialog={handleCloseCreateDialog}
        createGoal={createGoal}
      />
      <Grid
        container
        sx={{ marginTop: "30px", justifyContent: "space-around" }}
      >
        {financialGoal.map((goal, idx) => (
          <Grid
            xs={5}
            boxShadow={3}
            sx={{
              height: "240px",
              backgroundColor: "white",
              borderRadius: theme.primary.borderRadius,
              display: "flex",
              position: "relative",
              marginTop: "30px",
            }}
            key={idx}
          >
            <CardMedia
              component="img"
              sx={{
                width: "200px",
                height: "240px",
                borderTopLeftRadius: theme.primary.borderRadius,
                borderBottomLeftRadius: theme.primary.borderRadius,
              }}
              image={goal.img}
              alt="Paella dish"
            />

            <Box sx={{ padding: "20px" }}>
              <Typography
                sx={{
                  color: theme.primary.main,
                  fontSize: "17px",
                  fontWeight: 700,
                  fontFamily: theme.primary.fontFamily,
                }}
                textAlign="left"
              >
                {goal.name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  marginLeft: "10px",
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                <FiberManualRecordIcon
                  sx={{
                    color: theme.primary.main,
                    fontSize: "12px",
                  }}
                />

                <Typography
                  sx={{
                    color: theme.primary.main,
                    fontSize: theme.primary.small,
                    fontWeight: 600,
                    fontFamily: theme.primary.fontFamily,
                    marginLeft: "5px",
                  }}
                >
                  Số tiền:
                </Typography>

                <Typography
                  sx={{
                    color: theme.primary.main,
                    fontSize: theme.primary.small,
                    fontWeight: 500,
                    fontFamily: theme.primary.fontFamily,
                    marginLeft: "5px",
                  }}
                >
                  {numToMoney(goal.money)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  marginLeft: "10px",
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                <FiberManualRecordIcon
                  sx={{
                    color: theme.primary.main,
                    fontSize: "12px",
                  }}
                />

                <Typography
                  sx={{
                    color: theme.primary.main,
                    fontSize: theme.primary.small,
                    fontWeight: 600,
                    fontFamily: theme.primary.fontFamily,
                    marginLeft: "5px",
                  }}
                >
                  Thời gian:
                </Typography>

                <Typography
                  sx={{
                    color: theme.primary.main,
                    fontSize: theme.primary.small,
                    fontWeight: 500,
                    fontFamily: theme.primary.fontFamily,
                    marginLeft: "5px",
                  }}
                >
                  {goal.time + " " + (goal.unit === 0 ? "năm" : "tháng")}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  marginLeft: "10px",
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                <FiberManualRecordIcon
                  sx={{
                    color: theme.primary.main,
                    fontSize: "12px",
                  }}
                />

                <Typography
                  sx={{
                    color: theme.primary.main,
                    fontSize: theme.primary.small,
                    fontWeight: 600,
                    fontFamily: theme.primary.fontFamily,
                    marginLeft: "5px",
                  }}
                >
                  Bắt đầu:
                </Typography>

                <Typography
                  sx={{
                    color: theme.primary.main,
                    fontSize: theme.primary.small,
                    fontWeight: 500,
                    fontFamily: theme.primary.fontFamily,
                    marginLeft: "5px",
                  }}
                >
                  {goal.start}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  marginLeft: "10px",
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                <FiberManualRecordIcon
                  sx={{
                    color: theme.primary.main,
                    fontSize: "12px",
                  }}
                />

                <Typography
                  sx={{
                    color: theme.primary.main,
                    fontSize: theme.primary.small,
                    fontWeight: 600,
                    fontFamily: theme.primary.fontFamily,
                    marginLeft: "5px",
                  }}
                >
                  Kết thúc:
                </Typography>

                <Typography
                  sx={{
                    color: theme.primary.main,
                    fontSize: theme.primary.small,
                    fontWeight: 500,
                    fontFamily: theme.primary.fontFamily,
                    marginLeft: "5px",
                  }}
                >
                  {goal.end}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  marginLeft: "10px",
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                <FiberManualRecordIcon
                  sx={{
                    color: theme.primary.main,
                    fontSize: "12px",
                  }}
                />

                <Typography
                  sx={{
                    color: theme.primary.main,
                    fontSize: theme.primary.small,
                    fontWeight: 600,
                    fontFamily: theme.primary.fontFamily,
                    marginLeft: "5px",
                  }}
                >
                  Tiến độ:
                </Typography>

                <Typography
                  sx={{
                    color: theme.primary.sub,
                    fontSize: theme.primary.small,
                    fontWeight: 600,
                    fontFamily: theme.primary.fontFamily,
                    marginLeft: "5px",
                  }}
                >
                  {numToMoney(goal.progress)}
                </Typography>
              </Box>

              <Box
                sx={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <LinearProgress
                  variant="determinate"
                  value={(goal.progress / goal.money) * 100}
                  sx={{
                    height: "5px",
                    borderRadius: theme.primary.borderRadius,
                    color: theme.primary.sub,
                    width: "200px",
                  }}
                />

                <Typography
                  sx={{
                    color: theme.primary.main,
                    fontSize: theme.primary.small,
                    fontWeight: 600,
                    fontFamily: theme.primary.fontFamily,
                    marginLeft: "5px",
                  }}
                >
                  {(goal.progress / goal.money) * 100 + "%"}
                </Typography>
              </Box>

              <Box sx={{ position: "absolute", top: -15, right: -20 }}>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: theme.primary.small,
                    fontWeight: 600,
                    fontFamily: theme.primary.fontFamily,
                    marginLeft: "5px",
                    width: "100px",
                    backgroundColor:
                      goal.type === 0
                        ? "#EE4B2B"
                        : goal.type === 1
                        ? "#ffa726"
                        : "#458933",
                    padding: "5px",
                    borderRadius: theme.primary.borderRadius,
                  }}
                >
                  {goal.type === 0
                    ? "Ngắn hạn"
                    : goal.type === 1
                    ? "Trung hạn"
                    : "Dài hạn"}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  height: "100%",
                  justifyContent: "end",
                  marginTop: "5px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: theme.primary.fontFamily,
                    fontWeight: "400",
                    fontSize: "11px",
                    marginLeft: "5px",
                    marginBottom: "10px",
                    fontStyle: "italic",
                    "&:hover": theme.primary.hoverDefault,
                    [theme.breakpoints.down("md")]: {
                      fontSize: theme.primary.medium,
                    },
                  }}
                  textAlign="left"
                >
                  {"Chi tiết"}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
        {financialGoal.length % 2 === 1 ? <Grid xs={5} /> : ""}
      </Grid>

      <Box
        sx={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: theme.primary.small,
            fontWeight: 600,
            fontFamily: theme.primary.fontFamily,
            backgroundColor: theme.primary.main,
            padding: "5px",
            width: "80px",
            borderRadius: "5px",
            marginLeft: "5px",
            marginTop: "10px",
          }}
        >
          LỊCH SỬ
        </Typography>
      </Box>

      <Grid
        container
        sx={{ marginTop: "10px", justifyContent: "space-around" }}
      >
        {completedGoals.map((goal, idx) => (
          <Grid
            xs={5}
            boxShadow={3}
            sx={{
              height: "160px",
              backgroundColor: "white",
              borderRadius: theme.primary.borderRadius,
              display: "flex",
              position: "relative",
              marginTop: "30px",
            }}
            key={idx}
          >
            <CardMedia
              component="img"
              sx={{
                width: "200px",
                height: "160px",
                borderTopLeftRadius: theme.primary.borderRadius,
                borderBottomLeftRadius: theme.primary.borderRadius,
              }}
              image={goal.img}
              alt="Paella dish"
            />

            <Box sx={{ padding: "20px" }}>
              <Typography
                sx={{
                  color: theme.primary.main,
                  fontSize: "17px",
                  fontWeight: 700,
                  fontFamily: theme.primary.fontFamily,
                }}
                textAlign="left"
              >
                {goal.name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  marginLeft: "10px",
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                <FiberManualRecordIcon
                  sx={{
                    color: theme.primary.main,
                    fontSize: "12px",
                  }}
                />

                <Typography
                  sx={{
                    color: theme.primary.main,
                    fontSize: theme.primary.small,
                    fontWeight: 600,
                    fontFamily: theme.primary.fontFamily,
                    marginLeft: "5px",
                  }}
                >
                  Số tiền:
                </Typography>

                <Typography
                  sx={{
                    color: theme.primary.main,
                    fontSize: theme.primary.small,
                    fontWeight: 500,
                    fontFamily: theme.primary.fontFamily,
                    marginLeft: "5px",
                  }}
                >
                  {numToMoney(goal.money)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  marginLeft: "10px",
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                <FiberManualRecordIcon
                  sx={{
                    color: theme.primary.main,
                    fontSize: "12px",
                  }}
                />

                <Typography
                  sx={{
                    color: theme.primary.main,
                    fontSize: theme.primary.small,
                    fontWeight: 600,
                    fontFamily: theme.primary.fontFamily,
                    marginLeft: "5px",
                  }}
                >
                  Thời gian:
                </Typography>

                <Typography
                  sx={{
                    color: theme.primary.main,
                    fontSize: theme.primary.small,
                    fontWeight: 500,
                    fontFamily: theme.primary.fontFamily,
                    marginLeft: "5px",
                  }}
                >
                  {goal.time + " " + (goal.unit === 0 ? "năm" : "tháng")}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  marginLeft: "10px",
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                <FiberManualRecordIcon
                  sx={{
                    color: theme.primary.main,
                    fontSize: "12px",
                  }}
                />

                <Typography
                  sx={{
                    color: theme.primary.main,
                    fontSize: theme.primary.small,
                    fontWeight: 600,
                    fontFamily: theme.primary.fontFamily,
                    marginLeft: "5px",
                  }}
                >
                  Kết thúc:
                </Typography>

                <Typography
                  sx={{
                    color: theme.primary.main,
                    fontSize: theme.primary.small,
                    fontWeight: 500,
                    fontFamily: theme.primary.fontFamily,
                    marginLeft: "5px",
                  }}
                >
                  {goal.end}
                </Typography>
              </Box>

              <Box sx={{ position: "absolute", bottom: -15, right: -20 }}>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: theme.primary.small,
                    fontWeight: 600,
                    fontFamily: theme.primary.fontFamily,
                    marginLeft: "5px",
                    width: "100px",
                    backgroundColor: goal.type === 0 ? "#EE4B2B" : "#458933",
                    padding: "5px",
                    borderRadius: theme.primary.borderRadius,
                  }}
                >
                  {goal.type === 0 ? "Thất bại" : "Thành công"}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  height: "100%",
                  justifyContent: "end",
                  marginTop: "5px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: theme.primary.fontFamily,
                    fontWeight: "400",
                    fontSize: "11px",
                    marginLeft: "5px",
                    marginBottom: "10px",
                    fontStyle: "italic",
                    "&:hover": theme.primary.hoverDefault,
                    [theme.breakpoints.down("md")]: {
                      fontSize: theme.primary.medium,
                    },
                  }}
                  textAlign="left"
                >
                  {"Chi tiết"}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
        {financialGoal.length % 2 === 1 ? <Grid xs={5} /> : ""}
      </Grid>
    </Container>
  );
};

export default GoalsManagement;
