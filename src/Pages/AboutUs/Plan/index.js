import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

const Plan = () => {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  return (
    <Box container sx={{ marginBottom: "50px", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "800",
              fontSize: "5vh",
              color: theme.primary.main,
              marginLeft: "10px",
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.medium,
              },
              "&:hover": theme.primary.hoverDefault,
            }}
          >
            KẾ HOẠCH PHÁT TRIỂN
          </Typography>
        </Box>
      </Box>

      <Box>
        <Timeline position="alternate-reverse">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ display: "flex", justifyContent: "end" }}>
              <Box
                sx={{
                  padding: "20px",
                  width: "300px",
                  backgroundColor: theme.primary.main,
                  borderRadius: theme.primary.borderRadius,
                  [theme.breakpoints.down("md")]: {
                    width: "100px",
                    padding: "10px",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: theme.primary.fontFamily,
                    fontWeight: "600",
                    fontSize: "2vh",
                    color: "white",
                    marginLeft: "10px",
                    [theme.breakpoints.down("md")]: {
                      fontSize: "1.2vh",
                      marginLeft: 0,
                    },
                    "&:hover": theme.primary.hoverDefault,
                  }}
                  align="justify"
                >
                  Phát triển ứng dụng để đáp ứng nhu cầu người dùng, mở rộng
                  mạng lưới đối tác, và xây dựng nền tảng truyền thông (Fanpage,
                  Facebook Group, Website) để tăng nhận thức thương hiệu.
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "800",
                  fontSize: "3vh",
                  color: theme.primary.main,
                  marginLeft: "10px",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "1.5vh",
                    marginLeft: 0,
                  },
                  "&:hover": theme.primary.hoverDefault,
                }}
              >
                Khởi đầu
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ display: "flex", justifyContent: "start" }}>
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "800",
                  fontSize: "3vh",
                  color: theme.primary.main,
                  marginRight: "10px",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "1.5vh",
                    marginRight: 0,
                  },
                  "&:hover": theme.primary.hoverDefault,
                }}
              >
                Phát triển
              </Typography>
              <Box
                sx={{
                  padding: "20px",
                  width: "300px",
                  backgroundColor: theme.primary.main,
                  borderRadius: theme.primary.borderRadius,
                  [theme.breakpoints.down("md")]: {
                    width: "100px",
                    padding: "10px",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: theme.primary.fontFamily,
                    fontWeight: "600",
                    fontSize: "2vh",
                    color: "white",
                    marginLeft: "10px",
                    [theme.breakpoints.down("md")]: {
                      fontSize: "1.2vh",
                      marginLeft: 0,
                    },
                    "&:hover": theme.primary.hoverDefault,
                  }}
                  align="justify"
                >
                  Huy động vốn Seed để mở rộng và cải thiện sản phẩm, tung sản
                  phẩm ra thị trường và mở rộng hợp tác với cộng đồng sinh viên,
                  tài chính, KOLs, và Youtubers để tăng hiệu quả marketing.
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ display: "flex", justifyContent: "end" }}>
              <Box
                sx={{
                  padding: "20px",
                  width: "300px",
                  backgroundColor: theme.primary.main,
                  borderRadius: theme.primary.borderRadius,
                  [theme.breakpoints.down("md")]: {
                    width: "100px",
                    padding: "10px",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: theme.primary.fontFamily,
                    fontWeight: "600",
                    fontSize: "2vh",
                    color: "white",
                    marginLeft: "10px",
                    [theme.breakpoints.down("md")]: {
                      fontSize: "1.2vh",
                      marginLeft: 0,
                    },
                    "&:hover": theme.primary.hoverDefault,
                  }}
                  align={isMobile ? "center" : "justify"}
                >
                  Gọi vốn Series A, B, và C để tiếp tục mở rộng và cải thiện sản
                  phẩm. Phát triển các tính năng mới và mở rộng hợp tác, bao gồm
                  cả việc tối ưu hóa đội ngũ và công nghệ hỗ trợ.
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "800",
                  fontSize: "3vh",
                  color: theme.primary.main,
                  marginLeft: "10px",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "1.5vh",
                  },
                  "&:hover": theme.primary.hoverDefault,
                }}
              >
                Mở rộng
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent sx={{ display: "flex", justifyContent: "start" }}>
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "800",
                  fontSize: "3vh",
                  color: theme.primary.main,
                  marginRight: "10px",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "1.5vh",
                    marginRight: 0,
                  },
                  "&:hover": theme.primary.hoverDefault,
                }}
              >
                Lan tỏa
              </Typography>
              <Box
                sx={{
                  padding: "20px",
                  width: "300px",
                  backgroundColor: theme.primary.main,
                  borderRadius: theme.primary.borderRadius,
                  [theme.breakpoints.down("md")]: {
                    width: "100px",
                    padding: "10px",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: theme.primary.fontFamily,
                    fontWeight: "600",
                    fontSize: "2vh",
                    color: "white",
                    marginLeft: "10px",
                    [theme.breakpoints.down("md")]: {
                      fontSize: "1.2vh",
                      marginLeft: 0,
                    },
                    "&:hover": theme.primary.hoverDefault,
                  }}
                  align={isMobile ? "center" : "justify"}
                >
                  Phát triển các kênh truyền thông như Youtube và Tiktok, mở
                  rộng quảng bá sản phẩm qua LinkedIn và các cộng đồng sinh
                  viên, người đi làm trong và ngoài nước, đồng thời tổ chức và
                  phát triển ứng dụng một cách chuyên sâu để đáp ứng tốt hơn nhu
                  cầu người dùng.
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Box>
    </Box>
  );
};

export default Plan;
