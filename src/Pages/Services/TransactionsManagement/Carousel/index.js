import React, { useState } from "react";
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

const CarouselItem = ({
  item,
  className,
  open,
  setOpen,
  handleAddTrans,
  openDelete,
  setOpenDelete,
  handleDeleteTrans,
  openUpdate,
  setOpenUpdate,
  handleUpdateTrans,
  time,
}) => (
  <Grid
    className={`carousel-item ${className}`}
    sx={{
      paddingBottom: "20px",
      width: "600px",
      paddingLeft: "20px",
    }}
  >
    <Paper
      elevation={4}
      sx={{
        height: "400px",
        backgroundColor: "white",
        margin: "0 auto",
        marginTop: "10px",
        borderRadius: "8px",
        marginRight: "10px",
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
            <WarningIcon sx={{ color: "#192841", fontSize: "150px" }} />
            <Typography
              sx={{
                color: "#192841",
                fontSize: "2vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
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
              }}
            >
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
                  }}
                >
                  {idx + 1}
                </Typography>
              </Box>

              {CATEICON[his.category1]}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                  marginLeft: "20px",
                  width: "180px",
                }}
              >
                <Typography
                  sx={{
                    color: "#192841",
                    fontSize: "1.7vh",
                    fontWeight: 600,
                    fontFamily: "Montserrat",
                  }}
                >
                  {his.category1} {his.category2 === "" ? "" : "- "}
                  {his.category2}
                </Typography>

                <Typography
                  sx={{
                    color: "#192841",
                    fontSize: "1.7vh",
                    fontWeight: 600,
                    fontFamily: "Montserrat",
                  }}
                >
                  {his.name}
                </Typography>

                <Typography
                  sx={{
                    color: "#192841",
                    fontSize: "1.7vh",
                    fontWeight: 600,
                    fontFamily: "Montserrat",
                  }}
                >
                  {(his.hour < 10 ? "0" + his.hour : his.hour) +
                    ":" +
                    (his.minute < 10 ? "0" + his.minute : his.minute) +
                    ":" +
                    (his.second < 10 ? "0" + his.second : his.second)}
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: his.type === 0 ? "#E32636" : "#32de84",
                  fontSize: "2.5vh",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  marginLeft: "5px",
                  width: "130px",
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
                  onClick={() => setOpenDelete(true)}
                />
                <DeleteTransactionDialog
                  openDialog={openDelete}
                  handleCloseDialog={() => setOpenDelete(false)}
                  handleDeleteTrans={handleDeleteTrans}
                  time={time}
                  data={his}
                />
                <ChangeCircleIcon
                  sx={{ color: "grey", marginLeft: "5px" }}
                  onClick={() => setOpenUpdate(true)}
                />
                <UpdateTransactionDialog
                  openDialog={openUpdate}
                  handleCloseDialog={() => setOpenUpdate(false)}
                  handleUpdateTrans={handleUpdateTrans}
                  time={time}
                  data={his}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Button
          sx={{
            backgroundColor: "#192841",
          }}
          onClick={() => setOpen(true)}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "2vh",
              fontWeight: 700,
              fontFamily: "Montserrat",
            }}
          >
            THÊM GIAO DỊCH MỚI
          </Typography>
        </Button>
        <AddTransactionDialog
          openDialog={open}
          handleCloseDialog={() => setOpen(false)}
          handleAddTrans={handleAddTrans}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
        <Typography
          sx={{
            color: "grey",
            fontSize: "1.5vh",
            fontWeight: 600,
            fontFamily: "Montserrat",
          }}
        >
          Lưu ý: Kéo để xem thêm các giao dịch!
        </Typography>
      </Box>
    </Paper>
  </Grid>
);

const Carousel = ({
  item,
  handleAddTrans,
  handleDeleteTrans,
  handleUpdateTrans,
  day,
  month,
  year,
}) => {
  const [openAddTransactionDialog, setOpenAddTransactionDialog] =
    useState(false);

  const [openDeleteTransactionDialog, setOpenDeleteTransactionDialog] =
    useState(false);

  const [openUpdateTransactionDialog, setOpenUpdateTransactionDialog] =
    useState(false);

  return (
    <Box container sx={{ marginLeft: "20px" }}>
      <CarouselItem
        key={1}
        index={1}
        item={item}
        open={openAddTransactionDialog}
        setOpen={setOpenAddTransactionDialog}
        handleAddTrans={handleAddTrans}
        openDelete={openDeleteTransactionDialog}
        setOpenDelete={setOpenDeleteTransactionDialog}
        handleDeleteTrans={handleDeleteTrans}
        openUpdate={openUpdateTransactionDialog}
        setOpenUpdate={setOpenUpdateTransactionDialog}
        handleUpdateTrans={handleUpdateTrans}
        time={{ day: day, month: month, year: year }}
      ></CarouselItem>
    </Box>
  );
};

export default Carousel;
