import PokemonCard from "@/components/PokemonCard/PokemonCard";
import { fetchPokemonList } from "@/services/pokeapi";
import { PokemonListItem } from "@/types/pokemon";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

export default function Index() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPokemons() {
      try {
        const data = await fetchPokemonList(10);
        setPokemons(data);
      } catch (err) {
        console.error(err);
        setError("Error cargando los Pokémon");
      } finally {
        setLoading(false);
      }
    }

    loadPokemons();
  }, []);

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <FlatList
      data={pokemons}
      style={{ padding: 16 }}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/pokemon/${item.id}`)}>
          <PokemonCard pokemon={item} />
        </Pressable>
      )}
    />
  );
}
