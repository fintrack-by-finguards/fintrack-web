import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";

const SorryDialog = ({ openDialog, handleCloseDialog }) => {
  const theme = useTheme();

  const handleClose = () => {
    handleCloseDialog();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={openDialog}
      PaperProps={{
        sx: {
          width: "300px",
          padding: "10px",
          backgroundColor: theme.primary.main,
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "white",
          fontSize: "3vh",
          fontWeight: 700,
          fontFamily: theme.primary.fontFamily,
        }}
        textAlign="center"
      >
        Phiên bản trên điện thoại sẽ sớm được ra mắt, vui lòng sử dụng máy tính
        để có trải nghiệm tốt nhất!
      </DialogTitle>
    </Dialog>
  );
};

export default SorryDialog;
