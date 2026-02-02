import PokemonCard from "@/components/PokemonCard/PokemonCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import { fetchPokemonIndex, fetchPokemonList } from "@/services/pokeapi";
import { PokemonIndexItem, PokemonListItem } from "@/types/pokemon";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ITEMS_PER_PAGE = 20;

export default function Index() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [pokemonsIndex, setPokemonsIndex] = useState<PokemonIndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PokemonListItem[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const isLoadingMoreRef = useRef(false);

  // Carga inicial
  useEffect(() => {
    loadPokemons();
    loadPokemonsIndex();
  }, []);

  // Debounce del search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadPokemonsIndex = async () => {
    try {
      const data = await fetchPokemonIndex();
      setPokemonsIndex(data);
    } catch (err) {
      console.error(err);
    }
  };

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

    isLoadingMoreRef.current = true;
    setLoadingMore(true);

    try {
      const data = await fetchPokemonList(ITEMS_PER_PAGE, offset);

      if (data.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }

      setPokemons((prev) => [...prev, ...data]);
      setOffset((prev) => prev + ITEMS_PER_PAGE);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
      isLoadingMoreRef.current = false;
    }
  };

  // Búsqueda en el índice completo
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

        // Filtrar en el índice (todos los Pokémon)
        const matched = pokemonsIndex.filter(
          (p) => p.name.includes(query) || p.id.toString().includes(query),
        );

        // Limitar a los primeros 50 resultados para no saturar
        const limited = matched.slice(0, 50);

        // Traer los datos básicos de los que matchean (más rápido que fetchById)
        const results = await Promise.all(
          limited.map(async (p) => {
            try {
              // fetchPokemonList con offset del ID devuelve 1 pokemon con datos básicos
              const data = await fetchPokemonList(1, p.id - 1);
              return data[0] || null;
            } catch (err) {
              console.error(`Error fetching pokemon ${p.id}:`, err);
              return null;
            }
          }),
        );

        // Filtrar los que fallaron
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

  const onRefresh = useCallback(() => {
    setSearchQuery("");
    loadPokemons(true);
  }, []);

  // Loading inicial
  if (loading && pokemons.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6390F0" />
        <Text style={styles.loadingText}>Loading Pokémon...</Text>
      </View>
    );
  }

  // Error inicial
  if (error && pokemons.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorEmoji}>😕</Text>
        <Text style={styles.errorTitle}>Oops!</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={() => loadPokemons()}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  // Mostrar resultados de búsqueda o lista normal
  const isSearching = debouncedQuery.trim().length > 0;
  const dataToRender = isSearching ? searchResults : pokemons;

  return (
    <FlatList
      data={dataToRender}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/pokemon/${item.id}`)}>
          <PokemonCard pokemon={item} />
        </Pressable>
      )}
      // Deshabilitar infinite scroll durante búsqueda
      onEndReached={isSearching ? undefined : loadMore}
      onEndReachedThreshold={0.5}
      // SearchBar en el header
      ListHeaderComponent={<SearchBar value={searchQuery} onChangeText={setSearchQuery} />}
      // Empty state
      ListEmptyComponent={() => {
        if (searchLoading) {
          return (
            <View style={styles.emptyContainer}>
              <ActivityIndicator size="large" color="#6390F0" />
              <Text style={styles.loadingText}>Searching...</Text>
            </View>
          );
        }

        if (isSearching) {
          return (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyTitle}>No Pokémon found</Text>
              <Text style={styles.emptyMessage}>Try searching for a different name or number</Text>
            </View>
          );
        }

        return null;
      }}
      // Footer solo si NO está buscando
      ListFooterComponent={() => {
        if (isSearching || !loadingMore) return null;
        return (
          <View style={styles.footerLoader}>
            <ActivityIndicator size="small" color="#6390F0" />
            <Text style={styles.footerText}>Loading more...</Text>
          </View>
        );
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#6390F0"]}
          tintColor="#6390F0"
        />
      }
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  separator: {
    height: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyContainer: {
    paddingVertical: 64,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#64748B",
    fontWeight: "600",
  },
  errorEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#6390F0",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
  footerLoader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 12,
  },
  footerText: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
  },
});
