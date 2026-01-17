import { StatBar } from "@/components/StatBar/StatBar";
import { fetchPokemonById } from "@/services/pokeapi";
import { PokemonDetails } from "@/types/pokemon";
import { pokemonTypeColors } from "@/utils/pokemonColors";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

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
    <ScrollView>
      <View style={{ backgroundColor, padding: 16 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>{pokemon.name}</Text>

        <Image source={{ uri: pokemon.image }} style={{ width: 200, height: 200 }} />

        <View style={{ flexDirection: "row", gap: 8 }}>
          {pokemon.types.map((type) => (
            <Text key={type}>{type}</Text>
          ))}
        </View>
      </View>

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
  );
}
