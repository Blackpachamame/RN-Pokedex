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

export type EvolutionChain = {
  id: number;
  name: string;
  image: string;
  minLevel: number | null;
  method?: string; // "Level Up", "Stone", "Trade", etc.
  item?: string; // "Thunder Stone", "Link Cable", etc.
};

export type PokemonDetails = {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: PokemonStat[];
  description: string;
  category: string;
  weaknesses: string[];
  evolutionChain: EvolutionChain[];
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
