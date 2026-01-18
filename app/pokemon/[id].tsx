import PokemonHeader from "@/components/PokemonHeader/PokemonHeader";
import { StatBar } from "@/components/StatBar/StatBar";
import { fetchPokemonById } from "@/services/pokeapi";
import { PokemonDetails } from "@/types/pokemon";
import { pokemonTypeColors } from "@/utils/pokemonColors";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams();
  const pokemonId = Number(id);

  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPokemon() {
      try {
        const data = await fetchPokemonById(pokemonId);
        setPokemon(data);
      } catch (err) {
        console.error(err);
        setError("Error cargando el Pokémon");
      } finally {
        setLoading(false);
      }
    }

    if (!isNaN(pokemonId)) {
      loadPokemon();
    }
  }, [pokemonId]);

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (error || !pokemon) {
    return <Text>{error}</Text>;
  }

  const backgroundColor = pokemonTypeColors[pokemon.types[0]];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ backgroundColor }}>
        <PokemonHeader
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          types={pokemon.types}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingTop: 32,
          paddingHorizontal: 16,
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text>Altura: {pokemon.height}</Text>
          <Text>Peso: {pokemon.weight}</Text>
        </View>

        <View>
          <Text>Stats</Text>

          {pokemon.stats.map((stat) => (
            <StatBar key={stat.name} label={stat.name} value={stat.value} maxValue={255} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
