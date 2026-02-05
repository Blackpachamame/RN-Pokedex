import { fetchPokemonList } from "@/services/pokeapi";
import { PokemonListIndex, PokemonListItem } from "@/types/pokemon";
import { useEffect, useState } from "react";

/**
 * Hook personalizado para manejar búsqueda de Pokémon
 * Separa la lógica de búsqueda del componente principal
 */
export function usePokemonSearch(pokemonsIndex: PokemonListIndex[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PokemonListItem[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Búsqueda
  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    const runSearch = async () => {
      setSearchLoading(true);

      try {
        const query = debouncedQuery.toLowerCase();

        // Filtrar en el índice
        const matched = pokemonsIndex.filter(
          (p) => p.name.toLowerCase().includes(query) || p.id.toString().includes(query),
        );

        // Limitar a 50 resultados
        const limited = matched.slice(0, 50);

        // ✅ Fetch datos completos con tipos
        const results = await Promise.all(
          limited.map(async (p) => {
            try {
              const data = await fetchPokemonList(1, p.id - 1);
              return data[0] || null;
            } catch (err) {
              console.error(`Error fetching pokemon ${p.id}:`, err);
              return null;
            }
          }),
        );

        const validResults = results.filter((r): r is PokemonListItem => r !== null);
        setSearchResults(validResults);
      } catch (e) {
        console.error(e);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    };

    runSearch();
  }, [debouncedQuery, pokemonsIndex]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  const isSearching = debouncedQuery.trim().length > 0;

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    searchLoading,
    isSearching,
    clearSearch,
  };
}
