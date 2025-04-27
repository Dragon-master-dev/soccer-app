import { formation442 } from "../constants/getFormation442";
import FieldLines from "./FieldLines";
import { getPositionColor } from "../constants/getPositionColor";
import { usePlayerAssignment } from "./PlayerAssignmentContext";
import { Player } from "../types";

type Props = {
  onPositionSelect: (index: number) => void;
  assignedPlayers: (Player | null)[]; // Add the assignedPlayers property to the Props type.
};

const FieldView = ({ onPositionSelect }: Props) => {
  const { assignedPlayers } = usePlayerAssignment();

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <svg
        viewBox="0 0 100 140"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        <FieldLines />

        {formation442.map((pos, index) => {
          const player = assignedPlayers[index];

          // Procesamos el nombre del jugador
          const processedName = player
            ? `${player.name.split(" ")[0]} ${
                player.name.split(" ")[1]?.charAt(0) || ""
              }.`
            : "";

          return (
            <g
              key={index}
              onClick={() => onPositionSelect?.(index)}
              style={{ cursor: "pointer" }}
            >
              {/* Círculo base que representa la posición en el campo */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="6"
                fill="white"
                stroke={
                  player ? getPositionColor(player.position || "") : "gray"
                }
                strokeWidth="1"
              />

              {/* Si hay un jugador asignado, mostramos su imagen y detalles */}
              {player && (
                <>
                  {/* Imagen del jugador */}
                  <image
                    href={player.image_url}
                    x={pos.x - 6}
                    y={pos.y - 6}
                    width="12"
                    height="12"
                    clipPath="circle(5.5px at center)"
                  />

                  {/* Nombre del jugador con estilo */}
                  <text
                    x={pos.x}
                    y={pos.y + 10}
                    textAnchor="middle"
                    fontSize="3.5"
                    fontWeight="600"
                    fontFamily="Roboto"
                    fill={
                      player ? getPositionColor(player.position || "") : "gray"
                    }
                    style={{
                      backgroundColor: "white", // Fondo blanco
                      borderRadius: "5px", // Bordes redondeados
                      padding: "2px", // Espaciado interno
                    }}
                  >
                    {processedName}
                  </text>

                  {/* Número del jugador con estilo */}
                  <text
                    x={pos.x}
                    y={pos.y + 14}
                    textAnchor="middle"
                    fontSize="3.5"
                    fontFamily="Roboto"
                    fill="white"
                    style={{
                      backgroundColor: "white", // Fondo blanco
                      borderRadius: "5px", // Bordes redondeados
                      padding: "2px", // Espaciado interno
                    }}
                  >
                    #{player.number ?? "?"}
                  </text>
                </>
              )}

              {/* Si no hay jugador asignado, mostramos la leyenda "No asignado" */}
              {!player && (
                <text
                  x={pos.x}
                  y={pos.y + 10}
                  textAnchor="middle"
                  fontSize="2.5"
                  fontWeight="200"
                  fontFamily="Roboto"
                  fill="white"
                >
                  No asignado
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default FieldView;
