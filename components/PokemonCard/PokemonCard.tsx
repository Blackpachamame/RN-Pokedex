import { PokemonListItem } from "@/types/pokemon";
import { pokemonTypeColors } from "@/utils/pokemonColors";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

type Props = {
  pokemon: PokemonListItem;
};

function PokemonCard({ pokemon }: Props) {
  const cardColor = pokemonTypeColors[pokemon.types[0]] ?? "#ccc";

  return (
    <View style={[styles.card, { backgroundColor: cardColor }]}>
      <Image source={{ uri: pokemon.image }} style={styles.image} />

      <Text style={styles.name}>{pokemon.name}</Text>

      <View style={styles.types}>
        {pokemon.types.map((type) => (
          <Text
            key={type}
            style={[
              styles.type,
              {
                backgroundColor: pokemonTypeColors[type] ?? "#ddd",
              },
            ]}>
            {type}
          </Text>
        ))}
      </View>
    </View>
  );
}
export default PokemonCard;
