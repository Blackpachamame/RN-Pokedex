import { pokemonTypeColors } from "@/utils/pokemonColors";
import { pokemonTypeIcons } from "@/utils/pokemonTypeImages";
import { Image, Text, View } from "react-native";

type Props = {
  type: string;
  extend?: boolean;
};

export function TypeBadge({ type, extend = false }: Props) {
  const icon = pokemonTypeIcons[type];
  const color = pokemonTypeColors[type] ?? "#ccc";

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#26262b",
        borderRadius: 16,
        paddingHorizontal: 2,
        paddingVertical: 2,
      }}>
      <View
        style={{
          backgroundColor: color,
          borderRadius: 14,
          padding: 4,
        }}>
        {icon && <Image source={icon} style={{ width: 14, height: 14 }} resizeMode="contain" />}
      </View>
      {extend && (
        <Text
          style={{ color: "#fff", textTransform: "capitalize", width: 70, textAlign: "center" }}>
          {type}
        </Text>
      )}
    </View>
  );
}
