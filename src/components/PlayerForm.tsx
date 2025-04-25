import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  FormHelperText,
} from "@mui/material";

export default function PlayerForm() {
  // Estado principal para los datos del formulario
  const [playerData, setPlayerData] = useState({
    name: "",
    team: "",
    position: "",
    teamNumber: "",
    imageFile: null as File | null,
    attributes: {
      edad: "",
      altura: "",
      peso: "",
      pieDominante: "",
    },
  });

  // Estado para mostrar errores de validación
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Manejador de cambios de inputs generales
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlayerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejador para atributos específicos
  const handleAttributeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlayerData((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [name]: value,
      },
    }));
  };

  // Manejador para carga de imagen
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPlayerData((prev) => ({
      ...prev,
      imageFile: file,
    }));
  };

  // Validación del formulario
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!playerData.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!playerData.team.trim()) newErrors.team = "El equipo es obligatorio";
    if (!playerData.position) newErrors.position = "Selecciona una posición";
    if (!playerData.teamNumber || isNaN(Number(playerData.teamNumber))) {
      newErrors.teamNumber = "Número inválido";
    }
    if (!playerData.imageFile) newErrors.imageFile = "Sube una imagen";

    const { edad, altura, peso, pieDominante } = playerData.attributes;
    if (!edad || isNaN(Number(edad))) newErrors.edad = "Edad inválida";
    if (!altura || isNaN(Number(altura))) newErrors.altura = "Altura inválida";
    if (!peso || isNaN(Number(peso))) newErrors.peso = "Peso inválido";
    if (!pieDominante) newErrors.pieDominante = "Selecciona un pie dominante";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const dataToSend = {
      ...playerData,
      imageFile: playerData.imageFile?.name || "", // Solo enviamos el nombre de la imagen
    };

    try {
      const res = await fetch("http://localhost:3001/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        const result = await res.json();
        alert("Jugador guardado con éxito");
      } else {
        const error = await res.json();
        alert("Error al guardar jugador: " + error.error);
      }
    } catch (err) {
      console.error("Error al enviar datos:", err);
      alert("Error de conexión al guardar jugador");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, margin: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Agregar nuevo jugador
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          name="name"
          label="Nombre"
          value={playerData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
          required
        />

        <TextField
          name="team"
          label="Equipo"
          value={playerData.team}
          onChange={handleChange}
          error={!!errors.team}
          helperText={errors.team}
          fullWidth
          required
        />

        <TextField
          name="position"
          label="Posición"
          value={playerData.position}
          onChange={handleChange}
          select
          error={!!errors.position}
          helperText={errors.position}
          fullWidth
          required
        >
          <MenuItem value="Portero">Portero</MenuItem>
          <MenuItem value="Defensa">Defensa</MenuItem>
          <MenuItem value="Medio">Medio</MenuItem>
          <MenuItem value="Delantero">Delantero</MenuItem>
        </TextField>

        <TextField
          name="teamNumber"
          label="Número de camiseta"
          value={playerData.teamNumber}
          onChange={handleChange}
          error={!!errors.teamNumber}
          helperText={errors.teamNumber}
          fullWidth
          required
        />

        <Button variant="outlined" component="label" fullWidth>
          {playerData.imageFile
            ? "Imagen cargada: " + playerData.imageFile.name
            : "Subir imagen"}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </Button>
        {errors.imageFile && (
          <FormHelperText error>{errors.imageFile}</FormHelperText>
        )}

        <TextField
          name="edad"
          label="Edad"
          value={playerData.attributes.edad}
          onChange={handleAttributeChange}
          error={!!errors.edad}
          helperText={errors.edad}
          fullWidth
        />

        <TextField
          name="altura"
          label="Altura (cm)"
          value={playerData.attributes.altura}
          onChange={handleAttributeChange}
          error={!!errors.altura}
          helperText={errors.altura}
          fullWidth
        />

        <TextField
          name="peso"
          label="Peso (kg)"
          value={playerData.attributes.peso}
          onChange={handleAttributeChange}
          error={!!errors.peso}
          helperText={errors.peso}
          fullWidth
        />

        <TextField
          name="pieDominante"
          label="Pie dominante"
          value={playerData.attributes.pieDominante}
          onChange={handleAttributeChange}
          select
          error={!!errors.pieDominante}
          helperText={errors.pieDominante}
          fullWidth
          required
        >
          <MenuItem value="Derecho">Derecho</MenuItem>
          <MenuItem value="Izquierdo">Izquierdo</MenuItem>
          <MenuItem value="Ambidiestro">Ambidiestro</MenuItem>
        </TextField>

        <Button type="submit" variant="contained" color="primary">
          Guardar jugador
        </Button>
      </Box>
    </Paper>
  );
}
