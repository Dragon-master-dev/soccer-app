// Cardmenu.tsx
import { useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import FieldView from "./FieldView";
import { lightGreen } from "@mui/material/colors";

export default function CardMenu() {
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleOpen = () => {
    setOpenBackdrop(true);
  };

  const handleClose = () => {
    setOpenBackdrop(false);
  };

  return (
    <>
      <ButtonGroup
        variant="outlined"
        aria-label="Loading button group"
        sx={{
          mb: 1,
          boxShadow: 0,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleOpen}
          style={{ gap: "1.6%" }}
        >
          <ChangeCircleOutlinedIcon />
          Cambiar
        </Button>
        <Button>Comparar</Button>
      </ButtonGroup>

      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: lightGreen[700],
        }}
        open={openBackdrop}
        onClick={handleClose} // Cierra al hacer clic fuera
      >
        <Box
          sx={{
            width: "40vw",
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FieldView />
        </Box>
      </Backdrop>
    </>
  );
}
