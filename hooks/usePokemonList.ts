import { fetchPokemonList } from "@/services/pokeapi";
import { PokemonListItem } from "@/types/pokemon";
import { useEffect, useRef, useState } from "react";

const ITEMS_PER_PAGE = 20;
const MAX_POKEMON = 1025; // Límite máximo de Pokémon

/**
 * Hook personalizado para manejar lista de Pokémon con infinite scroll
 */
export function usePokemonList() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const isLoadingMoreRef = useRef(false);

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const data = await fetchPokemonList(ITEMS_PER_PAGE, 0);
      setPokemons(data);
      setOffset(ITEMS_PER_PAGE);
      setHasMore(true);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load Pokémon. Pull to retry.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadMore = async () => {
    if (isLoadingMoreRef.current || loadingMore || !hasMore || loading || refreshing) {
      return;
    }

    // Verificar si ya llegamos al límite
    if (offset >= MAX_POKEMON) {
      setHasMore(false);
      return;
    }

    isLoadingMoreRef.current = true;
    setLoadingMore(true);

    try {
      // Calcular cuántos items traer (podría ser menos de 20 si estamos cerca del límite)
      const remainingItems = MAX_POKEMON - offset;
      const itemsToFetch = Math.min(ITEMS_PER_PAGE, remainingItems);

      const data = await fetchPokemonList(itemsToFetch, offset);

      // Si trajimos menos de lo esperado O llegamos al límite
      if (data.length < ITEMS_PER_PAGE || offset + data.length >= MAX_POKEMON) {
        setHasMore(false);
      }

      setPokemons((prev) => [...prev, ...data]);
      setOffset((prev) => prev + data.length);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
      isLoadingMoreRef.current = false;
    }
  };

  const refresh = () => {
    loadPokemons(true);
  };

  return {
    pokemons,
    loading,
    loadingMore,
    refreshing,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}
