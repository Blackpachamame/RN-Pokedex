import { useThemeColors } from "@/hooks/useThemedStyles";
import { PokemonType } from "@/types/pokemon";
import { pokemonTypeColors } from "@/utils/pokemonColors";
import { pokemonTypeIcons } from "@/utils/pokemonTypeIcons";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

type BaseProps = {
  type: PokemonType | string;
};

type BadgeProps = BaseProps & {
  variant: "badge";
  extend?: boolean;
};

type ChipProps = BaseProps & {
  variant: "chip";
  selected?: boolean;
  onPress?: () => void;
};

type Props = BadgeProps | ChipProps;

export function TypeBadge(props: Props) {
  const colors = useThemeColors();
  const { type, variant } = props;
  const IconComponent = pokemonTypeIcons[type];
  const color = pokemonTypeColors[type] ?? "#ccc";

  // Variant: Badge (para cards)
  if (variant === "badge") {
    const { extend = false } = props;
    return (
      <View style={styles.badgeContainer}>
        <View style={[styles.badgeIconWrapper, { backgroundColor: color }]}>
          {IconComponent && <IconComponent width={14} height={14} fill="#fff" color="#fff" />}
        </View>
        {extend && <Text style={styles.badgeText}>{type}</Text>}
      </View>
    );
  }

  // Variant: Chip (para filtros)
  const { selected = false, onPress } = props;
  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper
      onPress={onPress}
      style={[
        styles.chipContainer,
        {
          backgroundColor: selected ? color : colors.filterBackground,
          borderColor: color,
        },
      ]}>
      <View style={styles.chipContent}>
        {IconComponent && (
          <IconComponent
            width={16}
            height={16}
            fill={selected ? "#fff" : color}
            color={selected ? "#fff" : color}
          />
        )}
        <Text style={[styles.chipText, { color: selected ? "#fff" : colors.textSecondary }]}>
          {type}
        </Text>
      </View>
    </Wrapper>
  );
}
