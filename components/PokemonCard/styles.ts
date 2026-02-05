import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  number: {
    fontSize: 12,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    textTransform: "capitalize",
  },
  typesContainer: {
    flexDirection: "row",
    gap: 6,
    marginTop: 4,
  },
  imageContainer: {
    width: 80,
    height: 80,
    flexShrink: 0,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
});
