import {
  ErrorState,
  LoadingMoreFooter,
  LoadingState,
  NoResultsState,
  SearchingState,
} from "@/components/EmptyStates/EmptyStates";
import { EndOfListMessage } from "@/components/EndOfListMessage/EndOfListMessage";
import PokemonCard from "@/components/PokemonCard/PokemonCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import { TypeFilters } from "@/components/TypeFilters/TypeFilters";
import { usePokemonList } from "@/hooks/usePokemonList";
import { usePokemonSearch } from "@/hooks/usePokemonSearch";
import { useTypeFilter } from "@/hooks/useTypeFilter";
import { fetchPokemonIndex } from "@/services/pokeapi";
import { PokemonListIndex } from "@/types/pokemon";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [pokemonsIndex, setPokemonsIndex] = useState<PokemonListIndex[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Hook para lista normal (paginada)
  const { pokemons, loading, loadingMore, refreshing, error, hasMore, loadMore, refresh } =
    usePokemonList();

  // Hook para búsqueda
  const { searchQuery, setSearchQuery, searchResults, searchLoading, isSearching, clearSearch } =
    usePokemonSearch(pokemonsIndex);

  // Hook para filtrado por tipo
  const { typeResults, typeLoading, hasActiveFilters, indexLoading } = useTypeFilter(selectedTypes);

  // Cargar índice completo (para búsqueda)
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
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      }
      return [...prev, type];
    });
  }, []);

  const onRefresh = useCallback(() => {
    clearSearch();
    setSelectedTypes([]);
    refresh();
  }, [clearSearch, refresh]);

  // Determinar qué data mostrar (prioridad: búsqueda > filtros > lista normal)
  const dataToRender = useMemo(() => {
    if (isSearching) return searchResults;
    if (hasActiveFilters) return typeResults;
    return pokemons;
  }, [isSearching, hasActiveFilters, searchResults, typeResults, pokemons]);

  // Determinar si está cargando
  const isLoading = useMemo(() => {
    if (isSearching) return searchLoading;
    if (hasActiveFilters) return typeLoading;
    return loadingMore;
  }, [isSearching, hasActiveFilters, searchLoading, typeLoading, loadingMore]);

  // Loading inicial
  if (loading && pokemons.length === 0) {
    return <LoadingState />;
  }

  // Error inicial
  if (error && pokemons.length === 0) {
    return <ErrorState error={error} onRetry={refresh} />;
  }

  return (
    <FlatList
      data={dataToRender}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={Separator}
      renderItem={renderItem}
      // Deshabilitar infinite scroll durante búsqueda o filtros
      onEndReached={isSearching || hasActiveFilters ? undefined : loadMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
          {/* Mostrar filtros solo cuando el índice esté cargado */}
          {!indexLoading && (
            <TypeFilters selectedTypes={selectedTypes} onTypeToggle={handleTypeToggle} />
          )}
          {/* Contador de resultados para filtros */}
          {hasActiveFilters && typeResults.length > 0 && (
            <View style={styles.resultCounter}>
              <Text style={styles.resultCounterText}>{typeResults.length} Pokémon found</Text>
            </View>
          )}
        </>
      }
      // Empty states
      ListEmptyComponent={() => {
        if (searchLoading || typeLoading) return <SearchingState />;
        if (isSearching || hasActiveFilters) return <NoResultsState />;
        return null;
      }}
      // Footer
      ListFooterComponent={() => {
        // Durante búsqueda o filtros, no mostrar footer normal
        if (isSearching || hasActiveFilters) return null;

        // Si está cargando más, mostrar spinner
        if (isLoading) return <LoadingMoreFooter />;

        // Si no hay más items (llegó al límite de 1025), mostrar mensaje
        if (!hasMore && pokemons.length > 0) return <EndOfListMessage />;

        return null;
      }}
      // Pull to refresh
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#6390F0"]}
          tintColor="#6390F0"
        />
      }
      // Performance
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      keyboardShouldPersistTaps="handled"
    />
  );
}

// Componentes auxiliares fuera para evitar re-creación
const Separator = () => <View style={styles.separator} />;

const renderItem = ({ item }: { item: any }) => (
  <Pressable onPress={() => router.push(`/pokemon/${item.id}`)}>
    <PokemonCard pokemon={item} />
  </Pressable>
);

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  separator: {
    height: 16,
  },
  resultCounter: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#EEF2FF",
    borderRadius: 8,
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  resultCounterText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6390F0",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
