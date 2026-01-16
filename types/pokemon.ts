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
