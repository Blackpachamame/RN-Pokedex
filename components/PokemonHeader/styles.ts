import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 320,
    paddingTop: 24,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
  },
  name: {
    fontSize: 30,
    fontWeight: "800",
    color: "#fff",
    textTransform: "capitalize",
    flex: 1,
    marginRight: 12,
  },

  number: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 8,
    color: "rgba(255,255,255,0.6)",
    flexShrink: 0,
  },
  backgroundIcon: {
    position: "absolute",
    width: 240,
    height: 240,
    top: 30,
    right: 10,
    opacity: 0.12,
    zIndex: 0,
  },
  types: {
    flexDirection: "row",
    marginTop: 8,
    gap: 8,
    zIndex: 1,
  },
  image: {
    width: 200,
    height: 200,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    zIndex: 2,
  },
});
