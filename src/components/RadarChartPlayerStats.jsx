// RadarChartPlayerStats.jsx
import React from "react";
import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";
import { Card, CardMedia, Box, Typography } from "@mui/material";
import { getPositionColor } from "../constants/getPositionColor";
import { grey, lightGreen } from "@mui/material/colors";
import MiniMenu from "../components/MiniMenu";
import CardMenu from "../components/CardMenu";
// Normalizador
const normalize = (value, min, max) => (value - min) / (max - min);

// Etiquetas del radar chart
const captions = {
  acceleration: "Aceleración",
  jumping_reach: "Salto",
  shot: "Disparo",
  height: "Estatura",
  weight: "Peso",
};

export default function RadarChartPlayerStats({ player }) {
  if (!player) {
    return <p style={{ textAlign: "center" }}>Selecciona un jugador</p>;
  }

  const {
    image_url,
    name,
    number,
    team,
    age,
    dominant_foot,
    position,
    acceleration,
    jumping_reach,
    shot_power,
    height,
    weight,
  } = player;

  const data = [
    {
      data: {
        acceleration: normalize(acceleration, 10, 100), // margen extra por si suben más
        jumping_reach: normalize(jumping_reach, 30, 100), // rango real observado
        shot: normalize(shot_power, 65, 115), // justo para tu data
        height: normalize(height, 160, 200), // ya está bien
        weight: normalize(weight, 55, 100), // ya está bien
      },
      meta: { color: "green", name },
    },
  ];

  return (
    <Card
      sx={{
        p: 1.6,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "rgba(81, 81, 81, 0.28)",
        minWidth: "250px",
      }}
    >
      <MiniMenu> </MiniMenu>
      <CardMedia
        component="img"
        image={image_url}
        alt={name}
        sx={{
          width: "4rem",
          height: "4rem",
          borderRadius: "50%",
          border: "4px solid" + getPositionColor(position || ""),
          objectFit: "cover",
          m: 1,
        }}
      />
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        color="rgb(55, 55, 55)"
      >
        {player.name}
      </Typography>
      <Typography
        variant="p"
        color="rgb(245, 245, 245)"
        textAlign="center"
        gutterBottom
        marginBottom={5}
        fontFamily={"Arial"}
        fontSize={15}
        fontWeight={400}
      >
        {player.team} | {player.age} años | P: {player.dominant_foot}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          mb: 1,
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            backgroundColor: grey[300],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "roboto",
            color: grey[900],
          }}
        >
          {number}
        </Box>
        <Typography
          variant="subtitle2"
          color="white"
          textAlign="center"
          backgroundColor={getPositionColor(position || "")}
          borderRadius={5}
          padding={0.5}
        >
          {position}
        </Typography>
      </Box>
      <RadarChart
        captions={captions}
        data={data}
        size={220}
        options={{
          dots: true,
          scales: 3,
          zoomDistance: 1,
          captionMargin: 20,
          captionProps: () => ({
            fontSize: 13,
            fill: "black",
            fontFamily: "Roboto",
          }),
          scaleProps: () => ({
            fill: "rgba(255, 255, 255, 0.52)",
            stroke: grey[300],
            strokeWidth: 1,
          }),
        }}
      />
      <CardMenu />
    </Card>
  );
}
