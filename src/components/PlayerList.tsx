// src/components/PlayerList.tsx

import { useEffect, useState } from "react";
import axios from "axios";
import PlayerCard, { Player } from "./PlayerCardMini";
import { Box, Typography } from "@mui/material";

type PlayerListProps = {
  onPlayerSelect: (player: Player) => void;
};

export default function PlayerList({ onPlayerSelect }: PlayerListProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/players")
      .then((response) => {
        setPlayers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener jugadores:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Typography>Cargando jugadores...</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.9,
        overflow: "auto",
        scrollbarWidth: "none",
        height: "95vh",
        padding: 1,
      }}
    >
      {players.map((player) => (
        <div
          key={player.id}
          onClick={() => onPlayerSelect(player)}
          style={{ cursor: "pointer" }}
        >
          <PlayerCard player={player} onSelect={undefined} />
        </div>
      ))}
    </Box>
  );
}
