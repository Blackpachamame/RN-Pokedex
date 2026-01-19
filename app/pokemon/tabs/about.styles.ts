import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F6F7F9",
    borderRadius: 12,
  },

  label: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },

  value: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
    textTransform: "capitalize",
  },
});

export default styles;
