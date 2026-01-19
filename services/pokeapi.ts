import axios from "axios";
import { PokemonDetails, PokemonListItem } from "../types/pokemon";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export async function fetchPokemonList(limit: number = 10): Promise<PokemonListItem[]> {
  try {
    const listResponse = await api.get(`/pokemon?limit=${limit}`);

    const pokemonDetails = await Promise.all(
      listResponse.data.results.map(async (pokemon: any) => {
        const detailResponse = await api.get(pokemon.url);
        const data = detailResponse.data;

        return {
          id: data.id,
          name: data.name,
          image: data.sprites.other["official-artwork"].front_default,
          types: data.types.map((t: any) => t.type.name),
        };
      }),
    );

    return pokemonDetails;
  } catch (error) {
    throw error;
  }
}

export async function fetchPokemonById(id: number): Promise<PokemonDetails> {
  try {
    const response = await api.get(`/pokemon/${id}`);
    const data = response.data;

    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other["official-artwork"].front_default,
      types: data.types.map((t: any) => t.type.name),
      height: data.height,
      weight: data.weight,
      abilities: data.abilities.map((a: any) => a.ability.name),
      stats: data.stats.map((stat: any) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
    };
  } catch (error) {
    throw error;
  }
}
