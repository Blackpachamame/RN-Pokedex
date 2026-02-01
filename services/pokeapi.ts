import axios from "axios";
import { EvolutionChain, PokemonDetails, PokemonListItem, PokemonMove } from "../types/pokemon";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

/**
 * OPTIMIZADO: Solo 1 request en lugar de N+1
 * Usa URLs predecibles de PokeAPI para imágenes
 */
export async function fetchPokemonList(
  limit: number = 20,
  offset: number = 0,
): Promise<PokemonListItem[]> {
  try {
    const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);

    return response.data.results.map((pokemon: any) => {
      const pokemonId = parseInt(pokemon.url.split("/").filter(Boolean).pop() || "0");

      return {
        id: pokemonId,
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
        types: [],
      };
    });
  } catch (error) {
    console.error("Error fetching pokemon list:", error);
    throw new Error("Failed to fetch Pokémon list");
  }
}

/**
 * Fetch tipos de un Pokémon específico (para usar opcionalmente)
 * Útil si querés mostrar tipos en la lista después
 */
export async function fetchPokemonTypes(id: number): Promise<string[]> {
  try {
    const response = await api.get(`/pokemon/${id}`);
    return response.data.types.map((t: any) => t.type.name);
  } catch (error) {
    console.error(`Error fetching types for pokemon ${id}:`, error);
    return [];
  }
}

export async function fetchPokemonById(id: number): Promise<PokemonDetails> {
  try {
    const response = await api.get(`/pokemon/${id}`);
    const data = response.data;

    const speciesResponse = await api.get(`/pokemon-species/${id}`);
    const speciesData = speciesResponse.data;

    const flavorTextEntry = speciesData.flavor_text_entries.find(
      (entry: any) => entry.language.name === "en",
    );
    const description =
      flavorTextEntry?.flavor_text
        .replace(/[\n\f\r]/g, " ")
        .replace(/\s\s+/g, " ")
        .trim() || "";

    const genusEntry = speciesData.genera.find((genus: any) => genus.language.name === "en");
    const category = genusEntry?.genus || "";

    const weaknesses = await fetchWeaknesses(data.types.map((t: any) => t.type.name));
    // Obtener cadena de evolución COMPLETA (incluyendo ramificaciones)
    const evolutionChain = await fetchEvolutionChain(speciesData.evolution_chain.url);

    const moves = await fetchMoves(data.moves);

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
      description,
      category,
      weaknesses,
      evolutionChain,
      moves,
    };
  } catch (error) {
    console.error(`Error fetching pokemon ${id}:`, error);
    throw new Error(`Failed to fetch Pokémon #${id}`);
  }
}

async function fetchWeaknesses(types: string[]): Promise<string[]> {
  try {
    const weaknessesSet = new Set<string>();

    for (const typeName of types) {
      const typeResponse = await api.get(`/type/${typeName}`);
      const damageRelations = typeResponse.data.damage_relations;

      damageRelations.double_damage_from.forEach((type: any) => {
        weaknessesSet.add(type.name);
      });
    }

    return Array.from(weaknessesSet);
  } catch (error) {
    console.error("Error fetching weaknesses:", error);
    return [];
  }
}

// Helper para manejar evoluciones ramificadas
async function fetchEvolutionChain(evolutionChainUrl: string): Promise<EvolutionChain[]> {
  try {
    const response = await axios.get(evolutionChainUrl);
    const chain = response.data.chain;

    const evolutions: EvolutionChain[] = [];

    // Función recursiva que maneja múltiples ramas
    const processChain = async (chainLink: any, level: number = 0) => {
      const speciesUrl = chainLink.species.url;
      const speciesId = parseInt(speciesUrl.split("/").filter(Boolean).pop());

      const pokemonResponse = await api.get(`/pokemon/${speciesId}`);
      const pokemonData = pokemonResponse.data;

      const evolutionDetails = chainLink.evolution_details[0];
      const minLevel = evolutionDetails?.min_level || null;

      evolutions.push({
        id: speciesId,
        name: chainLink.species.name,
        image: pokemonData.sprites.other["official-artwork"].front_default,
        minLevel,
      });

      // Procesar TODAS las ramas de evolución
      if (chainLink.evolves_to && chainLink.evolves_to.length > 0) {
        // Si hay múltiples ramas (como Eevee), procesarlas todas
        for (const evolution of chainLink.evolves_to) {
          await processChain(evolution, level + 1);
        }
      }
    };

    await processChain(chain);
    return evolutions;
  } catch (error) {
    console.error("Error fetching evolution chain:", error);
    return [];
  }
}

async function fetchMoves(movesData: any[]): Promise<PokemonMove[]> {
  try {
    // Limitar a los primeros 20 moves más relevantes (por level-up)
    const levelUpMoves = movesData
      .filter((m: any) =>
        m.version_group_details.some((v: any) => v.move_learn_method.name === "level-up"),
      )
      .slice(0, 20);

    // Fetch detalles de cada move
    const movesPromises = levelUpMoves.map(async (moveData: any) => {
      try {
        const moveResponse = await api.get(moveData.move.url);
        const move = moveResponse.data;

        // Obtener el primer método de aprendizaje (level-up)
        const versionDetail = moveData.version_group_details.find(
          (v: any) => v.move_learn_method.name === "level-up",
        );

        return {
          name: move.name,
          type: move.type.name,
          category: move.damage_class.name,
          power: move.power,
          accuracy: move.accuracy,
          pp: move.pp,
          learnMethod: versionDetail?.move_learn_method.name || "level-up",
          levelLearnedAt: versionDetail?.level_learned_at || null,
        };
      } catch (err) {
        console.error(`Error fetching move details:`, err);
        return null;
      }
    });

    const moves = await Promise.all(movesPromises);

    // Filtrar nulls y ordenar por nivel
    return moves
      .filter((m): m is PokemonMove => m !== null)
      .sort((a, b) => (a.levelLearnedAt || 0) - (b.levelLearnedAt || 0));
  } catch (error) {
    console.error("Error fetching moves:", error);
    return [];
  }
}
