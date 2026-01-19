import { Text, View } from "react-native";
import styles from "./about.styles";

type Props = {
  pokemon: {
    height: number;
    weight: number;
    abilities: string[];
    types: string[];
  };
};

export default function AboutTab({ pokemon }: Props) {
  const { height, weight, abilities, types } = pokemon;

  return (
    <View style={styles.container}>
      <InfoRow label="Height" value={`${height / 10} m`} />
      <InfoRow label="Weight" value={`${weight / 10} kg`} />
      <InfoRow label="Types" value={types.join(", ")} />
      <InfoRow label="Abilities" value={abilities.join(", ")} />
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}
