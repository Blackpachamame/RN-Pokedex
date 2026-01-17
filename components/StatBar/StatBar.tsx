import { Text, View } from "react-native";
import { styles } from "./styles";

type Props = {
  label: string;
  value: number;
  maxValue: number;
  color?: string;
};

export function StatBar({ label, value, maxValue, color = "#4CAF50" }: Props) {
  const percentage = Math.min(value / maxValue, 1);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            {
              width: `${percentage * 100}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>

      <Text style={styles.value}>{value}</Text>
    </View>
  );
}
