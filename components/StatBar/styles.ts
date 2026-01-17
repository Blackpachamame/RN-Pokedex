import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  barBackground: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
  },
  value: {
    fontSize: 12,
    marginTop: 2,
    alignSelf: "flex-end",
  },
});
