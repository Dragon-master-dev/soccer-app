// import React from "react";
// import { Box, Card, Typography, CardMedia, ButtonBase } from "@mui/material";
// import { Player } from "../types";

// export interface Player {
//   id: string;
//   name: string;
//   position: string;
//   image: string;
// }

// interface PlayerListMiniProps {
//   players: Player[];
//   onSelect: (player: Player) => void;
// }

// export default function PlayerListMini({
//   players,
//   onSelect,
// }: PlayerListMiniProps) {
//   const validPlayers = Array.isArray(players) ? players : [];

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexWrap: "wrap",
//         gap: 2,
//         justifyContent: "center",
//       }}
//     >
//       {validPlayers.map((player) => (
//         <ButtonBase
//           key={player.id}
//           onClick={() => onSelect(player)}
//           sx={{ borderRadius: 2 }}
//         >
//           <Card
//             sx={{
//               width: 120,
//               p: 1,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               backgroundColor: "rgba(255,255,255,0.1)",
//               backdropFilter: "blur(6px)",
//               boxShadow: 3,
//               borderRadius: 2,
//             }}
//           >
//             <CardMedia
//               component="img"
//               image={player.image}
//               alt={player.name}
//               sx={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 objectFit: "cover",
//                 mb: 1,
//               }}
//             />
//             <Typography variant="body2" fontWeight="bold" textAlign="center">
//               {player.name}
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               {player.position}
//             </Typography>
//           </Card>
//         </ButtonBase>
//       ))}
//     </Box>
//   );
// }
