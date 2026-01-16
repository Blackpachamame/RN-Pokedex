import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    padding: 12,
    margin: 8,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
  types: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 6,
  },
  type: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
});
