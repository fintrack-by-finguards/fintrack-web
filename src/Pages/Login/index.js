import React, { useState, useContext } from "react";
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
import { postApi } from "../../others/database";
import { sha256 } from "js-sha256";
import { useSnackbar } from "notistack";
import { GlobalContext } from "../../context/GlobalState";

const Login = ({ setCurNav }) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [state, setState] = useState("signin");
  const [signInUserName, setSignInUserName] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpUserName, setSignUpUserName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");

  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  const { name, updateConnect, updateUsername, updateName } =
    useContext(GlobalContext);

  console.log(name);

  const createNewUser = async () => {
    try {
      let newUserInfo = {
        name: signUpName,
        password: sha256(signUpPassword),
        username: signUpUserName,
      };
      const res = await postApi(
        newUserInfo,
        "http://localhost:8000/user/create"
      );
      if (res.status === "success") {
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
          variant: "success",
          autoHideDuration: 5000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logIn = async () => {
    try {
      const data = {
        username: signInUserName,
      };
      const res = await postApi(data, "http://localhost:8000/user/getOne");
      const hashedPassword = sha256(signInPassword);
      if (hashedPassword === res.data.password) {
        updateConnect(true);
        updateName(res.data.name);
        updateUsername(res.data.username);
        setCurNav("Tính năng");
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
    } catch (err) {
      console.log(err);
    }
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
        marginBottom: "50px",
      }}
    >
      <Grid
        container
        sx={{
          width: "60%",
          height: "500px",
          backgroundColor: theme.primary.main,
          borderRadius: theme.primary.borderRadius,
        }}
      >
        {state === "signin" ? (
          <Grid
            xs={6}
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
                }}
                InputLabelProps={{ shrink: false, style: { fontSize: 0 } }}
              />
            </Box>

            <Box sx={{ marginTop: "20px", width: "90%" }}>
              <Typography
                sx={{
                  fontSize: theme.primary.small,
                  color: "white",
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: 500,
                  marginBottom: "5px",
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
              }}
            >
              <Typography
                sx={{
                  fontSize: theme.primary.small,
                  color: "white",
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: 500,
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
                  width: "150px",
                }}
                onClick={() => changeTabToSignUp()}
              >
                Đăng ký ngay
              </Button>
            </Box>
          </Grid>
        ) : (
          <Grid
            xs={6}
            sx={{
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.primary.sub,
              borderTopLeftRadius: theme.primary.borderRadius,
              borderBottomLeftRadius: theme.primary.borderRadius,
            }}
          >
            <Typography
              sx={{
                fontSize: theme.primary.semiBig,
                color: theme.primary.main,
                fontFamily: theme.primary.fontFamily,
                fontWeight: 800,
              }}
              textAlign="center"
            >
              Bắt đầu lộ trình tài chính cá nhân tuyệt vời!
            </Typography>
            <SavingsIcon
              sx={{
                fontSize: 200,
                color: theme.primary.main,
              }}
            />
          </Grid>
        )}

        {state === "signup" ? (
          <Grid
            xs={6}
            sx={{
              padding: "10px",
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
              }}
              textAlign="center"
            >
              Chào mừng bạn đến với FinTrack!
            </Typography>
            <Box sx={{ marginTop: "20px", width: "90%" }}>
              <Typography
                sx={{
                  fontSize: theme.primary.small,
                  color: "white",
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: 500,
                  marginBottom: "5px",
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
                }}
                InputLabelProps={{ shrink: false, style: { fontSize: 0 } }}
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
                }}
                InputLabelProps={{ shrink: false, style: { fontSize: 0 } }}
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
              }}
            >
              <Typography
                sx={{
                  fontSize: theme.primary.small,
                  color: "white",
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: 500,
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
                  width: "150px",
                }}
                onClick={() => changeTabToSignIn()}
              >
                Đăng nhập
              </Button>
            </Box>
          </Grid>
        ) : (
          <Grid
            xs={6}
            sx={{
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.primary.sub,
              borderTopRightRadius: theme.primary.borderRadius,
              borderBottomRightRadius: theme.primary.borderRadius,
            }}
          >
            <Typography
              sx={{
                fontSize: theme.primary.semiBig,
                color: theme.primary.main,
                fontFamily: theme.primary.fontFamily,
                fontWeight: 800,
              }}
              textAlign="center"
            >
              Quản lý tài chính và tiết kiệm cùng FinTrack!
            </Typography>
            <HandshakeIcon
              sx={{
                fontSize: 200,
                color: theme.primary.main,
              }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Login;
