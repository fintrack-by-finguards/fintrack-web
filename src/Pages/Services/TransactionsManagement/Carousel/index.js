import React, { useState, useEffect } from "react";
import { Grid, Paper, Box, Typography, Button } from "@mui/material";
import { numToMoney } from "../../../Functions/text";
import { CATEICON } from "../../../../constant";
import AddTransactionDialog from "../AddTransactionDialog";
import DeleteTransactionDialog from "../DeleteTransactionDialog";
import UpdateTransactionDialog from "../UpdateTransactionDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import "./Carousel.css"; // Make sure this is correctly linked to your CSS file
import WarningIcon from "@mui/icons-material/Warning";
import { useTheme } from "@mui/material/styles";

const Carousel = ({
  item,
  handleAddTrans,
  handleDeleteTrans,
  handleUpdateTrans,
  day,
  month,
  year,
}) => {
  const theme = useTheme();
  const time = { day: day, month: month, year: year };
  const [openAddTransactionDialog, setOpenAddTransactionDialog] =
    useState(false);

  const [openDeleteTransactionDialog, setOpenDeleteTransactionDialog] =
    useState(false);

  const [openUpdateTransactionDialog, setOpenUpdateTransactionDialog] =
    useState(false);

  const [choseTransactionId, setChoseTransactionId] = useState("");

  const handleOpenDeleteDialog = (tran_id) => {
    setChoseTransactionId(tran_id);
    setOpenDeleteTransactionDialog(true);
  };

  const handleOpenUpdateDialog = (tran_id) => {
    setChoseTransactionId(tran_id);
    setOpenUpdateTransactionDialog(true);
  };

  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  return (
    <Box
      container
      sx={{
        marginLeft: "20px",
        [theme.breakpoints.down("md")]: {
          marginLeft: 0,
        },
      }}
    >
      <Grid
        sx={{
          paddingBottom: "20px",
          width: "650px",
          [theme.breakpoints.down("md")]: {
            width: "90%",
            display: "block",
            margin: "0 auto",
          },
        }}
      >
        <Paper
          elevation={4}
          sx={{
            height: "400px",
            backgroundColor: "white",
            marginTop: "10px",
            borderRadius: "8px",
            width: "650px",
            [theme.breakpoints.down("md")]: {
              width: "100%",
              display: "block",
              margin: "0 auto",
            },
          }}
          boxShadow={4}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <Typography
              sx={{
                color: "#192841",
                fontSize: "2.5vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
                marginLeft: "40px",
                marginTop: "20px",
                float: "right",
                [theme.breakpoints.down("md")]: {
                  fontSize: "1.7vh",
                  marginLeft: "10px",
                  marginTop: "10px",
                },
              }}
            >
              Số giao dịch trong ngày: {item.history.length}
            </Typography>
            <Box
              sx={{
                backgroundColor: "#192841",
                width: "100px",
                padding: "5px",
                borderTopRightRadius: "8px",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "2vh",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "1.7vh",
                  },
                }}
              >
                Ngày {item.day}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              overflow: "hidden",
              overflowY: "scroll",
              height: "220px",
              minWidth: "101%",
            }}
          >
            {item.history.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <WarningIcon
                  sx={{
                    color: "#192841",
                    fontSize: "150px",
                    [theme.breakpoints.down("md")]: {
                      fontSize: "15vh",
                      marginTop: "50px",
                    },
                  }}
                />
                <Typography
                  sx={{
                    color: "#192841",
                    fontSize: "2vh",
                    fontWeight: 600,
                    fontFamily: "Montserrat",
                    [theme.breakpoints.down("md")]: {
                      fontSize: "1.5vh",
                    },
                  }}
                >
                  Không có dữ liệu về giao dịch trong ngày này
                </Typography>
              </Box>
            ) : (
              ""
            )}
            {item.history.map((his, idx) => (
              <Box sx={{ marginTop: "15px" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "40px",
                    [theme.breakpoints.down("md")]: {
                      flexDirection: "column",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        backgroundColor: "#192841",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "2.5vh",
                          fontWeight: 600,
                          fontFamily: "Montserrat",
                          color: "white",
                          [theme.breakpoints.down("md")]: {
                            fontSize: "1.5vh",
                          },
                        }}
                      >
                        {idx + 1}
                      </Typography>
                    </Box>

                    <Box sx={{ display: isMobile ? "none" : "block" }}>
                      {" "}
                      {CATEICON[his.category1]}{" "}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "start",
                        marginLeft: "20px",
                        width: "250px",
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "start" }}>
                        <Typography
                          sx={{
                            color: "#FFB000",
                            fontSize: "1.7vh",
                            fontWeight: 600,
                            fontFamily: "Montserrat",
                            width: "50px",
                            [theme.breakpoints.down("md")]: {
                              fontSize: "1.5vh",
                            },
                          }}
                          textAlign="left"
                        >
                          Mục:
                        </Typography>
                        <Typography
                          sx={{
                            color: "#192841",
                            fontSize: "1.7vh",
                            fontWeight: 600,
                            fontFamily: "Montserrat",
                            [theme.breakpoints.down("md")]: {
                              fontSize: "1.5vh",
                            },
                          }}
                        >
                          {his.category1} {his.category2 === "" ? "" : "- "}
                          {his.category2}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "start" }}>
                        <Typography
                          sx={{
                            color: "#FFB000",
                            fontSize: "1.7vh",
                            fontWeight: 600,
                            fontFamily: "Montserrat",
                            width: "50px",
                            [theme.breakpoints.down("md")]: {
                              fontSize: "1.5vh",
                            },
                          }}
                          textAlign="left"
                        >
                          Tên:
                        </Typography>
                        <Typography
                          sx={{
                            color: "#192841",
                            fontSize: "1.7vh",
                            fontWeight: 600,
                            fontFamily: "Montserrat",
                            [theme.breakpoints.down("md")]: {
                              fontSize: "1.5vh",
                            },
                          }}
                        >
                          {his.name}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "start" }}>
                        <Typography
                          sx={{
                            color: "#FFB000",
                            fontSize: "1.7vh",
                            fontWeight: 600,
                            fontFamily: "Montserrat",
                            width: "50px",
                            [theme.breakpoints.down("md")]: {
                              fontSize: "1.5vh",
                            },
                          }}
                          textAlign="left"
                        >
                          Dạng:
                        </Typography>
                        <Typography
                          sx={{
                            color: "#192841",
                            fontSize: "1.7vh",
                            fontWeight: 600,
                            fontFamily: "Montserrat",
                            [theme.breakpoints.down("md")]: {
                              fontSize: "1.5vh",
                            },
                          }}
                        >
                          {his.moneytype === 0
                            ? "Tiền mặt"
                            : "Tiền gửi ngân hàng"}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "start" }}>
                        <Typography
                          sx={{
                            color: "#FFB000",
                            fontSize: "1.7vh",
                            fontWeight: 600,
                            fontFamily: "Montserrat",
                            width: "50px",
                            [theme.breakpoints.down("md")]: {
                              fontSize: "1.5vh",
                            },
                          }}
                          textAlign="left"
                        >
                          T/g:
                        </Typography>
                        <Typography
                          sx={{
                            color: "#192841",
                            fontSize: "1.7vh",
                            fontWeight: 600,
                            fontFamily: "Montserrat",
                            [theme.breakpoints.down("md")]: {
                              fontSize: "1.5vh",
                            },
                          }}
                        >
                          {(his.hour < 10 ? "0" + his.hour : his.hour) +
                            ":" +
                            (his.minute < 10 ? "0" + his.minute : his.minute) +
                            ":" +
                            (his.second < 10 ? "0" + his.second : his.second)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      [theme.breakpoints.down("md")]: {
                        marginTop: "10px",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: his.type === 0 ? "#E32636" : "#32de84",
                        fontSize: "2.5vh",
                        fontWeight: 600,
                        fontFamily: "Montserrat",
                        marginLeft: "5px",
                        width: "160px",
                        [theme.breakpoints.down("md")]: {
                          fontSize: "3vh",
                        },
                      }}
                      textAlign="left"
                    >
                      {numToMoney(his.money)}
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
                        onClick={() => handleOpenDeleteDialog(his.tran_id)}
                      />
                      <DeleteTransactionDialog
                        openDialog={
                          openDeleteTransactionDialog &&
                          his.tran_id === choseTransactionId
                        }
                        handleCloseDialog={() =>
                          setOpenDeleteTransactionDialog(false)
                        }
                        handleDeleteTrans={handleDeleteTrans}
                        time={time}
                        data={his}
                      />
                      <ChangeCircleIcon
                        sx={{ color: "grey", marginLeft: "5px" }}
                        onClick={() => handleOpenUpdateDialog(his.tran_id)}
                      />
                      <UpdateTransactionDialog
                        openDialog={
                          openUpdateTransactionDialog &&
                          his.tran_id === choseTransactionId
                        }
                        handleCloseDialog={() =>
                          setOpenUpdateTransactionDialog(false)
                        }
                        handleUpdateTrans={handleUpdateTrans}
                        time={time}
                        data={his}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Button
              sx={{
                backgroundColor: "#192841",
              }}
              onClick={() => setOpenAddTransactionDialog(true)}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "2vh",
                  fontWeight: 700,
                  fontFamily: "Montserrat",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "2vh",
                  },
                }}
              >
                THÊM GIAO DỊCH MỚI
              </Typography>
            </Button>
            <AddTransactionDialog
              openDialog={openAddTransactionDialog}
              handleCloseDialog={() => setOpenAddTransactionDialog(false)}
              handleAddTrans={handleAddTrans}
            />
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "center", marginTop: "5px" }}
          >
            <Typography
              sx={{
                color: "grey",
                fontSize: "1.5vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
                [theme.breakpoints.down("md")]: {
                  fontSize: "1.5vh",
                },
              }}
            >
              Lưu ý: Kéo để xem thêm các giao dịch!
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Box>
  );
};

export default Carousel;
