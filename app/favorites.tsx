import { FavoritesCounter } from "@/components/FavoritesScreen/FavoritesCounter";
import { FavoritesEmpty } from "@/components/FavoritesScreen/FavoritesEmpty";
import { FavoritesHeader } from "@/components/FavoritesScreen/FavoritesHeader";
import PokemonCard from "@/components/PokemonCard/PokemonCard";
import { useFavorites } from "@/context/FavoritesContext";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const styles = useThemedStyles((colors) =>
    StyleSheet.create({
      container: { flex: 1, backgroundColor: colors.background },
      listContent: { padding: 16, paddingBottom: 32 },
    }),
  );

  return (
    <View style={styles.container}>
      <FavoritesHeader />

      {favorites.length > 0 && <FavoritesCounter count={favorites.length} />}

      {favorites.length === 0 ? (
        <FavoritesEmpty />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`/pokemon/${item.id}`)}>
              <PokemonCard pokemon={item} />
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
