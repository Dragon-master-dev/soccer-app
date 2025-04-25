// PlayerTable.tsx
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { Box, Typography } from "@mui/material";

// Tipo para un jugador
export interface Player {
  id: number;
  name: string;
  team: string;
  position: string;
  teamNumber: number;
  image: string;
  edad: number;
  altura: number;
  peso: number;
  pieDominante: string;
}

// Props del componente
interface PlayerTableProps {
  onSelectPlayer: (player: Player) => void;
}

export default function PlayerTable({ onSelectPlayer }: PlayerTableProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get<Player[]>(
          "http://localhost:3001/api/players"
        );
        setPlayers(response.data);
      } catch (error) {
        console.error("Error al obtener los jugadores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nombre", width: 150 },
    // { field: "team", headerName: "Equipo", width: 130 },
    { field: "position", headerName: "Posición", width: 130 },
    { field: "teamNumber", headerName: "Número", width: 90 },
    // { field: "edad", headerName: "Edad", width: 90 },
    // { field: "altura", headerName: "Altura", width: 90 },
    // { field: "peso", headerName: "Peso", width: 90 },
    // { field: "pieDominante", headerName: "Pie Dominante", width: 130 },
  ];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Lista de jugadores registrados
      </Typography>
      <DataGrid
        rows={players}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        onRowClick={(params) => onSelectPlayer(params.row)} // Aquí es la clave
      />
    </Box>
  );
}
