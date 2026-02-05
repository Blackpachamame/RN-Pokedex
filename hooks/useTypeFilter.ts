import { fetchPokemonList, fetchPokemonsByType } from "@/services/pokeapi";
import { PokemonListIndex, PokemonListItem } from "@/types/pokemon";
import { POKEMON_TYPE_IDS } from "@/utils/pokemonTypes";
import { useEffect, useState } from "react";

/**
 * Hook simplificado para filtrado por tipo
 * Similar a usePokemonSearch
 */
export function useTypeFilter(selectedTypes: string[]) {
  const [typeIndex, setTypeIndex] = useState<Record<string, PokemonListIndex[]>>({});
  const [typeResults, setTypeResults] = useState<PokemonListIndex[]>([]);
  const [typeLoading, setTypeLoading] = useState(false);
  const [indexLoading, setIndexLoading] = useState(false);

  const hasActiveFilters = selectedTypes.length > 0;

  // Cargar índice completo la primera vez que se usa
  useEffect(() => {
    if (Object.keys(typeIndex).length > 0) return; // Ya cargado

    const loadTypeIndex = async () => {
      setIndexLoading(true);
      try {
        console.log("🔄 Loading type index...");

        // Cargar los 18 tipos en paralelo
        const typePromises = Object.entries(POKEMON_TYPE_IDS).map(async ([typeName, typeId]) => {
          try {
            const pokemonList = await fetchPokemonsByType(typeId);
            return { typeName, pokemonList };
          } catch (err) {
            console.error(`Error loading type ${typeName}:`, err);
            return { typeName, pokemonList: [] };
          }
        });

        const results = await Promise.all(typePromises);

        const index = results.reduce(
          (acc, { typeName, pokemonList }) => {
            acc[typeName] = pokemonList;
            return acc;
          },
          {} as Record<string, PokemonListIndex[]>,
        );

        setTypeIndex(index);
        console.log("✅ Type index loaded");
      } catch (err) {
        console.error("Error loading type index:", err);
      } finally {
        setIndexLoading(false);
      }
    };

    // Cargar después de un delay para no bloquear el inicio
    const timer = setTimeout(loadTypeIndex, 500);
    return () => clearTimeout(timer);
  }, []);

  // Cargar Pokémon cuando cambian los tipos seleccionados
  useEffect(() => {
    if (selectedTypes.length === 0) {
      setTypeResults([]);
      return;
    }

    // Esperar a que el índice esté cargado
    if (Object.keys(typeIndex).length === 0) return;

    const loadFilteredPokemon = async () => {
      setTypeLoading(true);

      try {
        // Combinar IDs de todos los tipos seleccionados
        const combinedIds = new Set<number>();
        selectedTypes.forEach((type) => {
          const pokemonList = typeIndex[type] || [];
          pokemonList.forEach((p) => combinedIds.add(p.id));
        });

        // Ordenar y limitar a 50
        const sortedIds = Array.from(combinedIds).sort((a, b) => a - b);
        const idsToLoad = sortedIds.slice(0, 50);

        // Cargar Pokémon en paralelo
        const results = await Promise.all(
          idsToLoad.map(async (id) => {
            try {
              const data = await fetchPokemonList(1, id - 1);
              return data[0] || null;
            } catch (err) {
              console.error(`Error fetching pokemon ${id}:`, err);
              return null;
            }
          }),
        );

        const validResults = results.filter((r): r is PokemonListItem => r !== null);
        setTypeResults(validResults);
      } catch (e) {
        console.error(e);
        setTypeResults([]);
      } finally {
        setTypeLoading(false);
      }
    };

    loadFilteredPokemon();
  }, [selectedTypes, typeIndex]);

  return {
    typeResults,
    typeLoading,
    hasActiveFilters,
    indexLoading,
  };
}
