import PokemonHeader from "@/components/PokemonHeader/PokemonHeader";
import { fetchPokemonById } from "@/services/pokeapi";
import { PokemonDetails } from "@/types/pokemon";
import { pokemonTypeColors } from "@/utils/pokemonColors";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import AboutTab from "./tabs/AboutTab";
import PokemonTabs from "./tabs/PokemonTabs";
import StatsTab from "./tabs/StatsTab";

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams();
  const pokemonId = Number(id);

  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"about" | "stats" | "evolutions">("about");

  useEffect(() => {
    async function loadPokemon() {
      try {
        const data = await fetchPokemonById(pokemonId);
        setPokemon(data);
      } catch (err) {
        console.log(err);
        setError("Error cargando el Pokémon");
      } finally {
        setLoading(false);
      }
    }

    if (!isNaN(pokemonId)) {
      loadPokemon();
    }
  }, [pokemonId]);

  if (loading) return <Text>Cargando...</Text>;
  if (error || !pokemon) return <Text>{error}</Text>;

  const backgroundColor = pokemonTypeColors[pokemon.types[0]];

  return (
    <View style={{ flex: 1, backgroundColor }}>
      {/* Header + Tabs (continuidad visual) */}
      <PokemonHeader
        id={pokemon.id}
        name={pokemon.name}
        image={pokemon.image}
        types={pokemon.types}
      />

      <PokemonTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          marginTop: -16,
        }}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 32,
            paddingHorizontal: 16,
            paddingBottom: 32,
          }}
          showsVerticalScrollIndicator={false}>
          {activeTab === "about" && <AboutTab pokemon={pokemon} />}
          {activeTab === "stats" && <StatsTab stats={pokemon.stats} />}
          {activeTab === "evolutions" && <EvolutionsPlaceholder />}
        </ScrollView>
      </View>
    </View>
  );
}

function EvolutionsPlaceholder() {
  return <Text style={{ textAlign: "center" }}>Coming soon</Text>;
}
