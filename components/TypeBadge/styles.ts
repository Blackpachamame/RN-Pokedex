import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#26262b",
    borderRadius: 16,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  badgeIconWrapper: {
    borderRadius: 14,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
    width: 70,
    textAlign: "center",
  },

  chipContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    borderWidth: 2,
    marginRight: 8,
  },
  chipContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    textTransform: "capitalize",
  },
  chipTextSelected: {
    color: "#fff",
  },
});
