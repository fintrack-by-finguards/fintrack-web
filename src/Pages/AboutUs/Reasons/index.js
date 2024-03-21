import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { postApi } from "../../../others/database";
import { SERVER } from "../../../constant";
import Screen1 from "../../../assets/Screen1.png";
import CardMedia from "@mui/material/CardMedia";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SavingsIcon from "@mui/icons-material/Savings";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import SmartToyIcon from "@mui/icons-material/SmartToy";
const Reasons = () => {
  const theme = useTheme();
  const [appData, setAppData] = useState({
    user: 0,
    goal: 0,
    transaction: 0,
  });

  useEffect(() => {
    postApi({}, `${SERVER}/user/info`).then((res) => {
      setAppData(res.data);
    });
  }, []);

  return (
    <Box>
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
            TẠI SAO BẠN NÊN SỬ DỤNG
          </Typography>
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "800",
              fontSize: theme.primary.big,
              color: theme.primary.sub,
              marginLeft: "10px",
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.medium,
              },
              "&:hover": theme.primary.hoverDefault,
            }}
          >
            FINTRACK!
          </Typography>
        </Box>
      </Box>

      <Grid container sx={{ width: "100%" }}>
        <Grid
          xs={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.primary.main,
              width: "90%",
              height: "180px",
              borderRadius: theme.primary.borderRadius,
              position: "relative",
            }}
          >
            <Box
              sx={{
                backgroundColor: theme.primary.sub,
                width: "50px",
                height: "50px",
                borderRadius: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: -10,
                left: -10,
              }}
            >
              <Typography
                sx={{
                  fontSize: "4vh",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  color: "white",
                }}
              >
                1
              </Typography>
            </Box>
            <PhonelinkIcon
              sx={{
                marginTop: "10px",
                fontSize: "6vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
                color: "white",
              }}
            />
            <Typography
              sx={{
                fontSize: "4vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
                color: "white",
              }}
            >
              Đồng bộ hoá
            </Typography>
            <Typography
              sx={{
                fontSize: "2vh",
                fontWeight: 400,
                paddingLeft: "30px",
                paddingRight: "30px",
                fontFamily: "Montserrat",
                color: "white",
                marginTop: "5px",
              }}
              align="justify"
            >
              Dữ liệu được đồng bộ trên tất cả thiết bị và các nền tảng giúp cho
              bạn có thể bám sát lộ trình tài chính của mình
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: theme.primary.main,
              width: "90%",
              height: "180px",
              borderRadius: theme.primary.borderRadius,
              position: "relative",
            }}
          >
            <Box
              sx={{
                backgroundColor: theme.primary.sub,
                width: "50px",
                height: "50px",
                borderRadius: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: -10,
                left: -10,
              }}
            >
              <Typography
                sx={{
                  fontSize: "4vh",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  color: "white",
                }}
              >
                2
              </Typography>
            </Box>
            <InsertEmoticonIcon
              sx={{
                marginTop: "10px",
                fontSize: "6vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
                color: "white",
              }}
            />
            <Typography
              sx={{
                fontSize: "4vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
                color: "white",
              }}
            >
              Không bận tâm
            </Typography>
            <Typography
              sx={{
                fontSize: "2vh",
                fontWeight: 400,
                paddingLeft: "30px",
                paddingRight: "30px",
                fontFamily: "Montserrat",
                color: "white",
                marginTop: "5px",
              }}
              align="justify"
            >
              Không cần phải đau đầu suy nghĩ đã chi tiêu những gì và như thế
              nào khi đã có FinTrack. Việc của bạn là tải ứng dụng.
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: theme.primary.main,
              width: "90%",
              height: "180px",
              borderRadius: theme.primary.borderRadius,
              position: "relative",
            }}
          >
            <Box
              sx={{
                backgroundColor: theme.primary.sub,
                width: "50px",
                height: "50px",
                borderRadius: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: -10,
                left: -10,
              }}
            >
              <Typography
                sx={{
                  fontSize: "4vh",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  color: "white",
                }}
              >
                3
              </Typography>
            </Box>
            <SavingsIcon
              sx={{
                marginTop: "10px",
                fontSize: "6vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
                color: "white",
              }}
            />
            <Typography
              sx={{
                fontSize: "4vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
                color: "white",
              }}
            >
              Tự do tài chính
            </Typography>
            <Typography
              sx={{
                fontSize: "2vh",
                fontWeight: 400,
                paddingLeft: "30px",
                paddingRight: "30px",
                fontFamily: "Montserrat",
                color: "white",
                marginTop: "5px",
              }}
              align="justify"
            >
              FinTrack sẽ giúp bạn theo dõi các khoản đầu tư và tiết kiệm. Bạn
              sẽ nhanh chóng đạt được mục tiêu và tự do tài chính.
            </Typography>
          </Box>
        </Grid>
        <Grid
          xs={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "80%",
              minHeight: "200px",
            }}
            image={Screen1}
            alt="Paella dish"
          />
        </Grid>
        <Grid
          xs={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.primary.main,
              width: "90%",
              height: "180px",
              borderRadius: theme.primary.borderRadius,
              position: "relative",
            }}
          >
            <Box
              sx={{
                backgroundColor: theme.primary.sub,
                width: "50px",
                height: "50px",
                borderRadius: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: -10,
                right: -10,
              }}
            >
              <Typography
                sx={{
                  fontSize: "4vh",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  color: "white",
                }}
              >
                4
              </Typography>
            </Box>
            <EditNoteIcon
              sx={{
                marginTop: "10px",
                fontSize: "6vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
                color: "white",
              }}
            />
            <Typography
              sx={{
                fontSize: "4vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
                color: "white",
              }}
            >
              Ghi chép tiện lợi
            </Typography>
            <Typography
              sx={{
                fontSize: "2vh",
                fontWeight: 400,
                paddingLeft: "30px",
                paddingRight: "30px",
                fontFamily: "Montserrat",
                color: "white",
                marginTop: "5px",
              }}
              align="justify"
            >
              Ngoài nhập thông tin thủ công, FinTrack hỗ trợ bạn trong việc ghi
              chép giao dịch tự động thông qua ảnh hoá đơn.
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: theme.primary.main,
              width: "90%",
              height: "180px",
              borderRadius: theme.primary.borderRadius,
              position: "relative",
            }}
          >
            <Box
              sx={{
                backgroundColor: theme.primary.sub,
                width: "50px",
                height: "50px",
                borderRadius: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: -10,
                right: -10,
              }}
            >
              <Typography
                sx={{
                  fontSize: "4vh",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  color: "white",
                }}
              >
                5
              </Typography>
            </Box>
            <SocialDistanceIcon
              sx={{
                marginTop: "10px",
                fontSize: "6vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
                color: "white",
              }}
            />
            <Typography
              sx={{
                fontSize: "4vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
                color: "white",
              }}
            >
              Lộ trình cá nhân hoá
            </Typography>
            <Typography
              sx={{
                fontSize: "2vh",
                fontWeight: 400,
                paddingLeft: "30px",
                paddingRight: "30px",
                fontFamily: "Montserrat",
                color: "white",
                marginTop: "5px",
              }}
              align="justify"
            >
              FinTrack biết rằng cá nhân hoá là công cụ để giúp những người dùng
              khác nhau cùng nhau đạt mục tiêu tài chính.
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: theme.primary.main,
              width: "90%",
              height: "180px",
              borderRadius: theme.primary.borderRadius,
              position: "relative",
            }}
          >
            <Box
              sx={{
                backgroundColor: theme.primary.sub,
                width: "50px",
                height: "50px",
                borderRadius: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: -10,
                right: -10,
              }}
            >
              <Typography
                sx={{
                  fontSize: "4vh",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  color: "white",
                }}
              >
                6
              </Typography>
            </Box>
            <SmartToyIcon
              sx={{
                marginTop: "10px",
                fontSize: "6vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
                color: "white",
              }}
            />
            <Typography
              sx={{
                fontSize: "4vh",
                fontWeight: 600,
                fontFamily: "Montserrat",
                color: "white",
              }}
            >
              Hỗ trợ 24/7
            </Typography>
            <Typography
              sx={{
                fontSize: "2vh",
                fontWeight: 400,
                paddingLeft: "30px",
                paddingRight: "30px",
                fontFamily: "Montserrat",
                color: "white",
                marginTop: "5px",
              }}
              align="justify"
            >
              Chatbot Pinky sẽ là một người bạn, trợ thủ tuyệt vời, luôn đồng
              hành cùng bạn trong mọi lộ trình tài chính.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reasons;
