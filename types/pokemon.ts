export type PokemonListItem = {
  id: number;
  name: string;
  image: string;
  types: string[];
};

export type PokemonStat = {
  name: string;
  value: number;
};

export type PokemonDetails = {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  stats: PokemonStat[];
};

export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";
