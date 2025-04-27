// src/types.ts

export interface Player {
  number: string;
  image_url: string | undefined;
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
