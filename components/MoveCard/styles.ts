import { ThemeColors } from "@/utils/themes";
import { StyleSheet } from "react-native";

export const createMoveCardStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      gap: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 2,
    },
    header: { gap: 8 },
    nameRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    name: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
      flex: 1,
    },
    levelBadge: {
      backgroundColor: colors.backgroundTertiary,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    levelText: {
      fontSize: 12,
      fontWeight: "700",
      color: colors.textSecondary,
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
      color: colors.textSecondary,
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
    statIconText: { fontSize: 14 },
    statLabel: {
      fontSize: 12,
      fontWeight: "600",
      color: colors.textSecondary,
      textTransform: "capitalize",
    },
    statValue: {
      fontSize: 14,
      fontWeight: "700",
      color: colors.text,
    },
  });
