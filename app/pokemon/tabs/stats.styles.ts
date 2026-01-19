import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  statName: {
    width: 80,
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    textTransform: "capitalize",
  },

  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
    marginHorizontal: 12,
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    backgroundColor: "#3B82F6",
    borderRadius: 999,
  },

  statValue: {
    width: 32,
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
    textAlign: "right",
  },
});

export default styles;
