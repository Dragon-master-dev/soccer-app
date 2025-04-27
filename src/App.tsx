//App.jsx;
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FieldView from "./components/FieldView";
import PlayerList from "./components/PlayerList";
import RadarChartPlayerStats from "./components/RadarChartPlayerStats";
import { PlayerAssignmentProvider } from "./components/PlayerAssignmentContext"; // importa el provider

export default function App() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  return (
    <PlayerAssignmentProvider>
      {" "}
      {/* ⬅️ Envolvemos la app */}
      <Box>
        <Grid container spacing={1} sx={{ borderRadius: "12px" }}>
          {/* Cancha */}
          <Grid
            item
            xs={5}
            sx={{
              padding: 2,
              height: "97.5vh",
              backgroundColor: "rgba(0, 141, 28, 0.47)",
              backdropFilter: "blur(20px)",
              borderRadius: 3,
              boxShadow: 3,
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <FieldView />
          </Grid>

          {/* Lista de jugadores */}
          <Grid
            item
            xs={2}
            sx={{
              height: "97.5vh",
              overflow: "hidden",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(10px)",
              borderRadius: 3,
              boxShadow: 3,
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <PlayerList
              onPlayerSelect={setSelectedPlayer}
              selectedPlayer={selectedPlayer}
            />
          </Grid>

          {/* Radar Chart */}
          <Grid
            item
            xs={3}
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: 2,
            }}
          >
            <RadarChartPlayerStats player={selectedPlayer} />
          </Grid>

          {/* Panel adicional vacío */}
          <Grid>{/* Otras vistas */}</Grid>
        </Grid>
      </Box>
    </PlayerAssignmentProvider>
  );
}
