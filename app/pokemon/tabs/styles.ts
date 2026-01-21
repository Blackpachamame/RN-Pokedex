import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    zIndex: 10,
  },
  tabsWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginHorizontal: 16,
    paddingVertical: 10,
    ...Platform.select({
      web: {
        paddingHorizontal: 8,
      },
      default: {
        paddingHorizontal: 0,
      },
    }),
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabContent: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 48,
  },
  tabBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,

    // Sombra del background activo
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,

    // CRÍTICO: Mantener border radius
    overflow: "hidden",
  },
  tabLabel: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});

export default styles;
