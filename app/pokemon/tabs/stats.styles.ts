import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  statName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    textTransform: "capitalize",
    width: 100,
  },
  statValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    width: 40,
    textAlign: "right",
  },
});

export default styles;
