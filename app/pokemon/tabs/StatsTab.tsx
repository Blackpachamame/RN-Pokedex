import { StatBar } from "@/components/StatBar/StatBar";
import { Text, View } from "react-native";
import styles from "./stats.styles";

type Stat = {
  name: string;
  value: number;
};

type Props = {
  stats: Stat[];
};

export default function StatsTab({ stats }: Props) {
  return (
    <View style={styles.container}>
      {stats.map((stat) => (
        <View key={stat.name} style={styles.row}>
          <Text style={styles.statName}>{stat.name}</Text>
          <StatBar value={stat.value} maxValue={255} />
          <Text style={styles.statValue}>{stat.value}</Text>
        </View>
      ))}
    </View>
  );
}
