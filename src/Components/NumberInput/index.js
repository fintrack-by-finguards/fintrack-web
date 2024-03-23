import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const NumberInput = ({ value, onChange }) => {
  const theme = useTheme();
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      value={value}
      onChange={(e) => {
        if (e.target.value.match(/[^0-9,:]/)) {
          e.preventDefault();
        } else {
          let newValue = e.target.value.replace(/,/g, "");

          let num = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          onChange(num);
        }
      }}
      inputMode={"numeric"}
      sx={{
        backgroundColor: "white",
        width: "100%",
        marginRight: "10px",
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
          height: "7px",
          [theme.breakpoints.down("md")]: {
            fontSize: "1.5vh",
          },
        },
      }}
    />
  );
};

export default NumberInput;
