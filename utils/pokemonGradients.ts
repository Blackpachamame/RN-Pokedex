import { darkenHexColor } from "./color";
import { pokemonTypeColors } from "./pokemonColors";

export const getPokemonGradient = (types: string[]): [string, string, string] => {
  if (types.length === 0) {
    return ["#A8A878", "#8F8F7A", "#6F6F5A"]; // neutral
  }

  if (types.length === 1) {
    const base = pokemonTypeColors[types[0]];
    const mid = darkenHexColor(base, 0.25);
    const end = darkenHexColor(base, 0.45);

    return [base, mid, end];
  }

  const primary = pokemonTypeColors[types[0]];
  const secondary = pokemonTypeColors[types[1]];

  const mid = darkenHexColor(primary, 0.3);

  return [primary, mid, secondary];
};
