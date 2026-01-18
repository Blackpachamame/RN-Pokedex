import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    padding: 12,
    margin: 8,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
  },
  image: {
    width: 160,
    height: 160,
    alignSelf: "center",
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
    marginTop: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  number: {
    fontSize: 16,
    color: "#292929",
  },
  types: {
    flexDirection: "row",
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
