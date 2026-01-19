import { Pressable, Text, View } from "react-native";
import styles from "./styles";

type Props = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

export default function PokemonTabButton({ label, isActive, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.tabButton}>
      <View style={[styles.tabInner, isActive && styles.activeTab]}>
        <Text style={[styles.tabText, isActive && styles.activeTabText]}>{label}</Text>
      </View>
    </Pressable>
  );
}
