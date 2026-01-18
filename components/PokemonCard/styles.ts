import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  number: {
    fontSize: 16,
    fontWeight: "900",
    color: "rgba(0, 0, 0, 0.3)",
  },
  container: {
    height: 90,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 24,
    color: "#26262b",
    textTransform: "capitalize",
  },
  types: {
    flexDirection: "row",
    gap: 6,
  },
  type: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
  image: {
    width: 90,
    height: 90,
  },
});
