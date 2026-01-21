import PokemonHeader from "@/components/PokemonHeader/PokemonHeader";
import { fetchPokemonById } from "@/services/pokeapi";
import { PokemonDetails } from "@/types/pokemon";
import { pokemonTypeColors } from "@/utils/pokemonColors";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import AboutTab from "./tabs/AboutTab";
import PokemonTabs from "./tabs/PokemonTabs";
import StatsTab from "./tabs/StatsTab";

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams();
  const pokemonId = Number(id);

  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"about" | "stats" | "evolutions" | "moves">("about");

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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6390F0" />
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 16, color: "#64748B" }}>{error}</Text>
      </View>
    );
  }

  const accentColor = pokemonTypeColors[pokemon.types[0]] || "#6390F0";
  const RADIUS = 16;

  return (
    <View style={{ flex: 1, backgroundColor: accentColor }}>
      {/* Header */}
      <PokemonHeader
        id={pokemon.id}
        name={pokemon.name}
        image={pokemon.image}
        types={pokemon.types}
      />

      {/* Tabs - Flotan sobre el header */}
      <View style={{ zIndex: 10, position: "relative" }}>
        <PokemonTabs activeTab={activeTab} onTabChange={setActiveTab} accentColor={accentColor} />

        {/* PIEZA DE RADIO INVERTIDO */}
        <View
          style={[
            styles.invertedRadiusContainer,
            { height: RADIUS, backgroundColor: "#fff", left: 0 },
          ]}>
          <View
            style={[
              styles.invertedRadiusCurve,
              {
                backgroundColor: accentColor,
                borderBottomRightRadius: RADIUS,
              },
            ]}
          />
        </View>
        <View
          style={[
            styles.invertedRadiusContainer,
            { height: RADIUS, backgroundColor: "#fff", right: 0 },
          ]}>
          <View
            style={[
              styles.invertedRadiusCurve,
              {
                backgroundColor: accentColor,
                borderBottomLeftRadius: RADIUS,
              },
            ]}
          />
        </View>
      </View>

      {/* Content */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
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
          {activeTab === "moves" && <MovesPlaceholder />}
        </ScrollView>
      </View>
    </View>
  );
}

function EvolutionsPlaceholder() {
  return (
    <View style={{ padding: 32, alignItems: "center" }}>
      <Text style={{ fontSize: 48, marginBottom: 8 }}>🔄</Text>
      <Text style={{ fontSize: 16, color: "#64748B", textAlign: "center" }}>
        Evolution chain coming soon
      </Text>
    </View>
  );
}

function MovesPlaceholder() {
  return (
    <View style={{ padding: 32, alignItems: "center" }}>
      <Text style={{ fontSize: 48, marginBottom: 8 }}>⚔️</Text>
      <Text style={{ fontSize: 16, color: "#64748B", textAlign: "center" }}>
        Moves list coming soon
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  invertedRadiusContainer: {
    position: "absolute",
    zIndex: 999,
    bottom: 0,
  },
  invertedRadiusCurve: {
    flex: 1,
    width: 16,
  },
});
