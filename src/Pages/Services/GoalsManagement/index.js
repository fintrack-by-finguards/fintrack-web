import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { numToMoney, toDay, getEndDay } from "../../Functions/text";
import { postApi } from "../../../others/database";
import { GlobalContext } from "../../../context/GlobalState";
import { SERVER, TIME } from "../../../constant";
import { useSnackbar } from "notistack";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CardMedia from "@mui/material/CardMedia";
import LinearProgress from "@mui/material/LinearProgress";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateGoalDialog from "./CreateGoalDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import DeleteGoalDialog from "../GoalsManagement/DeleteGoalDialog";
import UpdateGoalDialog from "../GoalsManagement/UpdateGoalDialog";
import GoalInDetail from "./GoalInDetail";
import WarningIcon from "@mui/icons-material/Warning";

const GoalsManagement = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const { username } = useContext(GlobalContext);

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [choseGoalId, setChoseGoalId] = useState("");

  const [resetPage, setResetPage] = useState(false);
  const [filterGoal, setFilterGoal] = useState(null);

  const [goalData, setGoalData] = useState({ data: [] });

  const handleOpenDelete = (goalId) => {
    setChoseGoalId(goalId);
    setOpenDelete(true);
  };

  const handleOpenUpdate = (goalId) => {
    setChoseGoalId(goalId);
    setOpenUpdate(true);
  };

  const handleOpenDetails = (goalId) => {
    setChoseGoalId(goalId);
    setOpenDetail(true);
  };

  useEffect(() => {
    postApi(
      {
        username: username,
      },
      `${SERVER}/goals/get`
    ).then((res) => {
      if (res.status === "success") {
        if (filterGoal !== null) {
          let filteredRes = res.data.filter((goal) => goal.type === filterGoal);
          setGoalData({ data: filteredRes });
        } else {
          setGoalData(res);
        }
      }
    });
  }, [resetPage, filterGoal]);

  const createGoal = (name, money, time, unit, img) => {
    const d = new Date();
    let day = Number(d.getDate());
    let month = Number(d.getMonth() + 1);
    let year = Number(d.getFullYear());

    let type = 0;
    if (unit === 0) {
      if (time >= 3 && time < 10) {
        type = 1;
      } else if (time >= 10) {
        type = 2;
      }
    } else {
      if (time >= 36 && time < 60) {
        type = 1;
      } else if (time >= 60) {
        type = 2;
      }
    }

    postApi(
      {
        username: username,
        day: Number(day),
        month: Number(month),
        year: Number(year),
        name: name,
        money: money,
        time: time,
        unit: unit,
        img: img,
        type: type,
      },
      `${SERVER}/goals/add`
    )
      .then((res) => {
        if (res.status === "success") {
          console.log(res);
          setResetPage(!resetPage);
          enqueueSnackbar("Tạo mục tiêu thành công!", {
            variant: "success",
            autoHideDuration: 5000,
          });
        } else {
          enqueueSnackbar("Tạo mục tiêu thất bại!", {
            variant: "error",
            autoHideDuration: 5000,
          });
        }
      })
      .catch((error) => {
        enqueueSnackbar("Tạo mục tiêu thất bại!", {
          variant: "error",
          autoHideDuration: 5000,
        });
      });
  };

  const handleUpdateGoal = (
    goal_id,
    new_day,
    new_month,
    new_year,
    new_name,
    new_money,
    new_time,
    new_unit,
    new_img
  ) => {
    let day = new_day;
    let month = new_month;
    let year = new_year;

    let type = 0;
    if (new_unit === 0) {
      if (new_time > 3 && new_time < 10) {
        type = 1;
      } else if (new_time >= 10) {
        type = 2;
      }
    } else {
      if (new_time > 36 && new_time < 60) {
        type = 1;
      } else if (new_time >= 60) {
        type = 2;
      }
    }

    postApi(
      {
        username: username,
        id: goal_id,
        day: Number(day),
        month: Number(month),
        year: Number(year),
        name: new_name,
        money: new_money,
        time: new_time,
        unit: new_unit,
        img: new_img,
        type: type,
      },
      `${SERVER}/goals/update`
    )
      .then((res) => {
        if (res.status === "success") {
          console.log(res);
          setResetPage(!resetPage);
          enqueueSnackbar("Chỉnh sửa mục tiêu thành công!", {
            variant: "success",
            autoHideDuration: 5000,
          });
        } else {
          enqueueSnackbar("Chỉnh sửa mục tiêu thất bại!", {
            variant: "error",
            autoHideDuration: 5000,
          });
        }
      })
      .catch((error) => {
        enqueueSnackbar("Chỉnh sửa mục tiêu thất bại!", {
          variant: "error",
          autoHideDuration: 5000,
        });
      });
  };

  const handleDeleteGoal = (id) => {
    postApi(
      {
        username: username,
        id: id,
      },
      `${SERVER}/goals/delete`
    )
      .then((res) => {
        if (res.status === "success") {
          console.log(res);
          setResetPage(!resetPage);
          enqueueSnackbar("Xoá mục tiêu thành công!", {
            variant: "success",
            autoHideDuration: 5000,
          });
        } else {
          enqueueSnackbar("Xoá mục tiêu thất bại!", {
            variant: "error",
            autoHideDuration: 5000,
          });
        }
      })
      .catch((error) => {
        enqueueSnackbar("Xoá mục tiêu thất bại!", {
          variant: "error",
          autoHideDuration: 5000,
        });
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
                filterGoal === null
                  ? theme.primary.sub
                  : theme.primary.greyLight,
              marginRight: "10px",
            }}
            onClick={() => setFilterGoal(null)}
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
                filterGoal === 0 ? theme.primary.sub : theme.primary.greyLight,
              marginRight: "10px",
            }}
            onClick={() => setFilterGoal(0)}
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
                filterGoal === 1 ? theme.primary.sub : theme.primary.greyLight,
              marginRight: "10px",
            }}
            onClick={() => setFilterGoal(1)}
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
                filterGoal === 2 ? theme.primary.sub : theme.primary.greyLight,
              marginRight: "10px",
            }}
            onClick={() => setFilterGoal(2)}
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
        {goalData.data.map((goal, idx) => (
          <Grid
            xs={5}
            boxShadow={3}
            sx={{
              height: "260px",
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
                height: "260px",
                borderTopLeftRadius: theme.primary.borderRadius,
                borderBottomLeftRadius: theme.primary.borderRadius,
              }}
              image={goal.img}
              alt="Paella dish"
            />
            <Box sx={{ padding: "20px", marginTop: "10px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
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
                    alignItems: "center",
                    width: "50px",
                  }}
                >
                  <DeleteIcon
                    sx={{ color: "grey" }}
                    onClick={() => handleOpenDelete(goal._id)}
                  />
                  <DeleteGoalDialog
                    openDialog={openDelete && goal._id === choseGoalId}
                    handleCloseDialog={() => setOpenDelete(false)}
                    handleDeleteGoal={handleDeleteGoal}
                    data={goal}
                  />
                  <ChangeCircleIcon
                    sx={{ color: "grey", marginLeft: "5px" }}
                    onClick={() => handleOpenUpdate(goal._id)}
                  />
                  <UpdateGoalDialog
                    openDialog={openUpdate && goal._id === choseGoalId}
                    handleCloseDialog={() => setOpenUpdate(false)}
                    handleUpdateGoal={handleUpdateGoal}
                    data={goal}
                  />
                </Box>
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
                  {toDay(goal.day, goal.month, goal.year)}
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
                  {getEndDay(
                    goal.day,
                    goal.month,
                    goal.year,
                    goal.unit,
                    goal.time
                  )}
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
                <Button
                  sx={{
                    width: "100px",
                    backgroundColor: theme.primary.sub,
                    height: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "5px",
                  }}
                  onClick={() => handleOpenDetails(goal._id)}
                >
                  <Typography
                    sx={{
                      fontFamily: theme.primary.fontFamily,
                      fontWeight: "600",
                      fontSize: "11px",
                      fontStyle: "italic",
                      "&:hover": theme.primary.hoverDefault,
                      [theme.breakpoints.down("md")]: {
                        fontSize: theme.primary.medium,
                      },
                      color: theme.primary.main,
                    }}
                    textAlign="left"
                  >
                    {"Chi tiết"}
                  </Typography>
                </Button>
                <GoalInDetail
                  openDialog={openDetail && goal._id === choseGoalId}
                  goal={goal}
                  handleCloseDialog={() => setOpenDetail(false)}
                />
              </Box>
            </Box>
          </Grid>
        ))}
        {goalData.data.length % 2 === 1 ? <Grid xs={5} /> : ""}
        {goalData.data.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <WarningIcon
              sx={{ color: "#192841", fontSize: "100px", marginTop: "30px" }}
            />
            <Typography
              sx={{
                color: "#192841",
                fontSize: "2.5vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
              }}
            >
              Không có dữ liệu!
            </Typography>
          </Box>
        ) : (
          ""
        )}
      </Grid>
    </Container>
  );
};

export default GoalsManagement;
