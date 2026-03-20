import { ThemeColors } from "@/utils/themes";
import { StyleSheet } from "react-native";

export const createStyles = (colors: ThemeColors, paddingTop: number, paddingBottom: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop,
      paddingHorizontal: 20,
      paddingBottom,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 20,
    },
    logoRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    appName: {
      fontSize: 28,
      fontWeight: "800",
      color: colors.text,
      letterSpacing: -0.5,
    },
    sectionLabel: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 14,
    },
    cardsContainer: {
      flex: 1,
      gap: 14,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      borderWidth: 1,
      borderColor: colors.cardBorder,
    },
    iconBox: {
      width: 52,
      height: 52,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    cardTitle: {
      fontSize: 17,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 3,
    },
    cardDescription: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    comingSoon: {
      marginTop: 6,
      alignSelf: "flex-start",
      backgroundColor: colors.backgroundTertiary,
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    comingSoonText: {
      fontSize: 10,
      fontWeight: "700",
      color: colors.textTertiary,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
  });
