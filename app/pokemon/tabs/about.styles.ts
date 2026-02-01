import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    gap: 24,
    paddingBottom: 16,
  },

  scrollContent: {
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  separator: {
    height: 1,
    backgroundColor: "#E2E8F0",
  },

  descriptionContainer: {
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#475569",
  },

  dataGrid: {
    gap: 12,
  },
  gridRow: {
    flexDirection: "row",
    gap: 12,
  },
  dataCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dataLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  dataValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
  },

  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  categoryText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
    textTransform: "capitalize",
  },

  abilitiesText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
  },

  weaknessesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  // Evolution Chain Styles
  evolutionChain: {
    gap: 0,
  },
  evolutionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  evolutionCard: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  evolutionCardCurrent: {
    borderColor: "#3B82F6",
    backgroundColor: "#EFF6FF",
  },
  evolutionImage: {
    width: 60,
    height: 60,
  },
  evolutionInfo: {
    flex: 1,
  },
  evolutionNumber: {
    fontSize: 11,
    fontWeight: "600",
    color: "#94A3B8",
    marginBottom: 2,
  },
  evolutionName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 2,
  },
  evolutionLevel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  evolutionArrow: {
    paddingHorizontal: 8,
  },
});

export default styles;
