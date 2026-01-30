import PokemonCard from "@/components/PokemonCard/PokemonCard";
import { fetchPokemonList } from "@/services/pokeapi";
import { PokemonListItem } from "@/types/pokemon";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Carga inicial
  useEffect(() => {
    loadPokemons();
  }, []);

  // Función para cargar Pokémon
  const loadPokemons = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
        setOffset(0);
        setHasMore(true);
      } else {
        setLoading(true);
      }

      const data = await fetchPokemonList(ITEMS_PER_PAGE, isRefresh ? 0 : offset);

      if (isRefresh) {
        setPokemons(data);
        setOffset(ITEMS_PER_PAGE);
      } else {
        setPokemons(data);
        setOffset(ITEMS_PER_PAGE);
      }

      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load Pokémon. Pull to retry.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Cargar más Pokémon (infinite scroll)
  const loadMore = async () => {
    if (loadingMore || !hasMore || loading) return;

    try {
      setLoadingMore(true);
      const data = await fetchPokemonList(ITEMS_PER_PAGE, offset);

      if (data.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }

      setPokemons((prev) => [...prev, ...data]);
      setOffset((prev) => prev + ITEMS_PER_PAGE);
    } catch (err) {
      console.error(err);
      // No mostrar error en loadMore, solo en carga inicial
    } finally {
      setLoadingMore(false);
    }
  };

  // Pull to refresh
  const onRefresh = useCallback(() => {
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

  // Error inicial (solo si no hay datos cargados)
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

  return (
    <FlatList
      data={pokemons}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      // Render item
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/pokemon/${item.id}`)}>
          <PokemonCard pokemon={item} />
        </Pressable>
      )}
      // Infinite scroll
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      // Footer (loading indicator)
      ListFooterComponent={() => {
        if (!loadingMore) return null;
        return (
          <View style={styles.footerLoader}>
            <ActivityIndicator size="small" color="#6390F0" />
            <Text style={styles.footerText}>Loading more...</Text>
          </View>
        );
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

  // Loading/Error states
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#64748B",
    fontWeight: "600",
  },

  // Error state
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

  // Footer
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
