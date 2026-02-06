import { PokemonListItem } from "@/types/pokemon";
import { getMultiTypeGradient } from "@/utils/color";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Text, View } from "react-native";
import { TypeBadge } from "../TypeBadge/TypeBadge";
import { styles } from "./styles";

type Props = {
  pokemon: PokemonListItem;
};

const PokemonCard = React.memo(({ pokemon }: Props) => {
  const formattedNumber = `#${pokemon.id.toString().padStart(4, "0")}`;
  const typeGradient = getMultiTypeGradient(pokemon.types);

  return (
    <LinearGradient
      style={styles.card}
      colors={["rgba(230, 230, 230, 1)", "rgba(255, 255, 255, 1)", typeGradient[0]]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.number}>{formattedNumber}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
            {pokemon.name}
          </Text>

          <View style={styles.typesContainer}>
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} variant="badge" />
            ))}
          </View>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode="contain" />
      </View>
    </LinearGradient>
  );
});

PokemonCard.displayName = "PokemonCard";

export default PokemonCard;
