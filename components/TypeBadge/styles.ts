import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#26262b",
    borderRadius: 16,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  iconWrapper: {
    borderRadius: 14,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
    width: 70,
    textAlign: "center",
  },
});
