import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  number: {
    fontSize: 16,
    fontWeight: "900",
    color: "rgba(0, 0, 0, 0.3)",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
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
  imageContainer: {
    width: 80,
    height: 80,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
});
