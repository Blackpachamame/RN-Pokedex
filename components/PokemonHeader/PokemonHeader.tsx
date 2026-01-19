import { getMultiTypeGradient } from "@/utils/color";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TypeBadge } from "../TypeBadge/TypeBadge";
import { styles } from "./styles";

type PokemonHeaderProps = {
  id: number;
  name: string;
  image: string;
  types: string[];
};

function PokemonHeader({ id, name, image, types }: PokemonHeaderProps) {
  const formattedNumber = `#${id.toString().padStart(4, "0")}`;
  const gradientColors = getMultiTypeGradient(types);
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={gradientColors}
      style={[styles.container, { paddingTop: insets.top + 16 }]}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}>
      <Image
        source={require("@/assets/images/pokeball2.png")}
        style={styles.backgroundIcon}
        resizeMode="contain"
      />

      <View style={styles.topRow}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.number}>{formattedNumber}</Text>
      </View>

      {/* Types */}
      <View style={styles.types}>
        {types.map((type) => (
          <TypeBadge key={type} type={type} extend={true} />
        ))}
      </View>

      {/* Image */}
      <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
    </LinearGradient>
  );
}
export default PokemonHeader;
