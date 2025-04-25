// PlayerCardMini.tsx

import { Card, Typography, Box, ButtonBase } from "@mui/material";
import { grey, lightGreen } from "@mui/material/colors";
import { getPositionColor } from "../constants/getPositionColor"; // Asegúrate de tener esta función exportada desde algún lugar

interface Player {
  name: string;
  position: string;
  image_url: string;
  number?: string | number;
}

interface PlayerCardMiniProps {
  player: Player;
  onSelect?: (player: Player) => void;
}

export default function PlayerCardMini({
  player,
  onSelect,
}: PlayerCardMiniProps) {
  if (!player) return null;

  const { name, position, image_url, number = "?" } = player;

  return (
    <ButtonBase
      onClick={() => onSelect?.(player)}
      sx={{ width: "100%", display: "block", textAlign: "left" }}
    >
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 0.5,
          borderRadius: 6,
          bgcolor: grey[100],
          transition: "transform 0.1s in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            component="img"
            src={`${image_url}`}
            alt={name}
            sx={{
              width: 35,
              height: 35,
              borderRadius: "50%",
              border: `3px solid ${getPositionColor(position || "")}`,
              objectFit: "cover",
            }}
          />
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {name}
            </Typography>
            <Typography sx={{ fontSize: 12, color: grey[600] }}>
              {position}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            backgroundColor: lightGreen[200],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "Roboto, sans-serif",
            color: grey[900],
          }}
        >
          {number}
        </Box>
      </Card>
    </ButtonBase>
  );
}
