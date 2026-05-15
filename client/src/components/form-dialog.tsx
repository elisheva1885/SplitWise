import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import type { ReactNode } from "react";

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
      <Box style={{ backgroundColor: "#2e3136" }}>
        <CloseIcon
          onClick={handleCloseDialog}
          sx={{
            backgroundColor: "#2e3136",
            color: "white",
            position: "absolute",
            insetInlineEnd: 3,
            cursor: "pointer",
          }}
        />
        <Box sx={{ textAlign: "center", padding: "8px" }}>
          {/* <UpdateGroupForm
              setDialogOpen={setUpdateUserDialog}
              onSubmit={async (data) => {
                await actions.updateGroupDetails(data);
                setUpdateUserDialog(false);
              }}
              group={group}
            /> */}
          {children}
        </Box>
      </Box>
    </Dialog>
  );
};
