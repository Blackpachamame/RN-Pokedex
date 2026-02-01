import PokemonHeader from "@/components/PokemonHeader/PokemonHeader";
import { fetchPokemonById } from "@/services/pokeapi";
import { PokemonDetails } from "@/types/pokemon";
import { pokemonTypeColors } from "@/utils/pokemonColors";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import styles from "./styles";
import AboutTab from "./tabs/AboutTab";
import MovesTab from "./tabs/MovesTab";
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
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6390F0" />
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const accentColor = pokemonTypeColors[pokemon.types[0]] || "#6390F0";
  const RADIUS = 16;

  return (
    <View style={[styles.screen, { backgroundColor: accentColor }]}>
      <PokemonHeader
        id={pokemon.id}
        name={pokemon.name}
        image={pokemon.image}
        types={pokemon.types}
      />

      <View style={styles.tabsWrapper}>
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
      <View style={styles.content}>
        {activeTab === "about" && <AboutTab pokemon={pokemon} currentPokemonId={pokemon.id} />}
        {activeTab === "stats" && <StatsTab stats={pokemon.stats} color={accentColor} />}
        {activeTab === "moves" && <MovesTab moves={pokemon.moves} />}
      </View>
    </View>
  );
}
