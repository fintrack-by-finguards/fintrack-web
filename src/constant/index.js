import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import SavingsIcon from "@mui/icons-material/Savings";
import SchoolIcon from "@mui/icons-material/School";
import GamepadIcon from "@mui/icons-material/Gamepad";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import MoneyIcon from "@mui/icons-material/Money";
import SellIcon from "@mui/icons-material/Sell";
import CallToActionIcon from "@mui/icons-material/CallToAction";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// export const SERVER = "http://202.158.244.6:8000";
export const SERVER = "http://95.111.229.214:8000";

export const JOBS = [
  "Sinh viên",
  "Giáo viên",
  "Lập trình viên",
  "Kế toán",
  "Chuyên viên quảng cáo",
  "Nhân viên văn phòng",
  "Nhân viên bán hàng",
  "Nội trợ",
  "Kỹ sư",
  "Kiến trúc sư",
  "Bảo vệ",
  "Bác sĩ",
  "Nha sĩ",
  "Họa sĩ",
  "Nhà văn",
  "Khác",
];

export const UNIS = [
  "Học viện Ngân hàng",
  "Đại học Thủy lợi",
  "Đại học Y Hà Nội",
  "Đại học Bách Khoa",
  "Đại học Kinh tế quốc dân",
  "Đại học Ngoại thương",
  "Học viện Tài chính",
  "Đại học GTVT",
  "Đại học Xây dựng",
  "Đại học Thương mại",
  "Đại học Quốc gia Hà Nội",
  "Học viện Công nghệ Bưu chính viễn thông",
  "Đại học Sư phạm Hà Nội",
  "Đại học Ngoại ngữ",
  "Khác",
];

export const EXPENSESCATEGORIES = {
  "Chi tiêu cần thiết": [
    "Ăn uống",
    "Hoá đơn",
    "Đi lại",
    "Tiền nhà",
    "Sức khoẻ",
    "Gia đình",
  ],
  "Tiết kiệm": [],
  "Giáo dục": [],
  "Hưởng thụ": ["Mua sắm", "Xem phim", "Trò chơi", "Nhà hàng"],
  "Tự do tài chính": [
    "Bảo hiểm",
    "Tiết kiệm hưu trí",
    "Đầu tư",
    "Bất động sản",
  ],
  "Quà và từ thiện": ["Từ thiện", "Quà lễ"],
  "Trả nợ": ["Tiền mặt", "Trả góp", "Thế chấp", "Thấu chi"],
};

export const RECEIVECATEGORIES = [
  "Giải thưởng",
  "Tiền lãi",
  "Tiền lương",
  "Quà tặng",
  "Bán đồ",
  "Vay nợ",
  "Thu khác",
];

export const ASSETSCATEGORIES = [
  "Tiền mặt",
  "Tiền gửi ngân hàng",
  "Cho vay",
  "Đầu tư",
  "Bất động sản",
];

export const DEBTCATEGORIES = ["Tiền mặt", "Trả góp", "Thế chấp", "Thấu chi"];

export const FIVECOLORS = [
  "#ef476f",
  "#ffd166",
  "#06d6a0",
  "#118ab2",
  "#073b4c",
];

export const CATEICON = {
  "Chi tiêu cần thiết": (
    <CrisisAlertIcon
      sx={{ color: "#E32636", fontSize: "8vh", marginLeft: "20px" }}
    />
  ),
  "Tiết kiệm": (
    <SavingsIcon
      sx={{ color: "#E32636", fontSize: "8vh", marginLeft: "20px" }}
    />
  ),
  "Giáo dục": (
    <SchoolIcon
      sx={{ color: "#E32636", fontSize: "8vh", marginLeft: "20px" }}
    />
  ),
  "Hưởng thụ": (
    <GamepadIcon
      sx={{ color: "#E32636", fontSize: "8vh", marginLeft: "20px" }}
    />
  ),
  "Tự do tài chính": (
    <MonetizationOnIcon
      sx={{ color: "#E32636", fontSize: "8vh", marginLeft: "20px" }}
    />
  ),
  "Quà và từ thiện": (
    <CardGiftcardIcon
      sx={{ color: "#E32636", fontSize: "8vh", marginLeft: "20px" }}
    />
  ),
  "Giải thưởng": (
    <EmojiEventsIcon
      sx={{ color: "#32de84", fontSize: "8vh", marginLeft: "20px" }}
    />
  ),
  "Tiền lãi": (
    <PriceCheckIcon
      sx={{ color: "#32de84", fontSize: "8vh", marginLeft: "20px" }}
    />
  ),
  "Tiền lương": (
    <MoneyIcon sx={{ color: "#32de84", fontSize: "8vh", marginLeft: "20px" }} />
  ),
  "Quà tặng": (
    <CardGiftcardIcon
      sx={{ color: "#32de84", fontSize: "8vh", marginLeft: "20px" }}
    />
  ),
  "Bán đồ": (
    <SellIcon sx={{ color: "#32de84", fontSize: "8vh", marginLeft: "20px" }} />
  ),
  "Vay nợ": (
    <CallToActionIcon
      sx={{ color: "#32de84", fontSize: "8vh", marginLeft: "20px" }}
    />
  ),
  "Thu khác": (
    <MoreHorizIcon
      sx={{ color: "#32de84", fontSize: "8vh", marginLeft: "20px" }}
    />
  ),
};

export const TIME = [
  { month: 1, year: 2023 },
  { month: 2, year: 2023 },
  { month: 3, year: 2023 },
  { month: 4, year: 2023 },
  { month: 5, year: 2023 },
  { month: 6, year: 2023 },
  { month: 7, year: 2023 },
  { month: 8, year: 2023 },
  { month: 9, year: 2023 },
  { month: 10, year: 2023 },
  { month: 11, year: 2023 },
  { month: 12, year: 2023 },
  { month: 1, year: 2024 },
  { month: 2, year: 2024 },
  { month: 3, year: 2024 },
];
