import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { postApi } from "../../../others/database";
import { SERVER } from "../../../constant";

const MissionAndGoal = () => {
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
            NHIỆM VỤ VÀ SỨ MỆNH
          </Typography>
        </Box>
      </Box>
      <Grid container sx={{ width: "100%" }}>
        <Grid
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "200px",
              backgroundColor: theme.primary.main,
              padding: "10px",
              borderRadius: theme.primary.borderRadius,
            }}
          >
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "600",
                fontSize: "3vh",
                color: "white",
                "&:hover": theme.primary.hoverDefault,
                [theme.breakpoints.down("md")]: {
                  fontSize: "11px",
                  width: "100%",
                },
              }}
              textAlign="center"
            >
              Nhiệm vụ
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "600",
              fontSize: "2vh",
              padding: "15px",
              width: "60%",
              color: theme.primary.main,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.medium,
              },
              "&:hover": theme.primary.hoverDefault,
            }}
            textAlign="justify"
          >
            Đội ngũ FinTrack hướng đến mục tiêu kết nối người dùng với các dịch
            vụ tài chính và cộng đồng chia sẻ kiến thức để họ có thể tối ưu hóa
            quản lý tài chính trong mọi hoàn cảnh. Không chỉ khuyến khích tiết
            kiệm mà còn giúp họ đầu tư và tiết cận với các quỹ, các nguồn đầu tư
            đa dạng.
            <br />
            Không cần phải đau đầu suy nghĩ bạn đã chi tiêu những gì và như thế
            nào khi đã có FinTrack ghi chép lại hộ bạn. Việc của bạn là tải ứng
            dụng và cập nhật thông tin thường xuyên. Chỉ bằng một chạm bạn đã có
            thể dễ dàng theo dõi, cập nhật tổng giá trị tài sản của bản thân
            hiện có và theo dõi dư nợ, kiểm soát trực tiếp ngay trên ứng dụng
            FinTrack.
          </Typography>
        </Grid>

        <Grid
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "200px",
              backgroundColor: theme.primary.main,
              padding: "10px",
              borderRadius: theme.primary.borderRadius,
            }}
          >
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "600",
                fontSize: "3vh",
                color: "white",
                "&:hover": theme.primary.hoverDefault,
                [theme.breakpoints.down("md")]: {
                  fontSize: "11px",
                  width: "100%",
                },
              }}
              textAlign="center"
            >
              Sứ mệnh
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "600",
              fontSize: "2vh",
              padding: "15px",
              width: "60%",
              color: theme.primary.main,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.medium,
              },
              "&:hover": theme.primary.hoverDefault,
            }}
            textAlign="justify"
          >
            Sứ mệnh của FinTrack là hỗ trợ những người dân Việt Nam, đặc biệt là
            những người trẻ trong việc xây dựng lộ trình tiết kiệm một cách hiệu
            quả và phù hợp nhất. Ngoài ra ứng dụng cũng góp phần thay đổi thói
            quen chi tiêu của người dùng trong đời sống, làm việc, học tập và
            giải trí.
            <br />
            Không những thế, FinTrack còn giúp người dùng làm rõ được các khoản
            chi tiêu của mình, từ đó, nâng cao nâng cao dân trí tài chính của
            mỗi người dân Việt và giúp mọi người điều chỉnh thói quen tài chính
            của mình một cách hợp lý hơn.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MissionAndGoal;
