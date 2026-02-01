import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    gap: 12,

    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    gap: 8,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    flex: 1,
  },
  levelBadge: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  levelText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
  },
  typeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  typeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    textTransform: "capitalize",
  },
  stats: {
    flexDirection: "row",
    gap: 16,
    paddingTop: 4,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statIcon: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  statIconText: {
    fontSize: 14,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    textTransform: "capitalize",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
  },
});
