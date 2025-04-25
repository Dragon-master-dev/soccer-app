import { red, purple, yellow, blue, blueGrey } from "@mui/material/colors";

/**
 * Devuelve un color en base a la posición del jugador.
 * @param pos Posición del jugador (texto)
 * @returns Color hexadecimal
 */
export function getPositionColor(pos: string): string {
  const lower = pos.toLowerCase();
  if (lower.includes("defensa")) return red[400];
  if (lower.includes("portero")) return purple[500];
  if (lower.includes("medio")) return yellow[900];
  if (lower.includes("delantero")) return blue[500];
  return blueGrey[300];
}
