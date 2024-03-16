import React, { useState } from "react";
import { Grid, Paper, Box, Typography, Button } from "@mui/material";
import { numToMoney } from "../../../Functions/text";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import SavingsIcon from "@mui/icons-material/Savings";
import SchoolIcon from "@mui/icons-material/School";
import GamepadIcon from "@mui/icons-material/Gamepad";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import AddTransactionDialog from "../AddTransactionDialog";
import "./Carousel.css"; // Make sure this is correctly linked to your CSS file

const cateIcon = {
  "Chi tiêu cần thiết": (
    <CrisisAlertIcon
      sx={{ color: "#FFB000", fontSize: "8vh", marginLeft: "10px" }}
    />
  ),
  "Tiết kiệm": (
    <SavingsIcon
      sx={{ color: "#FFB000", fontSize: "8vh", marginLeft: "10px" }}
    />
  ),
  "Giáo dục": (
    <SchoolIcon
      sx={{ color: "#FFB000", fontSize: "8vh", marginLeft: "10px" }}
    />
  ),
  "Hưởng thụ": (
    <GamepadIcon
      sx={{ color: "#FFB000", fontSize: "8vh", marginLeft: "10px" }}
    />
  ),
  "Tự do tài chính": (
    <MonetizationOnIcon
      sx={{ color: "#FFB000", fontSize: "8vh", marginLeft: "10px" }}
    />
  ),
  "Quà và từ thiện": (
    <CardGiftcardIcon
      sx={{ color: "#FFB000", fontSize: "8vh", marginLeft: "10px" }}
    />
  ),
};
const CarouselItem = ({
  item,
  index,
  className,
  open,
  setOpen,
  handleAddTrans,
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

              {cateIcon[his.category1]}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                  marginLeft: "20px",
                  width: "220px",
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
                  color: "#FFB000",
                  fontSize: "2.5vh",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  marginLeft: "20px",
                  float: "right",
                }}
              >
                {numToMoney(his.money)}
              </Typography>
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

const Carousel = ({ item, handleAddTrans }) => {
  const [openAddTransactionDialog, setOpenAddTransactionDialog] =
    useState(false);

  return (
    <Box container sx={{ marginLeft: "20px" }}>
      <CarouselItem
        key={1}
        index={1}
        item={item}
        className={""}
        open={openAddTransactionDialog}
        setOpen={setOpenAddTransactionDialog}
        handleAddTrans={handleAddTrans}
      ></CarouselItem>
    </Box>
  );
};

export default Carousel;