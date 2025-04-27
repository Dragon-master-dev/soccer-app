// RadarChartPlayerStats.jsx
import React from "react";
import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";
import {
  Card,
  CardMedia,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { getPositionColor } from "../constants/getPositionColor";
import { grey } from "@mui/material/colors";
import MiniMenu from "../components/MiniMenu";
import CardMenu from "../components/CardMenu";

// Normalizador
const normalize = (value, min, max) => (value - min) / (max - min);

// Etiquetas del radar chart
const captions = {
  acceleration: "Aceleración",
  jumping_reach: "Salto",
  shot_power: "Disparo",
  height: "Estatura (cm)",
  weight: "Peso (Kg)",
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
        acceleration: normalize(acceleration, 10, 100),
        jumping_reach: normalize(jumping_reach, 30, 100),
        shot_power: normalize(shot_power, 65, 115),
        height: normalize(height, 160, 200),
        weight: normalize(weight, 55, 100),
      },
      meta: { color: getPositionColor(position || ""), name },
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
      <MiniMenu />
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
        marginBottom={2}
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
        <Typography
          variant="subtitle2"
          color={grey[900]}
          textAlign="center"
          backgroundColor={grey[300]}
          borderRadius={5}
          padding={0.5}
        >
          Pais:{" " + player.nationality}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          border: 1,
          borderColor: grey[300],
          borderTopLeftRadius: "45%",
          borderBottomLeftRadius: "10%",
          mb: 7,
          mt: 4.5,
          alignItems: "center",
        }}
      >
        <RadarChart
          captions={captions}
          data={data}
          size={200}
          options={{
            dots: true,
            scales: 3,
            zoomDistance: 1,
            captionMargin: 20,
            captionProps: () => ({
              fontSize: 13,
              fill: "rgb(66, 66, 66)",
              fontFamily: "Roboto",
            }),
            scaleProps: () => ({
              fill: "rgba(255, 255, 255, 0.52)",
              stroke: grey[300],
              strokeWidth: 1,
            }),
          }}
        />
        {/* Pasamos el jugador activo como prop a CardMenu */}

        <List
          sx={{
            bgcolor: "rgba(231, 231, 231, 0.35)",
            padding: 0,
          }}
        >
          {/* Filtramos las propiedades del objeto player que están en el radar chart */}
          {Object.entries(player)
            .filter(([key]) => Object.keys(captions).includes(key)) // Filtra solo las claves que están en captions
            .map(([key, value]) => (
              <ListItem
                key={key}
                sx={{
                  display: "flex",
                  flexDirection: "column", // Alineamos cada clave-valor en columna
                  alignItems: "center", // Centramos el contenido
                  textAlign: "center", // Centramos el texto
                  paddingBlock: 0,
                  paddingInline: 1,
                }}
              >
                <ListItemText
                  primary={captions[key]} // Texto principal
                  secondary={value} // Texto secundario
                  primaryTypographyProps={{
                    fontSize: 10, // Tamaño del texto principal
                    fontWeight: "bold", // Grosor del texto principal
                    color: grey[900], // Color del texto principal
                  }}
                  secondaryTypographyProps={{
                    fontSize: 15, // Tamaño del texto secundario
                    fontWeight: "normal", // Grosor del texto secundario
                    color: grey[700], // Color del texto secundario
                  }}
                />
              </ListItem>
            ))}
        </List>
      </Box>

      <CardMenu activePlayer={player} />
    </Card>
  );
}
