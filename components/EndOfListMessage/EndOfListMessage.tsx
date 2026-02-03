import { StyleSheet, Text, View } from "react-native";

export const EndOfListMessage = () => (
  <View style={styles.container}>
    <Text style={styles.emoji}>✨</Text>
    <Text style={styles.text}>You`ve reached the end!</Text>
    <Text style={styles.subtext}>All 1025 Pokémon loaded</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    alignItems: "center",
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  subtext: {
    fontSize: 14,
    color: "#64748B",
  },
});
