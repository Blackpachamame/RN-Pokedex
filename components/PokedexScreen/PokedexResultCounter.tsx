import { useThemeColors } from "@/hooks/useThemedStyles";
import { ThemeColors } from "@/utils/themes";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface PokedexResultCounterProps {
  searchQuery: string;
  selectedTypes: string[];
  isSearching: boolean;
  hasActiveFilters: boolean;
  totalResults: number;
  currentCount: number;
}

export function PokedexResultCounter({
  searchQuery,
  selectedTypes,
  isSearching,
  hasActiveFilters,
  totalResults,
  currentCount,
}: PokedexResultCounterProps) {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const label =
    isSearching && hasActiveFilters
      ? `"${searchQuery}" in ${selectedTypes.join(" + ")} • ${totalResults} found`
      : `${totalResults} found • Showing ${currentCount}`;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: colors.counterBackground,
      borderRadius: 8,
      marginBottom: 12,
      alignSelf: "flex-start",
    },
    text: {
      fontSize: 12,
      fontWeight: "700",
      color: colors.counterText,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
  });
