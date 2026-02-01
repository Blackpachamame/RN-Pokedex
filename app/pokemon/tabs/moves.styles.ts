import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
    paddingBottom: 32,
  },
  separator: {
    height: 12,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
});

export default styles;
