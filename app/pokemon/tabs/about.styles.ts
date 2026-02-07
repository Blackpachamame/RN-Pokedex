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

  // ============================================
  // SIMPLE EVOLUTION (1-2 evolutions, vertical single column)
  // ============================================
  simpleContainer: {
    alignItems: "center",
    gap: 0,
  },

  // ============================================
  // LINEAR EVOLUTION (Squirtle → Wartortle → Blastoise)
  // ============================================
  linearContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
  },
  linearRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  evolutionCardHorizontal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 2,
    borderColor: "#F1F5F9",
    minWidth: 140,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  evolutionImageHorizontal: {
    width: 60,
    height: 60,
  },
  evolutionInfoHorizontal: {
    flex: 1,
  },
  rightArrowContainer: {
    paddingHorizontal: 12,
  },

  // ============================================
  // BRANCHED EVOLUTION (Eevee, Tyrogue)
  // ============================================
  branchedContainer: {
    alignItems: "center",
    gap: 16,
  },
  multiplePathsIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  multiplePathsText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#92400E",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  downArrowContainer: {
    paddingVertical: 8,
  },
  evolutionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    width: "100%",
  },
  evolutionCardVertical: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#F1F5F9",
    width: "47%", // 2 columnas con gap
    minWidth: 140,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  evolutionImageVertical: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  evolutionInfoVertical: {
    alignItems: "center",
    width: "100%",
  },
  evolutionNameVertical: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    textTransform: "capitalize",
    textAlign: "center",
  },

  // ============================================
  // SHARED STYLES
  // ============================================
  evolutionCardCurrent: {
    borderColor: "#3B82F6",
    backgroundColor: "#EFF6FF",
  },
  evolutionNumber: {
    fontSize: 11,
    fontWeight: "600",
    color: "#94A3B8",
    marginBottom: 2,
  },
  evolutionName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    textTransform: "capitalize",
  },
  evolutionLevel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
    marginTop: 2,
  },
});

export default styles;
