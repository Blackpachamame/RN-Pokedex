import { TypeBadge } from "@/components/TypeBadge/TypeBadge";
import { PokemonType } from "@/types/pokemon";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export const POKEMON_TYPES: readonly PokemonType[] = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;

type Props = {
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
};

export const TypeFilters = ({ selectedTypes, onTypeToggle }: Props) => {
  return (
    <View style={styles.container}>
      {selectedTypes.length > 0 && (
        <Text style={styles.label}>
          Filtering by {selectedTypes.length} type{selectedTypes.length > 1 ? "s" : ""}
        </Text>
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {POKEMON_TYPES.map((type) => (
          <TypeBadge
            key={type}
            type={type}
            variant="chip"
            selected={selectedTypes.includes(type)}
            onPress={() => onTypeToggle(type)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6390F0",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingRight: 16,
  },
});
