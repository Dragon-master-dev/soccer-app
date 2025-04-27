// src/components/PlayerAssignmentContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Player } from "../types";

type PlayerAssignmentContextType = {
  assignedPlayers: (Player | null)[]; // Lista de jugadores asignados a posiciones.
  assignPlayerToPosition: (index: number, player: Player) => void; // Función para asignar un jugador a una posición.
  activePlayer: Player | null; // Jugador actualmente seleccionado.
  setActivePlayer: (player: Player | null) => void; // Función para actualizar el jugador activo.
};

const PlayerAssignmentContext = createContext<
  PlayerAssignmentContextType | undefined
>(undefined);

export const usePlayerAssignment = () => {
  const context = useContext(PlayerAssignmentContext);
  if (!context)
    throw new Error("usePlayerAssignment debe usarse dentro del Provider");
  return context;
};

export const PlayerAssignmentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [assignedPlayers, setAssignedPlayers] = useState<(Player | null)[]>(
    Array(11).fill(null) // Inicializamos con 11 posiciones vacías.
  );
  const [activePlayer, setActivePlayer] = useState<Player | null>(null); // Estado para el jugador activo.

  const assignPlayerToPosition = (index: number, player: Player) => {
    setAssignedPlayers((prev) => {
      // Creamos una copia del estado actual de los jugadores asignados
      const updated = [...prev];

      // Verificamos si el jugador ya está asignado a otra posición
      const currentIndex = updated.findIndex(
        (assignedPlayer) => assignedPlayer?.id === player.id
      );

      if (currentIndex !== -1) {
        // Si el jugador ya está asignado a otra posición, lo eliminamos de esa posición
        updated[currentIndex] = null;
      }

      // Asignamos el nuevo jugador a la posición seleccionada
      updated[index] = player;

      return updated;
    });
  };

  return (
    <PlayerAssignmentContext.Provider
      value={{
        assignedPlayers,
        assignPlayerToPosition,
        activePlayer,
        setActivePlayer,
      }}
    >
      {children}
    </PlayerAssignmentContext.Provider>
  );
};
