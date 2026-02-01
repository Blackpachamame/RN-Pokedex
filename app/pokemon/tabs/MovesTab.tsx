import MoveCard from "@/components/MoveCard/MoveCard";
import { PokemonMove } from "@/types/pokemon";
import React from "react";
import { FlatList, Text, View } from "react-native";
import styles from "./moves.styles";

type Props = {
  moves: PokemonMove[];
};

export default function MovesTab({ moves }: Props) {
  if (moves.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyEmoji}>⚔️</Text>
        <Text style={styles.emptyTitle}>No Moves Available</Text>
        <Text style={styles.emptyMessage}>This Pokémon doesn`t have any moves registered yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={moves}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      renderItem={({ item }) => <MoveCard {...item} />}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
    />
  );
}
