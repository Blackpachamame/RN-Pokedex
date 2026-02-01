import { StatBar } from "@/components/StatBar/StatBar";
import { ScrollView, Text, View } from "react-native";
import styles from "./stats.styles";

type Stat = {
  name: string;
  value: number;
};

type Props = {
  stats: Stat[];
  color: string;
};

export default function StatsTab({ stats, color }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {stats.map((stat) => (
          <View key={stat.name} style={styles.row}>
            <Text style={styles.statName}>{stat.name}</Text>
            <StatBar value={stat.value} maxValue={255} color={color} />
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
