import { PokemonListItem } from "@/types/pokemon";
import { Image, Text, View } from "react-native";
import { TypeBadge } from "../TypeBadge/TypeBadge";
import { styles } from "./styles";

type Props = {
  pokemon: PokemonListItem;
};

function PokemonCard({ pokemon }: Props) {
  const formattedNumber = `#${pokemon.id.toString().padStart(4, "0")}`;

  return (
    <View style={[styles.card, { backgroundColor: "#dfdfdf" }]}>
      <View style={styles.container}>
        <View>
          <Text style={styles.number}>{formattedNumber}</Text>
          <Text style={styles.name}>{pokemon.name}</Text>
        </View>

        <View style={styles.types}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </View>
      </View>

      <Image source={{ uri: pokemon.image }} style={styles.image} />
    </View>
  );
}
export default PokemonCard;
