// src/components/CardMenu.tsx
import { useState } from "react"; // Hook para manejar el estado en un componente funcional.
import ButtonGroup from "@mui/material/ButtonGroup"; // Componente de Material-UI para agrupar botones.
import Button from "@mui/material/Button"; // Componente de Material-UI para crear botones.
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined"; // Icono de Material-UI para usar en el botón.
import Backdrop from "@mui/material/Backdrop"; // Componente de Material-UI para mostrar un fondo oscuro detrás de un modal.
import Box from "@mui/material/Box"; // Componente de Material-UI para crear un contenedor flexible.
import FieldView from "./FieldView"; // Componente personalizado que probablemente muestra un campo de juego.
import { usePlayerAssignment } from "./PlayerAssignmentContext"; // Hook personalizado para manejar la asignación de jugadores.
import { Player } from "../types";

// Definimos el componente principal `CardMenu`.
// Este componente recibe una propiedad llamada `activePlayer` que representa al jugador actualmente seleccionado.
export default function CardMenu({ activePlayer }: { activePlayer: Player }) {
  // Definimos un estado llamado `openBackdrop` para controlar si el Backdrop (fondo oscuro) está visible o no.
  const [openBackdrop, setOpenBackdrop] = useState(false);

  // Usamos el hook personalizado `usePlayerAssignment` para obtener funciones y datos relacionados con la asignación de jugadores.
  const { assignPlayerToPosition, assignedPlayers } = usePlayerAssignment();

  // Función para abrir el Backdrop. Cambia el estado `openBackdrop` a `true`.
  const handleOpen = () => setOpenBackdrop(true);

  // Función para cerrar el Backdrop. Cambia el estado `openBackdrop` a `false`.
  const handleClose = () => setOpenBackdrop(false);

  // Función para asignar un jugador a una posición específica.
  // Recibe un índice (`index`) que representa la posición en el campo.
  const handleAssignPosition = (index: number) => {
    // Si hay un jugador activo, lo asignamos a la posición indicada.
    if (activePlayer) {
      console.log("Asignando jugador:", activePlayer); // Muestra los datos del jugador activo en la consola.
      console.log("Posición seleccionada:", index); // Muestra la posición seleccionada en la consola.
      assignPlayerToPosition(index, activePlayer); // Asigna el jugador a la posición.
    } else {
      console.log("No hay jugador activo para asignar."); // Mensaje si no hay jugador activo.
    }
    // Cerramos el Backdrop después de asignar la posición.
    setOpenBackdrop(false);
  };

  // El componente retorna el JSX que define su estructura visual.
  return (
    <>
      {/* Grupo de botones que incluye dos botones: uno para cambiar y otro para comparar. */}
      <ButtonGroup sx={{ mb: 1 }}>
        {/* Botón para abrir el Backdrop. */}
        <Button
          variant="contained" // Estilo del botón: relleno sólido.
          color="primary" // Color principal del botón.
          size="small" // Tamaño pequeño del botón.
          onClick={handleOpen} // Evento que se ejecuta al hacer clic en el botón.
        >
          {/* Icono dentro del botón. */}
          <ChangeCircleOutlinedIcon />
          Cambiar {/* Texto del botón. */}
        </Button>
        {/* Botón adicional para comparar (actualmente no tiene funcionalidad). */}
        <Button>Comparar</Button>
      </ButtonGroup>

      {/* Backdrop: fondo oscuro que aparece detrás de un modal o contenido emergente. */}
      <Backdrop
        open={openBackdrop} // Controla si el Backdrop está visible o no.
        onClick={handleClose} // Cierra el Backdrop al hacer clic fuera del contenido.
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,

          height: "97.5vh",
          bgcolor: "rgba(0, 141, 28, 0.47)", // Color de fondo del Backdrop.
          backdropFilter: "blur(25px)",
          borderRadius: 3,
        }} // Ajusta la posición del Backdrop en la pila de elementos.
      >
        {/* Caja que contiene el contenido del Backdrop. */}
        <Box
          onClick={(e) => e.stopPropagation()} // Evita que el clic en la caja cierre el Backdrop.
          sx={{
            width: "40vw",
            height: "60vh",
            padding: 2,
            margin: "5",
            backdropFilter: "blur(1px)",
            borderRadius: 3,
            boxShadow: 3,
          }} // Estilo de la caja: tamaño relativo al ancho y alto de la ventana.
        >
          {/* Componente personalizado `FieldView` que probablemente muestra un campo de juego. */}
          <FieldView
            onPositionSelect={handleAssignPosition} // Función que se ejecuta al seleccionar una posición en el campo.
            assignedPlayers={assignedPlayers} // Lista de jugadores ya asignados a posiciones.
          />
        </Box>
      </Backdrop>
    </>
  );
}
