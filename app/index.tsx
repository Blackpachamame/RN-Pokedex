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
import { usePokemonList } from "@/hooks/usePokemonList";
import { usePokemonSearch } from "@/hooks/usePokemonSearch";
import { fetchPokemonIndex } from "@/services/pokeapi";
import { PokemonIndexItem } from "@/types/pokemon";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, RefreshControl, StyleSheet, View } from "react-native";

export default function Index() {
  const [pokemonsIndex, setPokemonsIndex] = useState<PokemonIndexItem[]>([]);

  // Custom hooks para separar lógica
  const { pokemons, loading, loadingMore, refreshing, error, hasMore, loadMore, refresh } =
    usePokemonList();

  const { searchQuery, setSearchQuery, searchResults, searchLoading, isSearching, clearSearch } =
    usePokemonSearch(pokemonsIndex);

  // Cargar índice completo (solo una vez)
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

  const onRefresh = useCallback(() => {
    clearSearch();
    refresh();
  }, [clearSearch, refresh]);

  // Loading inicial
  if (loading && pokemons.length === 0) {
    return <LoadingState />;
  }

  // Error inicial
  if (error && pokemons.length === 0) {
    return <ErrorState error={error} onRetry={refresh} />;
  }

  // Data a mostrar (búsqueda o lista normal)
  const dataToRender = isSearching ? searchResults : pokemons;

  return (
    <FlatList
      data={dataToRender}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={Separator}
      renderItem={renderItem}
      // Deshabilitar infinite scroll durante búsqueda
      onEndReached={isSearching ? undefined : loadMore}
      onEndReachedThreshold={0.5}
      // SearchBar en el header
      ListHeaderComponent={<SearchBar value={searchQuery} onChangeText={setSearchQuery} />}
      // Empty states
      ListEmptyComponent={() => {
        if (searchLoading) return <SearchingState />;
        if (isSearching) return <NoResultsState />;
        return null;
      }}
      // Footer
      ListFooterComponent={() => {
        // Durante búsqueda, no mostrar footer
        if (isSearching) return null;

        // Si está cargando más, mostrar spinner
        if (loadingMore) return <LoadingMoreFooter />;

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
});
