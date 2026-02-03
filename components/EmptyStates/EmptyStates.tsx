import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

export const LoadingState = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#6390F0" />
    <Text style={styles.text}>Loading Pokémon...</Text>
  </View>
);

export const ErrorState = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <View style={styles.container}>
    <Text style={styles.emoji}>😕</Text>
    <Text style={styles.title}>Oops!</Text>
    <Text style={styles.message}>{error}</Text>
    <Pressable style={styles.button} onPress={onRetry}>
      <Text style={styles.buttonText}>Try Again</Text>
    </Pressable>
  </View>
);

export const SearchingState = () => (
  <View style={styles.emptyContainer}>
    <ActivityIndicator size="large" color="#6390F0" />
    <Text style={styles.text}>Searching...</Text>
  </View>
);

export const NoResultsState = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emoji}>🔍</Text>
    <Text style={styles.title}>No Pokémon found</Text>
    <Text style={styles.message}>Try searching for a different name or number</Text>
  </View>
);

export const LoadingMoreFooter = () => (
  <View style={styles.footer}>
    <ActivityIndicator size="small" color="#6390F0" />
    <Text style={styles.footerText}>Loading more...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyContainer: {
    paddingVertical: 64,
    alignItems: "center",
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 24,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: "#64748B",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#6390F0",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 12,
  },
  footerText: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
  },
});
