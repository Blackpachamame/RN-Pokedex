import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "transparent", // hereda el fondo del header
  },

  tabButton: {
    flex: 1,
  },

  tabInner: {
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginHorizontal: 6,
  },

  activeTab: {
    backgroundColor: "transparent",
  },

  tabText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  activeTabText: {
    color: "#fff",
  },
});

export default styles;
