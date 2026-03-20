import { fetchPokemonIndex } from "@/services/pokeapi";
import { PokemonListIndex } from "@/types/pokemon";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePokemonList } from "./usePokemonList";
import { usePokemonSearch } from "./usePokemonSearch";
import { useTypeFilter } from "./useTypeFilter";

export function usePokedexData() {
  const [pokemonsIndex, setPokemonsIndex] = useState<PokemonListIndex[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const { pokemons, loading, loadingMore, refreshing, error, hasMore, loadMore, refresh } =
    usePokemonList();

  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    searchLoading,
    isSearching,
    clearSearch,
    loadMoreSearch,
    hasMoreSearch,
    totalSearchResults,
  } = usePokemonSearch(pokemonsIndex);

  const {
    typeResults,
    typeLoading,
    hasActiveFilters,
    indexLoading,
    loadMoreFiltered,
    hasMoreFiltered,
    totalTypeResults,
  } = useTypeFilter(selectedTypes);

  // Cargar índice ligero para búsqueda
  useEffect(() => {
    const loadIndex = async () => {
      try {
        const data = await fetchPokemonIndex();
        setPokemonsIndex(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadIndex();
  }, []);

  const handleTypeToggle = useCallback((type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  }, []);

  const onRefresh = useCallback(() => {
    clearSearch();
    setSelectedTypes([]);
    refresh();
  }, [clearSearch, refresh]);

  // Combinar resultados según estado activo
  const { dataToRender, totalResults, currentCount } = useMemo(() => {
    let data = [];

    if (isSearching && hasActiveFilters) {
      data = searchResults.filter((pokemon) =>
        pokemon.types.some((type) => selectedTypes.includes(type)),
      );
    } else if (isSearching) {
      data = searchResults;
    } else if (hasActiveFilters) {
      data = typeResults;
    } else {
      data = pokemons;
    }

    const uniqueMap = new Map();
    data.forEach((p) => uniqueMap.set(p.id, p));
    const unique = Array.from(uniqueMap.values());

    return {
      dataToRender: unique,
      totalResults: isSearching
        ? totalSearchResults
        : hasActiveFilters
          ? totalTypeResults
          : unique.length,
      currentCount: unique.length,
    };
  }, [
    isSearching,
    hasActiveFilters,
    searchResults,
    typeResults,
    pokemons,
    selectedTypes,
    totalSearchResults,
    totalTypeResults,
  ]);

  const handleLoadMore = useCallback(() => {
    if (isSearching && hasActiveFilters) return;
    if (isSearching) loadMoreSearch();
    else if (hasActiveFilters) loadMoreFiltered();
    else loadMore();
  }, [isSearching, hasActiveFilters, loadMoreSearch, loadMoreFiltered, loadMore]);

  const canLoadMore = useMemo(() => {
    return isSearching && hasActiveFilters
      ? false
      : isSearching
        ? hasMoreSearch
        : hasActiveFilters
          ? hasMoreFiltered
          : hasMore;
  }, [isSearching, hasActiveFilters, hasMoreSearch, hasMoreFiltered, hasMore]);

  const isLoadingMore = useMemo(() => {
    if (isSearching && hasActiveFilters) return false;
    if (isSearching && searchResults.length > 0) return searchLoading;
    if (hasActiveFilters && typeResults.length > 0) return typeLoading;
    if (pokemons.length > 0) return loadingMore;
    return false;
  }, [
    isSearching,
    hasActiveFilters,
    searchLoading,
    typeLoading,
    loadingMore,
    searchResults,
    typeResults,
    pokemons,
  ]);

  const isInitialLoading = useMemo(() => {
    if (isSearching && searchResults.length === 0) return searchLoading;
    if (hasActiveFilters && typeResults.length === 0) return typeLoading;
    return false;
  }, [isSearching, hasActiveFilters, searchLoading, typeLoading, searchResults, typeResults]);

  return {
    // Data
    dataToRender,
    totalResults,
    currentCount,
    // Estado de carga
    loading,
    loadingMore: isLoadingMore,
    refreshing,
    error,
    isInitialLoading,
    canLoadMore,
    // Búsqueda
    searchQuery,
    setSearchQuery,
    isSearching,
    // Filtros
    selectedTypes,
    handleTypeToggle,
    hasActiveFilters,
    indexLoading,
    // Acciones
    handleLoadMore,
    onRefresh,
    refresh,
  };
}
