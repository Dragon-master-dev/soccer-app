// src/types.ts

export interface Player {
  id: number;
  name: string;
  team: string;
  position: string;
  image: string;
  teamNumber?: number;
  edad: number;
  altura: number;
  peso: number;
  pieDominante: string;
}

export interface PlayerAttributes {
  edad: number;
  altura: number;
  peso: number;
  pieDominante: string;
}
