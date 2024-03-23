import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/material/styles";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SavingsIcon from "@mui/icons-material/Savings";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { postApi } from "../../others/database";
import { sha256 } from "js-sha256";
import { useSnackbar } from "notistack";
import { GlobalContext } from "../../context/GlobalState";
import { SERVER } from "../../constant";
import { toDateString, getCurrentTime } from "../Functions/text";
import { JOBS, UNIS } from "../../constant/index";

const Login = ({ setCurNav }) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [state, setState] = useState("signin");
  const [signInUserName, setSignInUserName] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpUserName, setSignUpUserName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");

  const [day, setDay] = useState("01");
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState("1980");
  const [job, setJob] = useState("Sinh viên");
  const [uni, setUni] = useState("Học viện Ngân hàng");

  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  const { updateConnect, updateUsername, updateName } =
    useContext(GlobalContext);

  const [isMobile, setIsMobile] = useState(false);

  const createArray = (N) => {
    return Array.apply(null, { length: N }).map(Number.call, Number);
  };

  const getYear = () => {
    var currentYear = new Date().getFullYear();
    var years = [];
    var startYear = 1980;
    for (var i = startYear; i <= currentYear; i++) {
      years.push(startYear++);
    }
    return years;
  };

  const handleChangeDay = (e) => {
    setDay(e.target.value);
  };

  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
  };

  const handleChangeYear = (e) => {
    setYear(e.target.value);
  };

  const handleChangeJob = (e) => {
    setJob(e.target.value);
  };

  const handleChangeUni = (e) => {
    setUni(e.target.value);
  };

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

  const createNewUser = async () => {
    try {
      let currentTime = getCurrentTime();
      let newUserInfo = {
        username: signUpUserName,
        password: sha256(signUpPassword),
        name: signUpName,
        birthday: day + "/" + month + "/" + year,
        createday: currentTime.day + "/" + currentTime.month + "/" + year,
        job: job,
        university: uni,
      };

      const res = await postApi(newUserInfo, `${SERVER}/user/create`);
      if (res.status === "success") {
        updateConnect(true);
        updateName(res.data.name);
        updateUsername(res.data.username);
        setCurNav("Trang chủ");
        enqueueSnackbar("Tạo tài khoản thành công!", {
          variant: "success",
          autoHideDuration: 5000,
        });
      } else if (res.status === "existed") {
        enqueueSnackbar("Tên tài khoản đã tồn tại!", {
          variant: "warning",
          autoHideDuration: 5000,
        });
      } else {
        enqueueSnackbar("Tạo tài khoản thất bại!", {
          variant: "error",
          autoHideDuration: 5000,
        });
      }
    } catch (err) {}
  };

  const logIn = async () => {
    try {
      const data = {
        username: signInUserName,
      };

      const res = await postApi(data, `${SERVER}/user/getOne`);

      const hashedPassword = sha256(signInPassword);
      if (res.status === "false") {
        enqueueSnackbar("Vui lòng đăng ký tài khoản để sử dụng", {
          variant: "error",
          autoHideDuration: 5000,
        });
      } else {
        if (hashedPassword === res.data.password) {
          updateConnect(true);
          updateName(res.data.name);
          updateUsername(res.data.username);

          let currentDate = getCurrentTime();

          postApi(
            {
              username: res.data.username,
              day: currentDate.day,
              month: currentDate.month,
              year: currentDate.year,
            },
            `${SERVER}/assets/getOne`
          ).then((res) => {});

          setCurNav("Trang chủ");
          enqueueSnackbar("Chào mừng bạn!", {
            variant: "success",
            autoHideDuration: 5000,
          });
        } else {
          enqueueSnackbar("Sai mật khẩu, vui lòng xem lại!", {
            variant: "error",
            autoHideDuration: 5000,
          });
        }
      }
    } catch (err) {}
  };

  const changeTabToSignIn = () => {
    setState("signin");
    setSignUpUserName("");
    setSignUpName("");
    setSignUpPassword("");
    setShowSignUpPassword(false);
  };

  const changeTabToSignUp = () => {
    setState("signup");
    setSignInUserName("");
    setSignInPassword("");
    setShowSignInPassword(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "70vh",
        marginTop: "50px",
        [theme.breakpoints.down("md")]: {
          marginBottom: "150px",
        },
      }}
    >
      <Grid
        container
        sx={{
          width: "60%",
          minHeight: "500px",
          backgroundColor: theme.primary.main,
          borderRadius: theme.primary.borderRadius,
          [theme.breakpoints.down("md")]: {
            width: "90%",
          },
        }}
      >
        {state === "signin" ? (
          <Grid
            xs={isMobile ? 12 : 6}
            sx={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: theme.primary.medium,
                color: "white",
                fontFamily: theme.primary.fontFamily,
                fontWeight: 600,
                [theme.breakpoints.down("md")]: {
                  fontSize: theme.primary.mediumMobile,
                },
                "&:hover": theme.primary.hoverDefault,
              }}
            >
              Chào mừng quay trở lại!
            </Typography>
            <Box sx={{ marginTop: "20px", width: "90%" }}>
              <Typography
                sx={{
                  fontSize: theme.primary.small,
                  color: "white",
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: 500,
                  marginBottom: "5px",
                  [theme.breakpoints.down("md")]: {
                    fontSize: theme.primary.smallMobile,
                  },
                  "&:hover": theme.primary.hoverDefault,
                }}
                textAlign="left"
              >
                Tên đăng nhập
              </Typography>
              <TextField
                id="outlined-basic"
                label="Tên đăng nhập"
                variant="outlined"
                value={signInUserName}
                onChange={(e) => setSignInUserName(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "50px",
                  borderRadius: theme.primary.borderRadius,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: theme.primary.borderRadius,
                      fontFamily: theme.primary.fontFamily,
                    },
                    "&.Mui-focused fieldset": {
                      border: `3px solid ${theme.primary.sub}`,
                      color: theme.primary.sub,
                    },
                  },
                  [theme.breakpoints.down("md")]: {
                    height: "50px",
                  },
                }}
                InputLabelProps={{ shrink: false, style: { fontSize: 0 } }}
              />
            </Box>

            <Box
              sx={{
                marginTop: "20px",
                width: "90%",
                [theme.breakpoints.down("md")]: {
                  marginTop: "10px",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: theme.primary.small,
                  color: "white",
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: 500,
                  marginBottom: "5px",
                  [theme.breakpoints.down("md")]: {
                    fontSize: theme.primary.smallMobile,
                  },
                  "&:hover": theme.primary.hoverDefault,
                }}
                textAlign="left"
              >
                Mật khẩu
              </Typography>
              <TextField
                id="outlined-basic"
                label="Mật khẩu"
                variant="outlined"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                type={showSignInPassword ? "text" : "password"}
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "50px",
                  borderRadius: theme.primary.borderRadius,
                  "&:hover": theme.primary.hoverDefault,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: theme.primary.borderRadius,
                      fontFamily: theme.primary.fontFamily,
                    },
                    "&.Mui-focused fieldset": {
                      border: `3px solid ${theme.primary.sub}`,
                      color: theme.primary.sub,
                    },
                  },
                  [theme.breakpoints.down("md")]: {
                    height: "50px",
                  },
                }}
                InputLabelProps={{ shrink: false, style: { fontSize: 0 } }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowSignInPassword(!showSignInPassword)}
                    >
                      {showSignInPassword ? (
                        <VisibilityOffIcon sx={{ color: "#97A8BC" }} />
                      ) : (
                        <VisibilityIcon sx={{ color: "#97A8BC" }} />
                      )}
                    </IconButton>
                  ),
                }}
              />
            </Box>

            <Button
              variant="contained"
              sx={{
                fontSize: theme.primary.small,
                color: "black",
                fontFamily: theme.primary.fontFamily,
                fontWeight: 600,
                marginBottom: "5px",
                backgroundColor: theme.primary.sub,
                borderRadius: theme.primary.borderRadius,
                width: "90%",
                marginTop: "20px",
                [theme.breakpoints.down("md")]: {
                  marginTop: "20px",
                  fontSize: theme.primary.smallMobile,
                },
              }}
              onClick={() => logIn()}
            >
              Đăng nhập
            </Button>
            <Box
              sx={{
                width: "90%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "5px",
              }}
            >
              <Box
                sx={{
                  width: "40%",
                  height: "1px",
                  backgroundColor: "white",
                  borderRadius: theme.primary.borderRadius,
                }}
              ></Box>
              <Typography
                sx={{
                  fontSize: theme.primary.small,
                  color: "white",
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: 500,
                  "&:hover": theme.primary.hoverDefault,
                  [theme.breakpoints.down("md")]: {
                    fontSize: theme.primary.smallMobile,
                  },
                }}
              >
                hoặc
              </Typography>
              <Box
                sx={{
                  width: "40%",
                  height: "1px",
                  backgroundColor: "white",
                  borderRadius: theme.primary.borderRadius,
                }}
              ></Box>
            </Box>
            <Box
              sx={{
                width: "90%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
                [theme.breakpoints.down("md")]: {
                  flexDirection: "column",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: theme.primary.small,
                  color: "white",
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: 500,
                  "&:hover": theme.primary.hoverDefault,
                  [theme.breakpoints.down("md")]: {
                    fontSize: theme.primary.smallMobile,
                    marginBottom: "10px",
                  },
                }}
              >
                Chưa có tài khoản?
              </Typography>
              <Button
                variant="contained"
                sx={{
                  fontSize: theme.primary.small,
                  color: "black",
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: 600,
                  backgroundColor: "white",
                  borderRadius: theme.primary.borderRadius,
                  width: "180px",
                  [theme.breakpoints.down("md")]: {
                    fontSize: theme.primary.smallMobile,
                  },
                }}
                onClick={() => changeTabToSignUp()}
              >
                Đăng ký ngay
              </Button>
            </Box>
          </Grid>
        ) : (
          <Grid
            xs={isMobile ? 12 : 6}
            sx={{
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.primary.sub,
              borderTopLeftRadius: theme.primary.borderRadius,
              borderBottomLeftRadius: theme.primary.borderRadius,
              [theme.breakpoints.down("md")]: {
                borderTopLeftRadius: theme.primary.borderRadius,
                borderTopRightRadius: theme.primary.borderRadius,
                borderBottomLeftRadius: 0,
              },
            }}
          >
            <Typography
              sx={{
                fontSize: theme.primary.semiBig,
                color: theme.primary.main,
                fontFamily: theme.primary.fontFamily,
                fontWeight: 800,
                "&:hover": theme.primary.hoverDefault,
                [theme.breakpoints.down("md")]: {
                  fontSize: theme.primary.mediumMobile,
                },
              }}
              textAlign="center"
            >
              Bắt đầu lộ trình tài chính cá nhân tuyệt vời!
            </Typography>
            <SavingsIcon
              sx={{
                fontSize: 200,
                color: theme.primary.main,
                [theme.breakpoints.down("md")]: {
                  fontSize: 100,
                },
              }}
            />
          </Grid>
        )}

        {state === "signup" ? (
          <Grid
            xs={isMobile ? 12 : 6}
            sx={{
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: theme.primary.medium,
                color: "white",
                fontFamily: theme.primary.fontFamily,
                fontWeight: 600,
                "&:hover": theme.primary.hoverDefault,
                [theme.breakpoints.down("md")]: {
                  fontSize: theme.primary.small,
                },
              }}
              textAlign="center"
            >
              Chào mừng bạn!
            </Typography>
            <Box sx={{ marginTop: "20px", width: "90%" }}>
              <Typography
                sx={{
                  fontSize: theme.primary.small,
                  color: "white",
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: 500,
                  marginBottom: "5px",
                  "&:hover": theme.primary.hoverDefault,
                  [theme.breakpoints.down("md")]: {
                    fontSize: theme.primary.smallMobile,
                  },
                }}
                textAlign="left"
              >
                Tên đăng nhập
              </Typography>
              <TextField
                id="outlined-basic"
                label="Tên đăng nhập"
                variant="outlined"
                value={signUpUserName}
                onChange={(e) => setSignUpUserName(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                  borderRadius: theme.primary.borderRadius,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: theme.primary.borderRadius,
                      fontFamily: theme.primary.fontFamily,
                    },
                    "&.Mui-focused fieldset": {
                      border: `3px solid ${theme.primary.sub}`,
                      color: theme.primary.sub,
                    },
                  },
                }}
                InputLabelProps={{ shrink: false, style: { fontSize: 0 } }}
                inputProps={{
                  style: {
                    height: "5px",
                  },
                }}
              />
            </Box>

            <Box sx={{ marginTop: "10px", width: "90%" }}>
              <Typography
                sx={{
                  fontSize: theme.primary.small,
                  color: "white",
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: 500,
                  marginBottom: "5px",
                  "&:hover": theme.primary.hoverDefault,
                  [theme.breakpoints.down("md")]: {
                    fontSize: theme.primary.smallMobile,
                  },
                }}
                textAlign="left"
              >
                Mật khẩu
              </Typography>
              <TextField
                id="outlined-basic"
                label="Mật khẩu"
                variant="outlined"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                type={showSignUpPassword ? "text" : "password"}
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                  borderRadius: theme.primary.borderRadius,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: theme.primary.borderRadius,
                      fontFamily: theme.primary.fontFamily,
                    },
                    "&.Mui-focused fieldset": {
                      border: `3px solid ${theme.primary.sub}`,
                      color: theme.primary.sub,
                    },
                  },
                }}
                inputProps={{
                  style: {
                    height: "5px",
                  },
                }}
                InputLabelProps={{ shrink: false, style: { fontSize: 0 } }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                    >
                      {showSignUpPassword ? (
                        <VisibilityOffIcon sx={{ color: "#97A8BC" }} />
                      ) : (
                        <VisibilityIcon sx={{ color: "#97A8BC" }} />
                      )}
                    </IconButton>
                  ),
                }}
              />
            </Box>

            <Box sx={{ marginTop: "10px", width: "90%" }}>
              <Typography
                sx={{
                  fontSize: theme.primary.small,
                  color: "white",
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: 500,
                  marginBottom: "5px",
                  "&:hover": theme.primary.hoverDefault,
                  [theme.breakpoints.down("md")]: {
                    fontSize: theme.primary.smallMobile,
                  },
                }}
                textAlign="left"
              >
                Họ và tên
              </Typography>
              <TextField
                id="outlined-basic"
                label="Họ và tên"
                variant="outlined"
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                  borderRadius: theme.primary.borderRadius,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: theme.primary.borderRadius,
                      fontFamily: theme.primary.fontFamily,
                    },
                    "&.Mui-focused fieldset": {
                      border: `3px solid ${theme.primary.sub}`,
                      color: theme.primary.sub,
                    },
                  },
                }}
                InputLabelProps={{ shrink: false, style: { fontSize: 0 } }}
                inputProps={{
                  style: {
                    height: "5px",
                  },
                }}
              />
            </Box>

            <Box sx={{ marginTop: "10px", width: "90%" }}>
              <Typography
                sx={{
                  fontSize: theme.primary.small,
                  color: "white",
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: 500,
                  marginBottom: "5px",
                  "&:hover": theme.primary.hoverDefault,
                  [theme.breakpoints.down("md")]: {
                    fontSize: theme.primary.smallMobile,
                  },
                }}
                textAlign="left"
              >
                Ngày sinh
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControl sx={{ minWidth: 60, height: "40px" }}>
                  <Select
                    value={day}
                    onChange={handleChangeDay}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      backgroundColor: "white",
                      width: "100%",
                      height: "40px",
                      borderRadius: theme.primary.borderRadius,
                    }}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
                  >
                    {createArray(31).map((value, id) => (
                      <MenuItem value={toDateString(value + 1)} key={id}>
                        {toDateString(value + 1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Typography
                  sx={{
                    fontSize: theme.primary.small,
                    color: "white",
                    fontFamily: theme.primary.fontFamily,
                    fontWeight: 700,
                    marginRight: "5px",
                    "&:hover": theme.primary.hoverDefault,
                    [theme.breakpoints.down("md")]: {
                      fontSize: theme.primary.smallMobile,
                      marginBottom: "10px",
                      marginRight: "0px",
                    },
                  }}
                >
                  /
                </Typography>

                <FormControl sx={{ minWidth: 60, height: "40px" }}>
                  <Select
                    value={month}
                    onChange={handleChangeMonth}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      backgroundColor: "white",
                      width: "100%",
                      height: "40px",
                      borderRadius: theme.primary.borderRadius,
                    }}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
                  >
                    {createArray(12).map((value, id) => (
                      <MenuItem value={toDateString(value + 1)} key={id}>
                        {toDateString(value + 1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Typography
                  sx={{
                    fontSize: theme.primary.small,
                    color: "white",
                    fontFamily: theme.primary.fontFamily,
                    fontWeight: 700,
                    marginRight: "5px",
                    "&:hover": theme.primary.hoverDefault,
                    [theme.breakpoints.down("md")]: {
                      fontSize: theme.primary.smallMobile,
                      marginBottom: "10px",
                      marginRight: "0px",
                    },
                  }}
                >
                  /
                </Typography>

                <FormControl sx={{ minWidth: 60, height: "40px" }}>
                  <Select
                    value={year}
                    onChange={handleChangeYear}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      backgroundColor: "white",
                      width: "100%",
                      height: "40px",
                      borderRadius: theme.primary.borderRadius,
                    }}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
                  >
                    {getYear().map((value, id) => (
                      <MenuItem value={toDateString(value)} key={id}>
                        {toDateString(value)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box sx={{ marginTop: "10px", width: "90%" }}>
              <Typography
                sx={{
                  fontSize: theme.primary.small,
                  color: "white",
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: 500,
                  marginBottom: "5px",
                  "&:hover": theme.primary.hoverDefault,
                  [theme.breakpoints.down("md")]: {
                    fontSize: theme.primary.smallMobile,
                  },
                }}
                textAlign="left"
              >
                Nghề nghiệp
              </Typography>
              <Select
                value={job}
                onChange={handleChangeJob}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "40px",
                  borderRadius: theme.primary.borderRadius,
                }}
                MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
              >
                {JOBS.map((value, id) => (
                  <MenuItem value={value} key={id}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {job === "Sinh viên" ? (
              <Box sx={{ marginTop: "10px", width: "90%" }}>
                <Typography
                  sx={{
                    fontSize: theme.primary.small,
                    color: "white",
                    fontFamily: theme.primary.fontFamily,
                    fontWeight: 500,
                    marginBottom: "5px",
                    "&:hover": theme.primary.hoverDefault,
                    [theme.breakpoints.down("md")]: {
                      fontSize: theme.primary.smallMobile,
                    },
                  }}
                  textAlign="left"
                >
                  Trường học
                </Typography>
                <Select
                  value={uni}
                  onChange={handleChangeUni}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    backgroundColor: "white",
                    width: "100%",
                    height: "40px",
                    borderRadius: theme.primary.borderRadius,
                  }}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}
                >
                  {UNIS.map((value, id) => (
                    <MenuItem value={value} key={id}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            ) : (
              ""
            )}

            <Button
              variant="contained"
              sx={{
                fontSize: theme.primary.small,
                color: "black",
                fontFamily: theme.primary.fontFamily,
                fontWeight: 600,
                marginBottom: "5px",
                backgroundColor: theme.primary.sub,
                borderRadius: theme.primary.borderRadius,
                width: "90%",
                marginTop: "20px",
                [theme.breakpoints.down("md")]: {
                  fontSize: theme.primary.smallMobile,
                },
              }}
              onClick={() => createNewUser()}
            >
              Đăng ký
            </Button>
            <Box
              sx={{
                width: "90%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "5px",
              }}
            >
              <Box
                sx={{
                  width: "40%",
                  height: "1px",
                  backgroundColor: "white",
                  borderRadius: theme.primary.borderRadius,
                }}
              ></Box>
              <Typography
                sx={{
                  fontSize: theme.primary.small,
                  color: "white",
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: 500,
                  "&:hover": theme.primary.hoverDefault,
                  [theme.breakpoints.down("md")]: {
                    fontSize: theme.primary.smallMobile,
                  },
                }}
              >
                hoặc
              </Typography>
              <Box
                sx={{
                  width: "40%",
                  height: "1px",
                  backgroundColor: "white",
                  borderRadius: theme.primary.borderRadius,
                }}
              ></Box>
            </Box>
            <Box
              sx={{
                width: "90%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
                [theme.breakpoints.down("md")]: {
                  flexDirection: "column",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: theme.primary.small,
                  color: "white",
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: 500,
                  marginRight: "5px",
                  "&:hover": theme.primary.hoverDefault,
                  [theme.breakpoints.down("md")]: {
                    fontSize: theme.primary.smallMobile,
                    marginBottom: "10px",
                    marginRight: "0px",
                  },
                }}
              >
                Đã có tài khoản?
              </Typography>
              <Button
                variant="contained"
                sx={{
                  fontSize: theme.primary.small,
                  color: "black",
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: 600,
                  backgroundColor: "white",
                  borderRadius: theme.primary.borderRadius,
                  width: "130px",
                  [theme.breakpoints.down("md")]: {
                    fontSize: theme.primary.smallMobile,
                  },
                }}
                onClick={() => changeTabToSignIn()}
              >
                Đăng nhập
              </Button>
            </Box>
          </Grid>
        ) : (
          <Grid
            xs={isMobile ? 12 : 6}
            sx={{
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.primary.sub,
              borderTopRightRadius: theme.primary.borderRadius,
              borderBottomRightRadius: theme.primary.borderRadius,
              [theme.breakpoints.down("md")]: {
                borderBottomLeftRadius: theme.primary.borderRadius,
                borderBottomRightRadius: theme.primary.borderRadius,
                borderTopRightRadius: 0,
              },
            }}
          >
            <Typography
              sx={{
                fontSize: theme.primary.semiBig,
                color: theme.primary.main,
                fontFamily: theme.primary.fontFamily,
                fontWeight: 800,
                "&:hover": theme.primary.hoverDefault,
                [theme.breakpoints.down("md")]: {
                  fontSize: theme.primary.mediumMobile,
                },
              }}
              textAlign="center"
            >
              Quản lý tài chính và tiết kiệm cùng FinTrack!
            </Typography>
            <HandshakeIcon
              sx={{
                fontSize: 200,
                color: theme.primary.main,
                [theme.breakpoints.down("md")]: {
                  fontSize: 100,
                },
              }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Login;
