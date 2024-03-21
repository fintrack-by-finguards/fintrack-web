import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Container,
  TableBody,
  TableContainer,
  Paper,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { GlobalContext } from "../../context/GlobalState";
import Rating from "@mui/material/Rating";
// import Suggest from "../../assets/Suggest.png";
import { storage } from "../../others/firebase";
import { useSnackbar } from "notistack";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { postApi } from "../../others/database";
import CircleIcon from "@mui/icons-material/Circle";
import { SERVER } from "../../constant";

const Experiment = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [billData, setBillData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [star, setStar] = useState(5);
  const [comment, setComment] = useState("");

  const { username } = useContext(GlobalContext);

  const [curComment, setCurComment] = useState(0);
  const [curPoint, setCurPoint] = useState(0);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    postApi({}, `${SERVER}/comment/count`).then((res) =>
      setCurComment(res.data)
    );
    postApi({}, `${SERVER}/comment/point`).then((res) => setCurPoint(res.data));
  }, [refresh]);

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
  // const { name } = useContext(GlobalContext);

  const [image, setImage] = useState(null); // state lưu ảnh sau khi chọn
  const [progress, setProgress] = useState(0); // state hiển thị phần trăm tải ảnh lên store
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType === "image/jpeg" || fileType === "image/png") {
        setImage(file);
      } else {
        alert("Only JPG/PNG files are allowed.");
        // Optionally, clear the file input here if wrong type
      }
    }
  };
  const handleUpload = () => {
    const imageType = image.type;
    const metadata = {
      contentType: imageType, // This sets the appropriate MIME type for the image
    };

    const storageRef = ref(storage, `images/${image.name}`); // tạo 1 địa chỉ để chứa ảnh chuẩn bị tải lên store
    const uploadTask = uploadBytesResumable(storageRef, image, metadata); // hàm tải ảnh lên store
    // Đoạn code này để tạo tính năng lắng nghe quá trình tải ảnh, trả về tiến trình để làm tính năng phần trăm tải ảnh
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        enqueueSnackbar("Đăng tải ảnh thất bại, xin vui lòng thử lại!", {
          variant: "error",
          autoHideDuration: 5000,
        });
      },
      () => {
        // Xử lý trường hợp tải ảnh thành công
        //  Lấy về đường link của ảnh vừa tải thành công
        enqueueSnackbar("Đăng tải ảnh thành công!", {
          variant: "success",
          autoHideDuration: 5000,
        });
        setBillData({});

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // alert("Upload image successfully, download URL: " + downloadURL);
          // reset các trạng thái sau khi tải ảnh thành công
          // setImage(null);
          // setProgress(0);
          console.log("File available at", downloadURL);
          try {
            setLoading(true);
            postApi({ url: downloadURL }, `${SERVER}/bill/`).then((res) => {
              try {
                if ("error" in res.data) {
                  console.log("Không thể xử lý hình ảnh, vui lòng thử lại!");
                  setLoading(false);
                  setError(true);
                } else {
                  setBillData(res.data);
                  setError(false);
                  setLoading(false);
                }
              } catch {
                setError(true);
                setError(false);
                setLoading(false);
              }
            });
          } catch (err) {}
        });
      }
    );
  };

  const sendComment = async () => {
    let res = await postApi(
      {
        img_url: URL.createObjectURL(image),
        username: username,
        point: star,
        data: billData,
        comment: comment,
      },
      `${SERVER}/comment/create`
    );
    enqueueSnackbar("Gửi đánh giá thành công, cảm ơn bạn đã góp ý!", {
      variant: "success",
      autoHideDuration: 5000,
    });
    setRefresh(!refresh);
  };

  return (
    <Box>
      {username ? (
        <Box>
          <Container
            sx={{
              backgroundColor: "white",
              marginTop: "30px",
              paddingTop: "30px",
              display: "flex",
              alignItems: "flex-start",
              minHeight: "20vh",
              justifyContent: "space-around",
              borderRadius: theme.primary.borderRadius,
              [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                width: "90%",
                minHeight: "20vh",
                justifyContent: "center",
                marginTop: "5px",
              },
            }}
          >
            <Grid container>
              <Grid xs={isMobile ? 12 : 6}>
                <Box
                  sx={{
                    backgroundColor: theme.primary.main,
                    borderRadius: theme.primary.borderRadius,
                    padding: "20px",
                    width: "80%",
                    margin: "0 auto",
                    [theme.breakpoints.down("md")]: {
                      width: "90%",
                      marginBottom: "20px",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: theme.primary.medium,
                      color: theme.primary.sub,
                      fontFamily: theme.primary.fontFamily,
                      fontWeight: 600,
                      "&:hover": theme.primary.hoverDefault,
                      [theme.breakpoints.down("md")]: {
                        fontSize: theme.primary.mediumMobile,
                      },
                    }}
                  >
                    Số lượt thử nghiệm
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: theme.primary.big,
                      color: "white",
                      fontFamily: theme.primary.fontFamily,
                      fontWeight: 600,
                      "&:hover": theme.primary.hoverDefault,
                      [theme.breakpoints.down("md")]: {
                        fontSize: theme.primary.mediumMobile,
                      },
                    }}
                  >
                    {curComment}
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={isMobile ? 12 : 6}>
                <Box
                  sx={{
                    backgroundColor: theme.primary.main,
                    borderRadius: theme.primary.borderRadius,
                    padding: "20px",
                    width: "80%",
                    margin: "0 auto",
                    [theme.breakpoints.down("md")]: {
                      width: "90%",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: theme.primary.medium,
                      color: theme.primary.sub,
                      fontFamily: theme.primary.fontFamily,
                      fontWeight: 600,
                      "&:hover": theme.primary.hoverDefault,
                      [theme.breakpoints.down("md")]: {
                        fontSize: theme.primary.mediumMobile,
                      },
                    }}
                  >
                    Điểm đánh giá trung bình
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: theme.primary.big,
                      color: "white",
                      fontFamily: theme.primary.fontFamily,
                      fontWeight: 600,
                      "&:hover": theme.primary.hoverDefault,
                      [theme.breakpoints.down("md")]: {
                        fontSize: theme.primary.mediumMobile,
                      },
                    }}
                  >
                    {curPoint}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
          <Container
            sx={{
              backgroundColor: theme.primary.main,
              marginTop: "30px",
              marginBottom: "100px",
              paddingTop: "30px",
              paddingBottom: "50px",
              display: "flex",
              alignItems: "flex-start",
              minHeight: "40vh",
              justifyContent: "space-around",
              borderRadius: theme.primary.borderRadius,
              [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                width: "90%",
                minHeight: "50vh",
                justifyContent: "center",
                marginBottom: "150px",
              },
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: theme.primary.borderRadius,
                width: "30%",
                [theme.breakpoints.down("md")]: {
                  width: "90%",
                  padding: "10px",
                  margin: "0 auto",
                },
              }}
            >
              <Box className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                <Box className="mb-4">
                  {isMobile ? (
                    <Box
                      sx={{
                        backgroundColor: theme.primary.sub,
                        padding: "10px",
                        width: image ? "150px" : "100px",
                        margin: "10px auto",
                        borderRadius: theme.primary.borderRadius,
                        "&hover:": theme.primary.hoverPointer,
                      }}
                    >
                      <label class="custom-file-upload-small">
                        <input type="file" onChange={handleChange} />
                        {image ? "Chọn ảnh khác" : "Chọn ảnh"}
                      </label>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        backgroundColor: theme.primary.sub,
                        padding: "10px",
                        width: image ? "150px" : "100px",
                        margin: "10px auto",
                        borderRadius: theme.primary.borderRadius,
                        "&hover:": theme.primary.hoverPointer,
                      }}
                    >
                      <label class="custom-file-upload">
                        <input type="file" onChange={handleChange} />
                        {image ? "Chọn ảnh khác" : "Chọn ảnh"}
                      </label>
                    </Box>
                  )}
                  {image && (
                    <Typography
                      sx={{
                        fontSize: theme.primary.small,
                        color: theme.primary.main,
                        fontFamily: theme.primary.fontFamily,
                        fontWeight: 500,
                        "&:hover": theme.primary.hoverDefault,
                        [theme.breakpoints.down("md")]: {
                          fontSize: theme.primary.smallMobile,
                        },
                      }}
                    >
                      {image.name.length > 30
                        ? image.name.slice(0, 15) +
                          " ... " +
                          image.name.slice(
                            image.name.length - 15,
                            image.name.length
                          )
                        : image.name}
                    </Typography>
                  )}
                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="mt-2 rounded-lg shadow-md"
                      style={{ maxWidth: "100%", maxHeight: "300px" }}
                    />
                  )}
                </Box>
                {progress > 0 && (
                  <progress value={progress} max="100" className="w-full" />
                )}
                {image && (
                  <Box
                    onClick={handleUpload}
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
                      padding: "10px",
                      margin: "10px auto",
                      [theme.breakpoints.down("md")]: {
                        marginTop: "20px",
                        fontSize: theme.primary.smallMobile,
                      },
                    }}
                  >
                    Tải ảnh lên
                  </Box>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                backgroundColor: "white",
                width: "60%",
                borderRadius: theme.primary.borderRadius,
                [theme.breakpoints.down("md")]: {
                  width: "90%",
                  padding: "10px",
                  margin: "0 auto",
                  marginTop: "50px",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: theme.primary.medium,
                  color: theme.primary.main,
                  fontFamily: theme.primary.fontFamily,
                  fontWeight: 600,
                  marginTop: "20px",
                  marginBottom: "20px",
                  "&:hover": theme.primary.hoverDefault,
                  [theme.breakpoints.down("md")]: {
                    fontSize: theme.primary.mediumMobile,
                  },
                }}
              >
                Kết quả
              </Typography>
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress sx={{ color: "green" }} />
                  <Typography
                    sx={{
                      fontSize: theme.primary.semi,
                      color: "green",
                      fontFamily: theme.primary.fontFamily,
                      fontWeight: 600,
                      marginBottom: "20px",
                      marginTop: "10px",
                      "&:hover": theme.primary.hoverDefault,
                      [theme.breakpoints.down("md")]: {
                        fontSize: theme.primary.smallMobile,
                      },
                    }}
                  >
                    Đang xử lý!
                  </Typography>
                </Box>
              ) : (
                ""
              )}
              {error ? (
                <Typography
                  sx={{
                    fontSize: theme.primary.semi,
                    color: "red",
                    fontFamily: theme.primary.fontFamily,
                    fontWeight: 600,
                    marginBottom: "20px",
                    "&:hover": theme.primary.hoverDefault,
                    [theme.breakpoints.down("md")]: {
                      fontSize: theme.primary.smallMobile,
                    },
                  }}
                >
                  Không thể xử lý hình ảnh, vui lòng thử lại!
                </Typography>
              ) : (
                ""
              )}
              {billData ? (
                <Box sx={{ padding: "20px" }}>
                  {Object.keys(billData).map((key, index) => {
                    if (key !== "Sản phẩm") {
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems:
                              key === "Địa chỉ" ? "flex-start" : "center",
                          }}
                        >
                          <CircleIcon
                            sx={{
                              color: theme.primary.main,
                              fontSize: "8px",
                              marginRight: "10px",
                              marginTop: key === "Địa chỉ" ? "5px" : "",
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "1.7vh",
                              color: theme.primary.main,
                              fontFamily: theme.primary.fontFamily,
                              fontWeight: 600,
                              "&:hover": theme.primary.hoverDefault,
                              [theme.breakpoints.down("md")]: {
                                fontSize: theme.primary.smallMobile,
                              },
                              textAlign: "left",
                            }}
                          >
                            {key}: {billData[key]}
                          </Typography>
                        </Box>
                      );
                    } else {
                      if (billData.length === 0) {
                        return (
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CircleIcon
                              sx={{
                                color: theme.primary.main,
                                fontSize: "8px",
                                marginRight: "10px",
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "1.7vh",
                                color: theme.primary.main,
                                fontFamily: theme.primary.fontFamily,
                                fontWeight: 600,
                                "&:hover": theme.primary.hoverDefault,
                                [theme.breakpoints.down("md")]: {
                                  fontSize: theme.primary.smallMobile,
                                },
                              }}
                            >
                              Sản phẩm: 0
                            </Typography>
                          </Box>
                        );
                      } else {
                        return (
                          <Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <CircleIcon
                                sx={{
                                  color: theme.primary.main,
                                  fontSize: "8px",
                                  marginRight: "10px",
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: "1.7vh",
                                  color: theme.primary.main,
                                  fontFamily: theme.primary.fontFamily,
                                  fontWeight: 600,
                                  "&:hover": theme.primary.hoverDefault,
                                  [theme.breakpoints.down("md")]: {
                                    fontSize: theme.primary.smallMobile,
                                  },
                                }}
                              >
                                Sản phẩm:
                              </Typography>
                            </Box>
                            <TableContainer
                              component={Paper}
                              sx={{ marginTop: "10px", marginBottom: "10px" }}
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell
                                    sx={{
                                      width: "4%",
                                      fontFamily: theme.primary.fontFamily,
                                      fontWeight: 600,
                                      [theme.breakpoints.down("md")]: {
                                        fontSize: theme.primary.smallMobile,
                                      },
                                    }}
                                  >
                                    STT
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    sx={{
                                      width: "24%",
                                      fontFamily: theme.primary.fontFamily,
                                      fontWeight: 600,
                                      [theme.breakpoints.down("md")]: {
                                        fontSize: theme.primary.smallMobile,
                                      },
                                    }}
                                  >
                                    Tên
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    sx={{
                                      width: "24%",
                                      fontFamily: theme.primary.fontFamily,
                                      fontWeight: 600,
                                      [theme.breakpoints.down("md")]: {
                                        fontSize: theme.primary.smallMobile,
                                      },
                                    }}
                                  >
                                    Số lượng
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    sx={{
                                      width: "24%",
                                      fontFamily: theme.primary.fontFamily,
                                      fontWeight: 600,
                                      [theme.breakpoints.down("md")]: {
                                        fontSize: theme.primary.smallMobile,
                                      },
                                    }}
                                  >
                                    Giá tiền
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    sx={{
                                      width: "24%",
                                      fontFamily: theme.primary.fontFamily,
                                      fontWeight: 600,
                                      [theme.breakpoints.down("md")]: {
                                        fontSize: theme.primary.smallMobile,
                                      },
                                    }}
                                  >
                                    Khuyến mãi
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {billData[key].map((item, idx) => (
                                  <TableRow
                                    key={idx}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                        [theme.breakpoints.down("md")]: {
                                          fontSize: theme.primary.smallMobile,
                                        },
                                      },
                                    }}
                                  >
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      align="center"
                                      sx={{
                                        width: "4%",
                                        fontFamily: theme.primary.fontFamily,
                                        fontWeight: 600,
                                        [theme.breakpoints.down("md")]: {
                                          fontSize: theme.primary.smallMobile,
                                        },
                                      }}
                                    >
                                      {idx + 1}
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      sx={{
                                        width: "24%",
                                        fontFamily: theme.primary.fontFamily,
                                        [theme.breakpoints.down("md")]: {
                                          fontSize: theme.primary.smallMobile,
                                          padding: 0,
                                        },
                                      }}
                                    >
                                      {item.name ? item.name : ""}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={{
                                        width: "24%",
                                        fontFamily: theme.primary.fontFamily,
                                        [theme.breakpoints.down("md")]: {
                                          fontSize: theme.primary.smallMobile,
                                        },
                                      }}
                                    >
                                      {item.quantity
                                        ? item.quantity.split(" ")[0]
                                        : ""}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={{
                                        width: "24%",
                                        fontFamily: theme.primary.fontFamily,
                                        [theme.breakpoints.down("md")]: {
                                          fontSize: theme.primary.smallMobile,
                                        },
                                      }}
                                    >
                                      {item.price ? item.price : ""}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={{
                                        width: "24%",
                                        fontFamily: theme.primary.fontFamily,
                                        [theme.breakpoints.down("md")]: {
                                          fontSize: theme.primary.smallMobile,
                                        },
                                      }}
                                    >
                                      {item.discount ? item.discount : ""}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </TableContainer>
                          </Box>
                        );
                      }
                    }
                  })}
                  {billData && !error ? (
                    <Box>
                      <Typography
                        sx={{
                          fontSize: theme.primary.semi,
                          color: "black",
                          fontFamily: theme.primary.fontFamily,
                          fontWeight: 600,
                          "&:hover": theme.primary.hoverDefault,
                          [theme.breakpoints.down("md")]: {
                            fontSize: theme.primary.smallMobile,
                          },
                          textAlign: "left",
                          marginTop: "20px",
                        }}
                      >
                        Đánh giá kết quả:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: theme.primary.small,
                          color: "black",
                          marginLeft: "30px",
                          marginTop: "10px",
                          fontFamily: theme.primary.fontFamily,
                          fontWeight: 600,
                          "&:hover": theme.primary.hoverDefault,
                          [theme.breakpoints.down("md")]: {
                            fontSize: theme.primary.smallMobile,
                          },
                          textAlign: "left",
                        }}
                      >
                        Bạn cảm thấy kết quả này có chính xác và phù hợp không?
                      </Typography>
                      <Rating
                        name="customized-10"
                        defaultValue={2}
                        max={10}
                        value={star}
                        onChange={(e) => setStar(e.target.value)}
                      />
                      <Typography
                        sx={{
                          fontSize: theme.primary.small,
                          marginLeft: "30px",
                          marginTop: "10px",
                          color: "black",
                          fontFamily: theme.primary.fontFamily,
                          fontWeight: 600,
                          "&:hover": theme.primary.hoverDefault,
                          [theme.breakpoints.down("md")]: {
                            fontSize: theme.primary.smallMobile,
                          },
                          textAlign: "left",
                        }}
                      >
                        Ý kiến đóng góp khác:
                      </Typography>
                      <TextField
                        multiline
                        rows={2}
                        sx={{
                          width: "100%",
                          marginTop: "10px",
                          fontFamily: theme.primary.fontFamily,
                        }}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
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
                        onClick={() => sendComment()}
                      >
                        Gửi ý kiến
                      </Button>
                    </Box>
                  ) : (
                    ""
                  )}
                </Box>
              ) : (
                ""
              )}
            </Box>
            {/* <Typography
        sx={{
          fontSize: theme.primary.semiBig,
          color: theme.primary.sub,
          fontFamily: theme.primary.fontFamily,
          fontWeight: 800,
          "&:hover": theme.primary.hoverDefault,
          marginBottom: "10px",
          [theme.breakpoints.down("md")]: {
            fontSize: theme.primary.medium,
          },
        }}
      >
        Xin chào, {name !== "" ? name : "bạn"}!
      </Typography>
      <Typography
        sx={{
          fontSize: theme.primary.big,
          color: "white",
          fontFamily: theme.primary.fontFamily,
          fontWeight: 800,
          paddingLeft: "50px",
          paddingRight: "50px",
          textAlign: "center",
          "&:hover": theme.primary.hoverDefault,
          [theme.breakpoints.down("md")]: {
            fontSize: theme.primary.semi,
            paddingLeft: "5px",
            paddingRight: "5px",
            textAlign: "justify",
            marginTop: "10px",
            marginBottom: "10px",
          },
        }}
      >
        Cùng đón chờ để thử nghiệm tính năng đầu tiên vào 07/11/2023
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        <Typography
          sx={{
            fontSize: theme.primary.medium,
            color: theme.primary.sub,
            fontFamily: theme.primary.fontFamily,
            fontWeight: 800,
            "&:hover": theme.primary.hoverDefault,
            [theme.breakpoints.down("md")]: {
              fontSize: theme.primary.small,
            },
            marginRight: "20px",
          }}
        >
          Gợi ý:
        </Typography>
        <img class="experiment-image" src={Suggest} alt="" />
      </Box> */}
          </Container>
        </Box>
      ) : (
        <Container
          sx={{
            backgroundColor: theme.primary.main,
            marginTop: "30px",
            marginBottom: "100px",
            paddingTop: "30px",
            paddingBottom: "50px",
            display: "flex",
            alignItems: "center",
            minHeight: "70vh",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: theme.primary.borderRadius,
            [theme.breakpoints.down("md")]: {
              width: "90%",
              minHeight: "50vh",
              justifyContent: "center",
              marginBottom: "150px",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: theme.primary.semiBig,
              color: theme.primary.sub,
              fontFamily: theme.primary.fontFamily,
              fontWeight: 800,
              "&:hover": theme.primary.hoverDefault,
              marginBottom: "10px",
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.medium,
              },
            }}
          >
            Xin chào bạn,
          </Typography>
          <Typography
            sx={{
              fontSize: theme.primary.big,
              color: "white",
              fontFamily: theme.primary.fontFamily,
              fontWeight: 800,
              paddingLeft: "50px",
              paddingRight: "50px",
              textAlign: "center",
              "&:hover": theme.primary.hoverDefault,
              [theme.breakpoints.down("md")]: {
                fontSize: theme.primary.semi,
                paddingLeft: "10px",
                paddingRight: "10px",
                textAlign: "justify",
                marginTop: "10px",
                marginBottom: "10px",
              },
            }}
          >
            Vui lòng đăng nhập để trải nghiệm tính năng mới!
          </Typography>
        </Container>
      )}
    </Box>
  );
};

export default Experiment;
