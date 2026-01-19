import { pokemonTypeColors } from "@/utils/pokemonColors";
import { pokemonTypeIcons } from "@/utils/pokemonTypeIcons";
import { Text, View } from "react-native";
import { styles } from "./styles";

type Props = {
  type: string;
  extend?: boolean;
};

export function TypeBadge({ type, extend = false }: Props) {
  const IconComponent = pokemonTypeIcons[type];
  const color = pokemonTypeColors[type] ?? "#ccc";

  return (
    <View style={styles.container}>
      <View style={[styles.iconWrapper, { backgroundColor: color }]}>
        {IconComponent && <IconComponent width={14} height={14} fill="white" />}
      </View>
      {extend && <Text style={styles.text}>{type}</Text>}
    </View>
  );
}
