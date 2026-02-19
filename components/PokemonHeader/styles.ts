import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 0,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    height: 340,
  },
  backgroundIcon: {
    position: "absolute",
    width: 220,
    height: 220,
    bottom: 0,
    right: 0,
    opacity: 0.12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  number: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
    color: "rgba(255,255,255,0.7)",
  },
  name: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
    textTransform: "capitalize",
    marginBottom: 10,
  },
  types: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  image: {
    width: 180,
    height: 180,
    alignSelf: "center",
    marginTop: "auto",
  },
});
