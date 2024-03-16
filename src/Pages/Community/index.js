import React, { useState, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PostDetail from "./PostDetail";

const content = [
  {
    id: "0",
    title: "Lời cảnh tỉnh cho các cú đêm săn sale!",
    content: [
      "Hiện nay, chúng tôi phát hiện ra rằng có rất nhiều bạn trẻ thức đêm săn sale trên các sàn thương mại. Chỉ vừa mới thứ 7 tuần trước, chúng tôi đã bắt gặp một trường hợp cấp cứu khẩn cấp, “nội tạng” đã bị lấy ra hết. Quả là một câu chuyện thương tâm đúng không ạ?",
      "Nhân vật được chúng tôi nhắc đến ngày hôm nay đó chính là chiếc ví của các bạn. Theo báo Tiền Phong, 2023 với tựa đề “Giới trẻ thức trắng đêm, chi tiền triệu “săn sale”, các bạn trẻ ngày nay có xu hướng bị cuốn vào vòng xoáy của việc mua hàng online.",
      "Với tâm lý cứ “cố thêm tí nữa” là mua được hàng giá rẻ, deal hời đã khiến cho việc săn sale trở thành một thói quen lúc nào không hay, đến mùa sale không săn là thấy bồn chồn mà theo ngôn ngữ của tuổi teen thì nó là “cứ thiếu thiếu”.",
      "Việc này đã gây ra những hậu quả vô cùng nghiêm trọng không chỉ liên quan đến vấn đề sức khỏe mà nó còn ảnh hưởng đến việc chi tiêu quá mức dẫn đến tâm lý “hối hận” sau mỗi mùa sale.",
    ],
    img: "https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-6/431339090_122133651518103751_470812467328444163_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEaFkghDk2CqNky_V4tprdog-j3cq3MJxOD6PdyrcwnExQOYLkFgQAEeebQWisU_96lsxSKNayppCXYGEQtNWry&_nc_ohc=0u6JYK09iGQAX-XeqQe&_nc_zt=23&_nc_ht=scontent.fhan3-2.fna&oh=00_AfB9XLSy8VOXqI4HmvxaH_nS6mrXfZTowSVjKC7yTsmNOw&oe=65F5BC8C",
  },
  {
    id: "1",
    title: "Kiểm soát khi đi siêu thị",
    content: [
      'Nhiều người biết cách phân bổ thu nhập nhưng chưa biết cách làm cách nào để “giữ tiền đúng lọ, không tiêu quá lố”. Vậy thì hôm nay chúng mình mang đến cho các bạn cách tiết kiệm tiền đến từ những điều nhỏ nhặt nhất và phải kể đến đầu tiên đó là “Cách kiểm soát túi tiền khi đi siêu thị".',
      "😵 Bạn đã bao giờ bị “vét sạch túi” khi dạo một vòng siêu thị?",
      "💸 Đã bao giờ không biết mua gì nhưng lúc đi ra lại là một giỏ đầy đồ?",
      "😭 Đã bao giờ hối hận vì suy nghĩ “Biết thế không đi mua đồ”?",
      "Nếu có thì bạn hãy đọc những mẹo nhỏ sau đây mà chúng mình đã rút ra để giúp tiết kiệm túi tiền khi có lỡ bước chân vào siêu thị nhé!",
      "1. Hãy chuẩn bị note sẵn những thứ cần mua khi có dự định đi mua sắm",
      "2. Đừng nhìn ngang ngó dọc quá nhiều khi vào siêu thị, cố gắng giữ cho mình luôn tỉnh táo trước những món đồ bắt mắt ở đó",
      "3. Đừng đến siêu thị khi đói vì bạn sẽ dễ bị dụ vì những món ăn hấp dẫn ở đấy và nhìn gì cũng muốn mua đấy😋",
      "4. Chọn giỏ hàng vừa với ý định mua ban đầu vì chúng ta thường có xu hướng “muốn lấp đầy giỏ”.",
      "5. Chọn đồ ăn theo mùa nhé! Vừa tươi ngon vừa giá thành hợp lý",
      "6. Ngừng mua sắm trong tầm mắt vì đó thường là những nơi người bán thường đặt những món “đắt tìn“😑",
      "7. Đừng đi mua sắm liên tục, hãy tận dụng đồ có sẵn trong nhà trước nhé",
      "8. Các loại thẻ cashback sẽ giúp bạn hoàn tiền tới 5% khi mua hàng tạp hóa, vì vậy đừng quên sử dụng nó mỗi khi đi siêu thị",
      "9. Đừng ngại trả lại hàng khi “lỡ” bỏ vào giỏ",
      "Trên đây là những tip nhỏ mà bọn mình rút ra trong suốt những thời gian bị bào mòn túi tiền, các bạn có cách nào hay hơn thì cmt ở dưới nhé!",
    ],
    img: "https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-6/429673737_122133106820103751_6772340851854959524_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHh0upq8xqLuEQ4BvO2Wx5CxnFWwTguvnPGcVbBOC6-cw2dPPdDU4ryfMXptauxULH2cuVecbRVmA3BTzhcFThZ&_nc_ohc=si_0BiiJX2cAX8l2jM5&_nc_zt=23&_nc_ht=scontent.fhan3-2.fna&oh=00_AfAE-Fi1eQRl7PGQ9FLpM-5ZIohy-u7S8yS1PSG8ZT3CAw&oe=65F57503",
  },
  {
    id: "2",
    title: "Quy tắc 6 chiếc lọ",
    content: [
      "🥰Quy tắc 6 chiếc lọ - Quản lý tài chính thông minh!",
      "Bạn đã từng nghe qua về quy tắc này chưa? Nếu chưa thì hãy để FinTrack nói cho bạn biết nhé.",
      "Đây là quy tắc do doanh nhân T.Harv Eker - tác giả quyển “Bí mật tư duy triệu phú” chia sẻ. 6 quy tắc này đã được hàng triệu người áp dụng để quản lý tài chính cá nhân hiệu quả hơn! Vậy 6 lọ đó là gì?",
      "🎯 Lọ thứ 1: 55% thu nhập cho chi tiêu cần thiết",
      "Lọ này dành để chi trả cho các nhu cầu và chi phí hàng ngày, bao gồm chi phí sinh hoạt, đi lại, thức ăn, thuê nhà, hóa đơn, và các chi phí cần thiết khác để duy trì cuộc sống hàng ngày. Việc phân bổ 55% thu nhập cho lọ này giúp đảm bảo bạn có đủ tiền để chi trả cho các nhu cầu hàng ngày mà không cảm thấy căng thẳng hoặc lo lắng về tài chính.",
      "🎯 Lọ thứ 2: 10% thu nhập cho tiết kiệm dài hạn:",
      "Lọ này được dành cho việc tích lũy và tiết kiệm cho mục tiêu dài hạn, như việc mua nhà, mua xe, tiết kiệm hưu trí, hoặc các mục tiêu tài chính khác.",
      "🎯 Lọ thứ 3: 10% thu nhập cho quỹ giáo dục:",
      "Lọ này dành cho việc đầu tư vào giáo dục và phát triển bản thân, cũng như cho việc đầu tư vào giáo dục của con cái. Khoản tiết kiệm này sẽ giúp tạo ra cơ hội tăng cường kiến thức và kỹ năng.",
      "🎯 Lọ thứ 4: 10% thu nhập cho hưởng thụ:",
      "Lọ này dành cho việc thưởng cho bản thân sau những cống hiến và nỗ lực làm việc. Việc hưởng thụ mỗi tháng giúp tạo thêm động lực cho bạn, cân bằng cuộc sống và nâng cao hiệu quả làm việc.",
      "🎯 Lọ thứ 5: 10% thu nhập cho tự do tài chính:",
      "Lọ này được dành để đầu tư vào việc phát triển nguồn thu nhập thụ động hoặc kinh doanh cá nhân, nhằm mục tiêu đạt được sự độc lập tài chính.",
      "🎯 Lọ thứ 6: 5% thu nhập cho quỹ từ thiện:",
      "Với tinh thần san sẻ yêu thương, mỗi tháng bạn có thể trích ra 5% thu nhập cho quỹ này.",
    ],
    img: "https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-6/429657726_122132330378103751_8716106126594379248_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEB1JitTA8P9PKdIMruT5VVMAG98lHPCAIwAb3yUc8IAilNrfC3FqoscbWkVeJb6Y0uslc_LZ-FEjanmiVmRbxV&_nc_ohc=ACaCjdQJvZQAX_KWdZi&_nc_zt=23&_nc_ht=scontent.fhan3-2.fna&oh=00_AfBan_dh1TBi20CttUqlrt0JDw9mY2eop_h8f1pHnam5TQ&oe=65F44AF8",
  },
  {
    id: "3",
    title: "Tự Do Tài Chính: Hành Trình Học Hỏi và Định Hình Tương Lai!",
    content: [
      "Nhận thức về tài chính là một chìa khóa quan trọng để mở cánh cửa cho tương lai ổn định và đầy ý nghĩa. Trong thế giới ngày nay, việc giáo dục về tài chính không chỉ là một sự cần thiết mà còn là một hành trình học hỏi quan trọng, giúp chúng ta hiểu rõ về cách quản lý và tận dụng tối đa nguồn lực của mình.",
      "1️⃣ Học hỏi từ việc quản lý ngân sách:",
      "Bắt đầu từ việc quản lý ngân sách cá nhân, chúng ta có thể hiểu rõ hơn về cách thu chi, lập kế hoạch và tạo ra một nguồn thu nhập ổn định. Việc này không chỉ giúp chúng ta tránh được những khó khăn tài chính không cần thiết mà còn tạo nền tảng cho sự độc lập và tự chủ.",
      "2️⃣ Đầu tư cho tương lai:",
      "Giáo dục tài chính cũng mang lại kiến thức về đầu tư, giúp chúng ta hiểu rõ hơn về rủi ro và lợi ích của việc đầu tư thông minh. Tìm hiểu về các loại đầu tư, quản lý rủi ro và lên kế hoạch cho sự hưng thịnh tương lai là những bước quan trọng để xây dựng tài sản và bảo vệ tài khoản tài chính cá nhân.",
      "3️⃣ Bản cam kết cho tương lai:",
      "Hành trình học hỏi về tài chính không chỉ là một quá trình, mà còn là một cam kết với bản thân để không ngừng nâng cao kiến thức và kỹ năng. Việc này không chỉ mang lại sự tự do tài chính mà còn mở rộng tầm nhìn về mục tiêu và ý nghĩa trong cuộc sống.",
      "Tổ chức chương trình giáo dục tài chính không chỉ là một cơ hội mà còn là một trách nhiệm, giúp xây dựng cộng đồng thông thái về tài chính và góp phần vào sự phát triển bền vững của xã hội. Hãy cùng nhau học hỏi và chia sẻ kiến thức để mỗi người có thể tự do tài chính và hướng tới tương lai đầy triển vọng trên FinTrack.",
      "Lọ này dành cho việc đầu tư vào giáo dục và phát triển bản thân, cũng như cho việc đầu tư vào giáo dục của con cái. Khoản tiết kiệm này sẽ giúp tạo ra cơ hội tăng cường kiến thức và kỹ năng.",
    ],
    img: "https://scontent.fhan3-1.fna.fbcdn.net/v/t39.30808-6/425899183_122128297802103751_3260111450300328039_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFQMsDJH1a93RrGdarD9ZPdEiR-z4CnCQ8SJH7PgKcJD9GcczV3pc7IrMO01XFOo1E2yDktuVX4jUGkr-BHHpUU&_nc_ohc=Q5UBL0wAxPoAX-IxaNZ&_nc_zt=23&_nc_ht=scontent.fhan3-1.fna&oh=00_AfDYSLeDMgVuHdz3IhoxSepVJt5utoXZYXN-Tbdg9iR6ng&oe=65F4F965",
  },
  {
    id: "4",
    title: "Kiểm soát khi đi siêu thị (phần 2)",
    content: [
      "Như đã hứa, sau quá trình dày công nghiên cứu và áp dụng thành công lên chính những thành viên trong nhóm. Chúng mình đã quay lại và mang đến cho mọi người những biện pháp để hạn chế tối thiểu việc mua sắm không cần thiết trên shopee - đặc biệt vào những dịp Sale:",
      '1️⃣ Xác định xem liệu bạn có thực sự cần mua món đồ đó hay không hay chỉ vì những từ ngữ “mát mắt” trên shopee như “deal hời”, "ưu đãi khủng” khiến bạn bộc phát muốn mua nó bằng được.',
      "2️⃣ Thiết lập ngân sách trước khi mua sắm để hạn chế tối đa việc vào shopee và mua những món hàng không cần thiết. Ví dụ như bạn có thể chuyển sẵn một số tiền dự trù vào ví thanh toán.",
      "3️⃣ Hạn chế thời gian ở trên ứng dụng này và loại bỏ bớt đi những món đồ không cần thiết trong giỏ hàng tránh việc tự nhiên thấy giảm nên mua.",
      "4️⃣ Xem xét kỹ lưỡng món đồ cần mua và cho vào giỏ hàng, đến lúc sale hãy nhanh tay thì việc đó sẽ giúp bạn tiết kiệm một khoản kha khá đấy!",
      "5️⃣ Sử dụng ví điện tử thanh toán có thể sẽ giúp giảm giá tiền hơn nhé! Tuy nhiên lưu ý vì ví điện tử mặc dù rất tiện lợi khi chúng ta thanh toán nhưng vì nó liên kết sẵn với ngân hàng của mình nên dễ dẫn đến tình trạng “tiêu quá tay” hoặc nếu chúng ta sử dụng ví trả sau của momo thì nhớ cẩn trọng đừng để bản thân lâm vào tình trạng “nợ quá nhiều”. ",
      "✅Chúng mình đã áp dụng và có hiệu quả, còn bạn thì sao? Nếu có mẹo hay hơn hãy để lại bình luận bên dưới nhé.",
    ],
    img: "https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/431903525_122135167292103751_8741297609560337090_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeH09Ks0PVxOf44YbN-dMZnd4u5YL9FUYIHi7lgv0VRggaO0UwRTWPmCuEXd6gs31nrEVMYkRCx9x6VL-BJZu87f&_nc_ohc=R2cVejhWil0AX-05bTi&_nc_ht=scontent.fhan17-1.fna&oh=00_AfCuPNOnZ2JT_glr0IGOipXILB15wHIj6d3wfULLCxnvpA&oe=65F73960",
  },
];

const Community = () => {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);

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
      {!currentPostId ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            <Box
              sx={{
                height: "5px",
                width: "33%",
                backgroundColor: theme.primary.main,
                borderRadius: "20px",
              }}
            ></Box>
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "700",
                width: "30%",
                fontSize: "30px",
                borderRadius: "20px",
                backgroundColor: theme.primary.main,
                color: "white",
                "&:hover": theme.primary.hoverDefault,
                [theme.breakpoints.down("md")]: {
                  fontSize: theme.primary.medium,
                },
                padding: "10px",
              }}
            >
              Bài viết
            </Typography>
            <Box
              sx={{
                height: "5px",
                width: "33%",
                backgroundColor: theme.primary.main,
                borderRadius: "20px",
              }}
            ></Box>
          </Box>
          <Grid container>
            {content.map((item, id) => (
              <Grid
                item
                xs={3}
                sx={{
                  marginTop: "30px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                <Box
                  sx={{
                    height: "420px",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "20px",
                    boxShadow: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: "100%",
                      minHeight: "200px",
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                    }}
                    image={item.img}
                    alt="Paella dish"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100px",
                      }}
                    >
                      <AccountCircleIcon
                        sx={{ fontSize: theme.primary.medium }}
                      />
                      <Typography
                        sx={{
                          fontFamily: theme.primary.fontFamily,
                          fontWeight: "500",
                          fontSize: theme.primary.small,
                          marginLeft: "5px",
                          "&:hover": theme.primary.hoverDefault,
                          [theme.breakpoints.down("md")]: {
                            fontSize: theme.primary.medium,
                          },
                        }}
                      >
                        FinTrack
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "50px",
                        }}
                      >
                        <CommentIcon sx={{ fontSize: theme.primary.medium }} />
                        <Typography
                          sx={{
                            fontFamily: theme.primary.fontFamily,
                            fontWeight: "500",
                            fontSize: theme.primary.small,
                            marginLeft: "5px",
                            "&:hover": theme.primary.hoverDefault,
                            [theme.breakpoints.down("md")]: {
                              fontSize: theme.primary.medium,
                            },
                          }}
                        >
                          0
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "50px",
                        }}
                      >
                        <FavoriteBorderIcon
                          sx={{ fontSize: theme.primary.medium }}
                        />
                        <Typography
                          sx={{
                            fontFamily: theme.primary.fontFamily,
                            fontWeight: "500",
                            fontSize: theme.primary.small,
                            marginLeft: "5px",
                            "&:hover": theme.primary.hoverDefault,
                            [theme.breakpoints.down("md")]: {
                              fontSize: theme.primary.medium,
                            },
                          }}
                        >
                          0
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      height: "0.5px",
                      width: "80%",
                      backgroundColor: theme.primary.main,
                      margin: "0 auto",
                    }}
                  ></Box>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: theme.primary.fontFamily,
                        fontWeight: "600",
                        fontSize: theme.primary.medium,
                        marginTop: "10px",
                        marginLeft: "5px",
                        "&:hover": theme.primary.hoverDefault,
                        [theme.breakpoints.down("md")]: {
                          fontSize: theme.primary.medium,
                        },
                      }}
                      px={2}
                      textAlign="left"
                    >
                      {item.title}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "end",
                      height: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: theme.primary.fontFamily,
                        fontWeight: "400",
                        fontSize: "11px",
                        marginTop: "5px",
                        marginLeft: "5px",
                        marginBottom: "10px",
                        "&:hover": theme.primary.hoverDefault,
                        [theme.breakpoints.down("md")]: {
                          fontSize: theme.primary.medium,
                        },
                      }}
                      px={2}
                      textAlign="left"
                      onClick={() => setCurrentPostId(item.id)}
                    >
                      {"Đọc thêm >>"}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Khoá học */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
              marginTop: "100px",
            }}
          >
            <Box
              sx={{
                height: "5px",
                width: "33%",
                backgroundColor: theme.primary.main,
                borderRadius: "20px",
              }}
            ></Box>
            <Typography
              sx={{
                fontFamily: theme.primary.fontFamily,
                fontWeight: "700",
                width: "30%",
                fontSize: "30px",
                borderRadius: "20px",
                backgroundColor: theme.primary.main,
                color: "white",
                "&:hover": theme.primary.hoverDefault,
                [theme.breakpoints.down("md")]: {
                  fontSize: theme.primary.medium,
                },
                padding: "10px",
              }}
            >
              Khoá học
            </Typography>
            <Box
              sx={{
                height: "5px",
                width: "33%",
                backgroundColor: theme.primary.main,
                borderRadius: "20px",
              }}
            ></Box>
          </Box>
        </Box>
      ) : (
        ""
      )}

      {currentPostId ? (
        <PostDetail
          data={content[currentPostId]}
          setPostId={setCurrentPostId}
        />
      ) : (
        ""
      )}
    </Container>
  );
};

export default Community;
