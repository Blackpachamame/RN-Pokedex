import { PokemonListItem } from "@/types/pokemon";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

type Props = {
  pokemon: PokemonListItem;
};

const PokemonCard = React.memo(({ pokemon }: Props) => {
  const formattedNumber = `#${pokemon.id.toString().padStart(4, "0")}`;

  return (
    <LinearGradient
      style={styles.card}
      colors={["rgba(230, 230, 230, 1)", "rgba(255, 255, 255, 1)", "rgba(176, 176, 194, 1)"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}>
      <View style={styles.textContainer}>
        <Text style={styles.number}>{formattedNumber}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
          {pokemon.name}
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode="contain" />
      </View>
    </LinearGradient>
  );
});

PokemonCard.displayName = "PokemonCard";

export default PokemonCard;
