import React, { useState, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Member1 from "../../assets/Member1.png";
import Member2 from "../../assets/Member2.png";
import Member3 from "../../assets/Member3.png";
import Member4 from "../../assets/Member4.png";
import Member5 from "../../assets/Member5.png";
import CircleIcon from "@mui/icons-material/Circle";

const members = [
  {
    id: "0",
    image: Member1,
    data: {
      name: "Đoàn Viết Thắng",
      position: "Leader, TechLead",
      awards: [
        "Cử nhân Khoa học Máy Tính - HUST",
        "Quán quân cuộc thi Econometrics Competition",
        "Giải nhì Oraichain Hackathon 2022",
        "Top 10 Busitech Bootcamp 2023",
        "Top 10 Startup BA 2022",
        "Top 8 TechStart 2023",
      ],
    },
  },
  {
    id: "1",
    image: Member2,
    data: {
      name: "Nguyễn Thị Thanh Xuân",
      position: "Member",
      awards: [
        "Top 10 I-Startup 2021",
        "Top 3 Hackathon HIEC 2020, 2021",
        "Top 10 Startup BA 2022",
        "Top 3 G-Collage Singapore",
      ],
    },
  },
  {
    id: "2",
    image: Member3,
    data: {
      name: "Lê Đức Minh",
      position: "Member",
      awards: [
        "Top 4 Economics challenge HVNH",
        "Top 10 Startup BA 2022",
        "Á quân Hiểu Đúng Về Tiền- Nhà Ngân Hàng Tương Lai 2023",
      ],
    },
  },
  {
    id: "3",
    image: Member4,
    data: {
      name: "Lê Thị Hoài Phương",
      position: "Member",
      awards: ["Top 10 Startup BA 2022", "Top 14 Mis&Tech"],
    },
  },
  {
    id: "4",
    image: Member5,
    data: {
      name: "Đỗ Minh Hoàn",
      position: "Member",
      awards: [],
    },
  },
];

const Members = () => {
  const theme = useTheme();
  const [curMember, setCurMember] = useState("0");
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  return (
    <Container
      sx={{
        backgroundColor: "white",
        marginTop: "30px",
        marginBottom: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "75vh",
        [theme.breakpoints.down("md")]: {
          marginTop: "15px",
          marginBottom: "15px",
        },
      }}
    >
      {isMobile ? (
        <Box
          sx={{
            display: "flex",
            width: "50%",
            justifyContent: "space-around",
            alignItems: "center",
            [theme.breakpoints.down("md")]: {
              width: "95%",
            },
          }}
        >
          {members.map((member) => (
            <img
              class={
                curMember === member.id
                  ? "selected-member-image-mobile"
                  : "member-image-mobile"
              }
              src={member.image}
              alt=""
              key={member.id}
              onClick={() => setCurMember(member.id)}
            />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            width: "50%",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {members.map((member) => (
            <img
              class={
                curMember === member.id
                  ? "selected-member-image"
                  : "member-image"
              }
              src={member.image}
              alt=""
              key={member.id}
              onClick={() => setCurMember(member.id)}
            />
          ))}
        </Box>
      )}
      {isMobile ? (
        <img
          class={"member-banner-mobile"}
          src={members[curMember].image}
          alt=""
        />
      ) : (
        ""
      )}
      <Box
        sx={{
          width: "75%",
          height: "350px",
          marginTop: "30px",
          backgroundColor: theme.primary.main,
          borderRadius: theme.primary.borderRadius,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "95%",
            height: "230px",
          },
        }}
      >
        {isMobile ? (
          ""
        ) : (
          <img class={"member-banner"} src={members[curMember].image} alt="" />
        )}
        <Box
          sx={{
            padding: "40px",
            [theme.breakpoints.down("md")]: {
              padding: "20px",
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "800",
              fontSize: "4vh",
              color: "white",
              "&:hover": theme.primary.hoverDefault,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.mediumMobile,
              },
            }}
            textAlign="left"
          >
            {members[curMember].data.name}
          </Typography>
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "800",
              fontSize: theme.primary.medium,
              color: theme.primary.sub,
              "&:hover": theme.primary.hoverDefault,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
            }}
            textAlign="left"
          >
            {members[curMember].data.position}
          </Typography>
          {members[curMember].data.awards.map((award) => (
            <Box
              sx={{
                display: "flex",
                marginLeft: "30px",
                marginTop: "10px",
                alignItems: "center",
                [theme.breakpoints.down("md")]: {
                  marginLeft: "10px",
                },
              }}
            >
              <CircleIcon sx={{ color: "white", fontSize: "8px" }} />
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "600",
                  fontSize: theme.primary.smallMobile,
                  color: "white",
                  "&:hover": theme.primary.hoverDefault,
                  marginLeft: "10px",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "1.2vh",
                  },
                }}
                textAlign="left"
              >
                {award}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Members;
