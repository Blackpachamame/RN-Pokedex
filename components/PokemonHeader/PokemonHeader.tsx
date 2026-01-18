import { PokemonListItem } from "@/types/pokemon";
import { Image, Text, View } from "react-native";
import { TypeBadge } from "../TypeBadge/TypeBadge";
import { styles } from "./styles";

type Props = {
  pokemon: PokemonListItem;
};

function PokemonHeader({ pokemon }: Props) {
  const formattedNumber = `#${pokemon.id.toString().padStart(4, "0")}`;

  return (
    <View>
      <View style={styles.title}>
        <Text style={styles.name}>{pokemon.name}</Text>
        <Text style={styles.number}>{formattedNumber}</Text>
      </View>

      <View style={styles.types}>
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} extend={true} />
        ))}
      </View>

      <Image source={{ uri: pokemon.image }} style={styles.image} />
    </View>
  );
}
export default PokemonHeader;
