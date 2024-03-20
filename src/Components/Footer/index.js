import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.primary.main,
        paddingBottom: "5px",
        bottom: 0,
        width: "100%",
      }}
    >
      <Box
        sx={{
          height: "50px",
          borderBottomRightRadius: "40px",
          backgroundColor: "white",
        }}
      ></Box>
      <Box sx={{ backgroundColor: "white" }}>
        <Box
          sx={{
            backgroundColor: theme.primary.main,
            height: "260px",
            borderTopLeftRadius: "40px",
            display: "flex",
            paddingTop: "30px",
            justifyContent: "space-between",
            paddingLeft: "150px",
            paddingRight: "150px",
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              height: "100px",
              justifyContent: "center",
              width: "100%",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                marginBottom: "40px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "600",
                  fontSize: theme.primary.medium,
                  color: "white",
                  marginBottom: "15px",
                  "&:hover": theme.primary.hoverDefault,
                  [theme.breakpoints.down("md")]: {
                    fontSize: "11px",
                    marginTop: "10px",
                    width: "100%",
                  },
                }}
                textAlign="center"
              >
                Kết nối với chúng tôi
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  width: "200px",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <FacebookIcon
                  sx={{
                    color: theme.primary.sub,
                    fontSize: theme.primary.big,
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    marginLeft: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: theme.primary.fontFamily,
                      fontWeight: "400",
                      fontSize: "11px",
                      color: "white",
                      marginBottom: "5px",
                      "&:hover": theme.primary.hoverDefault,
                      [theme.breakpoints.down("md")]: {
                        fontSize: "11px",
                        marginTop: "10px",
                        width: "100%",
                      },
                    }}
                    textAlign="center"
                  >
                    Địa chỉ FaceBook
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: theme.primary.fontFamily,
                      fontWeight: "400",
                      fontSize: "13px",
                      color: "white",
                      "&:hover": theme.primary.hoverDefault,
                      [theme.breakpoints.down("md")]: {
                        fontSize: "11px",
                        marginTop: "10px",
                        width: "100%",
                      },
                    }}
                    textAlign="center"
                  >
                    fb.com/fintrackbyfinguards
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "200px",
                  justifyContent: "start",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <EmailIcon
                  sx={{
                    color: theme.primary.sub,
                    fontSize: theme.primary.big,
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    marginLeft: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: theme.primary.fontFamily,
                      fontWeight: "400",
                      fontSize: "11px",
                      color: "white",
                      marginBottom: "5px",
                      "&:hover": theme.primary.hoverDefault,
                      [theme.breakpoints.down("md")]: {
                        fontSize: "11px",
                        marginTop: "10px",
                        width: "100%",
                      },
                    }}
                    textAlign="center"
                  >
                    Địa chỉ Email
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: theme.primary.fontFamily,
                      fontWeight: "400",
                      fontSize: "13px",
                      color: "white",
                      "&:hover": theme.primary.hoverDefault,
                      [theme.breakpoints.down("md")]: {
                        fontSize: "11px",
                        marginTop: "10px",
                        width: "100%",
                      },
                    }}
                    textAlign="center"
                  >
                    fintrackbyfinguards@gmail.com
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "200px",
                  justifyContent: "start",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <LocalPhoneIcon
                  sx={{
                    color: theme.primary.sub,
                    fontSize: theme.primary.big,
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    marginLeft: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: theme.primary.fontFamily,
                      fontWeight: "400",
                      fontSize: "11px",
                      color: "white",
                      marginBottom: "5px",
                      "&:hover": theme.primary.hoverDefault,
                      [theme.breakpoints.down("md")]: {
                        fontSize: "11px",
                        marginTop: "10px",
                        width: "100%",
                      },
                    }}
                    textAlign="center"
                  >
                    Số điện thoại
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: theme.primary.fontFamily,
                      fontWeight: "400",
                      fontSize: "13px",
                      color: "white",
                      "&:hover": theme.primary.hoverDefault,
                      [theme.breakpoints.down("md")]: {
                        fontSize: "11px",
                        marginTop: "10px",
                        width: "100%",
                      },
                    }}
                    textAlign="center"
                  >
                    {"(+84) 935 898 689"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "600",
                  fontSize: theme.primary.medium,
                  color: "white",
                  marginBottom: "15px",
                  "&:hover": theme.primary.hoverDefault,
                  [theme.breakpoints.down("md")]: {
                    fontSize: "11px",
                    marginTop: "10px",
                    width: "100%",
                  },
                }}
                textAlign="center"
              >
                Sản phẩm chính
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                {[
                  "Mục tiêu tài chính",
                  "Kế hoạch tài chính",
                  "Quản lý chi tiêu",
                  "Quản lý tài chính",
                ].map((value, idx) => (
                  <Typography
                    sx={{
                      fontFamily: theme.primary.fontFamily,
                      fontWeight: "400",
                      fontSize: theme.primary.small,
                      color: "white",
                      marginBottom: "5px",
                      "&:hover": theme.primary.hoverDefault,
                      [theme.breakpoints.down("md")]: {
                        fontSize: "11px",
                        marginTop: "10px",
                        width: "100%",
                      },
                    }}
                    textAlign="center"
                  >
                    {value}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography
                sx={{
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: "600",
                  fontSize: theme.primary.medium,
                  color: "white",
                  marginBottom: "15px",
                  "&:hover": theme.primary.hoverDefault,
                  [theme.breakpoints.down("md")]: {
                    fontSize: "11px",
                    marginTop: "10px",
                    width: "100%",
                  },
                }}
                textAlign="center"
              >
                Về chúng tôi
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                {[
                  "Giới thiệu",
                  "Đội ngũ",
                  "Sứ mệnh",
                  "Mục tiêu",
                  "Kế hoạch phát triển",
                ].map((value, idx) => (
                  <Typography
                    sx={{
                      fontFamily: theme.primary.fontFamily,
                      fontWeight: "400",
                      fontSize: theme.primary.small,
                      color: "white",
                      marginBottom: "5px",
                      "&:hover": theme.primary.hoverDefault,
                      [theme.breakpoints.down("md")]: {
                        fontSize: "11px",
                        marginTop: "10px",
                        width: "100%",
                      },
                    }}
                    textAlign="center"
                  >
                    {value}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            borderTop: "3px solid #FFB000",
            height: "50px",
            backgroundColor: theme.primary.main,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "400",
              fontSize: theme.primary.small,
              color: "white",
              "&:hover": theme.primary.hoverDefault,
              [theme.breakpoints.down("md")]: {
                fontSize: "11px",
                marginTop: "10px",
                width: "100%",
              },
            }}
          >
            FinTrack - Tiết kiệm không khó, có FinTrack lo!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
