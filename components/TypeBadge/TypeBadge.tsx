import { pokemonTypeColors } from "@/utils/pokemonColors";
import { pokemonTypeIcons } from "@/utils/pokemonTypeImages";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

type Props = {
  type: string;
  extend?: boolean;
};

export function TypeBadge({ type, extend = false }: Props) {
  const icon = pokemonTypeIcons[type];
  const color = pokemonTypeColors[type] ?? "#ccc";

  return (
    <View style={styles.container}>
      <View style={[styles.container, { backgroundColor: color }]}>
        {icon && <Image source={icon} style={{ width: 14, height: 14 }} resizeMode="contain" />}
      </View>
      {extend && <Text style={styles.text}>{type}</Text>}
    </View>
  );
}
