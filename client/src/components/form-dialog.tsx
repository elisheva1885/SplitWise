import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import type { ReactNode } from "react";
import IconButton from "@mui/material/IconButton";

type FormDialogProps = {
  open: boolean;
  handleCloseDialog: () => void;
  children: ReactNode;
};
export const FormDialog = ({
  open,
  handleCloseDialog,
  children,
}: FormDialogProps) => {
  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <Box
        sx={{
          backgroundColor: "#2e3136",
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleCloseDialog}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ textAlign: "center", padding: "8px" }}>{children}</Box>
      </Box>
    </Dialog>
  );
};
