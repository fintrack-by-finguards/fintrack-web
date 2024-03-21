import { useState, useContext } from "react";
import { Box, Typography, Container, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { getCurrentTime, inputMoneyToNum } from "../../Pages/Functions/text";
import { SERVER } from "../../constant/index";
import { postApi } from "../../others/database";
import { GlobalContext } from "../../context/GlobalState";
import NumberInput from "../NumberInput";

const ProvideInformation = ({ provideDone, setProvideDone, setCurNav }) => {
  const currentTime = getCurrentTime();
  const theme = useTheme();
  const { username } = useContext(GlobalContext);

  const [start, setStart] = useState(false);
  const [income, setIncome] = useState(0);
  const [asset1, setAsset1] = useState(0);
  const [asset2, setAsset2] = useState(0);
  const [asset3, setAsset3] = useState(0);
  const [asset4, setAsset4] = useState(0);
  const [asset5, setAsset5] = useState(0);
  const [debt1, setDebt1] = useState(0);
  const [debt2, setDebt2] = useState(0);
  const [debt3, setDebt3] = useState(0);
  const [debt4, setDebt4] = useState(0);

  const handleSubmit = async () => {
    let curAssets = [0, 0, 0, 0, 0];
    curAssets[0] = asset1 !== "" ? inputMoneyToNum(asset1) : 0;
    curAssets[1] = asset2 !== "" ? inputMoneyToNum(asset2) : 0;
    curAssets[2] = asset3 !== "" ? inputMoneyToNum(asset3) : 0;
    curAssets[3] = asset4 !== "" ? inputMoneyToNum(asset4) : 0;
    curAssets[4] = asset5 !== "" ? inputMoneyToNum(asset5) : 0;

    let curDebts = [0, 0, 0, 0];
    curDebts[0] = debt1 !== "" ? inputMoneyToNum(debt1) : 0;
    curDebts[1] = debt2 !== "" ? inputMoneyToNum(debt2) : 0;
    curDebts[2] = debt3 !== "" ? inputMoneyToNum(debt3) : 0;
    curDebts[3] = debt4 !== "" ? inputMoneyToNum(debt4) : 0;

    await postApi(
      {
        username: username,
        day: currentTime.day,
        month: currentTime.month,
        year: currentTime.year,
        assets: curAssets,
        debt: curDebts,
      },
      `${SERVER}/assets/create`
    ).then((res) => {});

    let userData = await postApi(
      { username: username },
      `${SERVER}/user/getOne`
    );

    postApi(
      {
        username: username,
        name: userData.data.name,
        birthday: userData.data.birthday,
        job: userData.data.job,
        university: userData.data.university,
        income: income !== "" ? inputMoneyToNum(income) : 0,
        activate: true,
      },
      `${SERVER}/user/update`
    ).then((res) => {
      setProvideDone(!provideDone);
      setCurNav("Trang chủ");
    });
  };

  return (
    <Container
      sx={{
        backgroundColor: start ? "white" : theme.primary.main,
        padding: "50px",
        marginTop: "50px",
        marginBottom: "50px",
        width: "100%",
        borderRadius: theme.primary.borderRadius,
        boxShadow: start ? 3 : 0,
      }}
    >
      {!start ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "600",
              fontSize: theme.primary.medium,
              color: "white",
              "&:hover": theme.primary.hoverDefault,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
            }}
            textAlign={"justify"}
          >
            Vui lòng cung cấp các thông tin tài chính cơ bản!
          </Typography>
          <LockOpenIcon
            sx={{ fontSize: "200px", color: "white", marginTop: "50px" }}
          />
          <Button
            sx={{
              backgroundColor: theme.primary.sub,
              fontFamily: theme.primary.fontFamily,
              color: theme.primary.main,
              fontSize: "2.5vh",
              fontWeight: 600,
              marginTop: "20px",
            }}
            onClick={() => setStart(true)}
          >
            Bắt đầu
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            paddingLeft: "100px",
            paddingRight: "100px",
          }}
        >
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "600",
              fontSize: theme.primary.medium,
              color: theme.primary.main,
              "&:hover": theme.primary.hoverDefault,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
            }}
            textAlign={"center"}
          >
            Vui lòng cung cấp các thông tin bên dưới
          </Typography>
          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "400",
              fontSize: theme.primary.small,
              color: "grey",
              fontStyle: "italic",
              "&:hover": theme.primary.hoverDefault,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
            }}
            textAlign={"center"}
          >
            Lưu ý: Mục nào không có vui lòng điền 0
          </Typography>

          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "600",
              fontSize: theme.primary.medium,
              marginTop: "50px",
              color: theme.primary.main,
              "&:hover": theme.primary.hoverDefault,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
            }}
            textAlign={"justify"}
          >
            1. Thu nhập
          </Typography>
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              sx={{
                fontSize: theme.primary.small,
                color: theme.primary.main,
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
              Thu nhập của bạn là (đơn vị: đ)
            </Typography>
            <NumberInput value={income} onChange={setIncome} />
          </Box>

          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "600",
              fontSize: theme.primary.medium,
              color: theme.primary.main,
              marginTop: "50px",
              "&:hover": theme.primary.hoverDefault,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
            }}
            textAlign={"justify"}
          >
            2. Tài sản
          </Typography>

          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              sx={{
                fontSize: theme.primary.small,
                color: theme.primary.main,
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
              Tài sản bằng <b>"Tiền mặt"</b> của bạn (đơn vị: đ)
            </Typography>
            <NumberInput value={asset1} onChange={setAsset1} />
          </Box>

          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              sx={{
                fontSize: theme.primary.small,
                color: theme.primary.main,
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
              Tài sản bằng <b>"Tiền gửi ngân hàng"</b> của bạn (đơn vị: đ)
            </Typography>
            <NumberInput value={asset2} onChange={setAsset2} />
          </Box>

          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              sx={{
                fontSize: theme.primary.small,
                color: theme.primary.main,
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
              Tài sản <b>"Cho vay"</b> của bạn (đơn vị: đ)
            </Typography>
            <NumberInput value={asset3} onChange={setAsset3} />
          </Box>

          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              sx={{
                fontSize: theme.primary.small,
                color: theme.primary.main,
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
              Tài sản dưới dạng <b>"Đầu tư"</b> của bạn (đơn vị: đ)
            </Typography>
            <NumberInput value={asset4} onChange={setAsset4} />
          </Box>

          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              sx={{
                fontSize: theme.primary.small,
                color: theme.primary.main,
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
              Tài sản dưới dạng <b>"Bất động sản"</b> của bạn (đơn vị: đ)
            </Typography>
            <NumberInput value={asset5} onChange={setAsset5} />
          </Box>

          <Typography
            sx={{
              fontFamily: theme.primary.fontFamily,
              fontWeight: "600",
              fontSize: theme.primary.medium,
              color: theme.primary.main,
              marginTop: "50px",
              "&:hover": theme.primary.hoverDefault,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.smallMobile,
              },
            }}
            textAlign={"justify"}
          >
            3. Nợ
          </Typography>

          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              sx={{
                fontSize: theme.primary.small,
                color: theme.primary.main,
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
              Khoản nợ <b>"Tiền mặt"</b> của bạn (đơn vị: đ)
            </Typography>
            <NumberInput value={debt1} onChange={setDebt1} />
          </Box>

          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              sx={{
                fontSize: theme.primary.small,
                color: theme.primary.main,
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
              Khoản nợ <b>"Trả góp"</b> của bạn (đơn vị: đ)
            </Typography>
            <NumberInput value={debt2} onChange={setDebt2} />
          </Box>
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              sx={{
                fontSize: theme.primary.small,
                color: theme.primary.main,
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
              Khoản nợ <b>"Thế chấp"</b> của bạn (đơn vị: đ)
            </Typography>
            <NumberInput value={debt3} onChange={setDebt3} />
          </Box>
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              sx={{
                fontSize: theme.primary.small,
                color: theme.primary.main,
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
              Khoản nợ <b>"Thấu chi"</b> của bạn (đơn vị: đ)
            </Typography>
            <NumberInput value={debt4} onChange={setDebt4} />
          </Box>
          <Button
            sx={{
              backgroundColor: theme.primary.sub,
              fontFamily: theme.primary.fontFamily,
              color: theme.primary.main,
              fontSize: "2.5vh",
              fontWeight: 600,
              marginTop: "50px",
            }}
            onClick={() => handleSubmit()}
          >
            Xác nhận
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ProvideInformation;
