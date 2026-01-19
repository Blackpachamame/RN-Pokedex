export type PokemonTabKey = "about" | "stats" | "evolutions";

const POKEMON_TABS: { key: PokemonTabKey; label: string }[] = [
  { key: "about", label: "About" },
  { key: "stats", label: "Stats" },
  { key: "evolutions", label: "Evolutions" },
];

export default POKEMON_TABS;
