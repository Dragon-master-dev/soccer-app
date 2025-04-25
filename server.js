import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Ajusta si tienes contraseña
  database: "football_app", // Cambia según tu base de datos
});

// Ruta para insertar un nuevo jugador
app.post("/api/players", async (req, res) => {
  const { name, team, position, teamNumber, imageFile, attributes } = req.body;
  const { edad, altura, peso, pieDominante } = attributes;

  try {
    await db.execute(
      `INSERT INTO players (name, team, position, teamNumber, image, edad, altura, peso, pieDominante)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        team,
        position,
        teamNumber,
        imageFile,
        edad,
        altura,
        peso,
        pieDominante,
      ]
    );

    res.status(200).json({ message: "Jugador insertado correctamente" });
  } catch (error) {
    console.error("Error al insertar jugador:", error);
    res.status(500).json({ error: "Error al insertar jugador" });
  }
});

// Ruta de prueba opcional
app.get("/", (req, res) => {
  res.send("Servidor corriendo correctamente ✅");
});

// Ruta para obtener todos los jugadores
app.get("/api/players", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM players");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener jugadores:", error);
    res.status(500).json({ error: "Error al obtener jugadores" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
