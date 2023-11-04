import React, { useRef } from "react";
import { Box, Typography, Container, Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Service1 from "../../assets/Service1.png";
import Service2 from "../../assets/Service2.png";
import ServiceItem1 from "../../assets/ServiceItem1.png";
import ServiceItem2 from "../../assets/ServiceItem2.png";
import ServiceItem3 from "../../assets/ServiceItem3.png";
import ServiceItem4 from "../../assets/ServiceItem4.png";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Services = () => {
  const sliderRef = useRef(null);
  const theme = useTheme();

  const slides = [
    { id: 1, image: Service1 },
    { id: 2, image: Service2 },
  ];

  return (
    <Box sx={{ marginBottom: "20px" }}>
      <Container
        sx={{
          backgroundColor: "white",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          height: "60vh",
          marginTop: "30px",
        }}
      >
        <Button
          sx={{
            color: "inherit",
            border: "none",
            padding: 0,
            cursor: "pointer",
            outline: "inherit",
            borderRadius: "6px",
            height: "50px",
            width: "30px",
            margin: "5px",
          }}
          onClick={() => {
            const container = sliderRef.current;
            container.scrollLeft -= 1500;
          }}
        >
          <ChevronLeftIcon />
        </Button>
        <Box
          sx={{
            display: "flex",
            overflow: "scroll",
            scrollBehavior: "smooth",
            transition: "scroll 0.3s ease-in-out",
          }}
          ref={sliderRef}
        >
          {slides.map((slide) => {
            return (
              <img
                className="service-slide"
                alt="sliderImage"
                key={slide?.id}
                src={slide?.image}
              />
            );
          })}
        </Box>
        <Button
          sx={{
            color: "inherit",
            border: "none",
            padding: 0,
            cursor: "pointer",
            outline: "inherit",
            borderRadius: "6px",
            height: "50px",
            width: "30px",
            margin: "5px",
          }}
          onClick={() => {
            const container = sliderRef.current;
            container.scrollLeft += 1000;
          }}
        >
          <ChevronRightIcon />
        </Button>
      </Container>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          sx={{
            fontFamily: theme.primary.fontFamily,
            fontWeight: "800",
            fontSize: theme.primary.semiBig,
            color: theme.primary.main,
          }}
        >
          TÍNH NĂNG
        </Typography>
      </Box>
      <Container>
        <Grid container>
          <Grid
            item
            xs={6}
            sx={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "75%",
                padding: "20px",
                backgroundColor: theme.primary.main,
                borderRadius: theme.primary.borderRadius,
              }}
            >
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "700",
                  fontSize: theme.primary.medium,
                  color: "white",
                }}
              >
                Theo dõi chi tiêu dễ dàng
              </Typography>
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "400",
                  fontSize: theme.primary.small,
                  color: "white",
                  marginTop: "10px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
                textAlign={"justify"}
              >
                Các chi tiêu chuyển khoản, trả bill hay tiền mặt đều được tự
                động cập nhật vào các danh mục phù hợp. Các giao dịch được ghi
                chép chi tiết và trực quan với hình ảnh
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ marginTop: "40px" }}>
            <img class="service-item" src={ServiceItem1} alt="" />
          </Grid>
          {/* // */}
          <Grid item xs={6} sx={{ marginTop: "40px" }}>
            <img class="service-item" src={ServiceItem2} alt="" />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "75%",
                backgroundColor: theme.primary.main,
                padding: "20px",
                borderRadius: theme.primary.borderRadius,
              }}
            >
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "700",
                  fontSize: theme.primary.medium,
                  color: "white",
                }}
              >
                Thực hành mỗi ngày
              </Typography>
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "400",
                  fontSize: theme.primary.small,
                  color: "white",
                  marginTop: "10px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
                textAlign={"justify"}
              >
                Thực hành chi tiêu, đầu tư, tiết kiệm thông qua nhiệm vụ, mục
                tiêu tài chính từng ngày
              </Typography>
            </Box>
          </Grid>
          {/* // */}
          <Grid
            item
            xs={6}
            sx={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "75%",
                padding: "20px",
                backgroundColor: theme.primary.main,
                borderRadius: theme.primary.borderRadius,
              }}
            >
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "700",
                  fontSize: theme.primary.medium,
                  color: "white",
                }}
              >
                Báo cáo chi tiết
              </Typography>
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "400",
                  fontSize: theme.primary.small,
                  color: "white",
                  marginTop: "10px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
                textAlign={"justify"}
              >
                FinTrack báo cáo chi tiêu và thu nhập chi tiết của người dùng
                theo ngày, tuần, tháng, năm, mục tiêu thông qua các biểu đồ trực
                quan và con số cụ thể
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img class="service-item" src={ServiceItem3} alt="" />
          </Grid>
          {/* // */}
          <Grid
            item
            xs={6}
            sx={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img class="service-item" src={ServiceItem4} alt="" />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "75%",
                padding: "20px",
                backgroundColor: theme.primary.main,
                borderRadius: theme.primary.borderRadius,
              }}
            >
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "700",
                  fontSize: theme.primary.medium,
                  color: "white",
                }}
              >
                Mục tiêu tài chính cá nhân hoá
              </Typography>
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "400",
                  fontSize: theme.primary.small,
                  color: "white",
                  marginTop: "10px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
                textAlign={"justify"}
              >
                Mỗi cá nhân có những đặc điểm và mục tiêu tài chính riêng, và do
                đó, lộ trình tài chính cá nhân hoá là công cụ tối ưu nhất để
                giúp họ biến các mục tiêu tài chính thành hiện thực
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
