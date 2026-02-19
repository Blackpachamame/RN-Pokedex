import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  errorText: {
    fontSize: 16,
    color: "#64748B",
  },

  tabsWrapper: {
    zIndex: 10,
    position: "relative",
  },

  content: {
    flex: 1,
    backgroundColor: "#fff",
  },

  invertedRadiusContainer: {
    position: "absolute",
    zIndex: 999,
    bottom: 0,
  },

  invertedRadiusCurve: {
    flex: 1,
    width: 16,
  },

  movesPlaceholder: {
    padding: 32,
    alignItems: "center",
  },

  movesEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },

  movesText: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
  },

  contentDark: {
    flex: 1,
    backgroundColor: "#1E293B", // darkTheme.backgroundSecondary
  },

  invertedRadiusDark: {
    backgroundColor: "#1E293B",
  },
});

export default styles;
