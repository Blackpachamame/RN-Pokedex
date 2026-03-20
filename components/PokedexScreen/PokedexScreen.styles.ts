import { ThemeColors } from "@/utils/themes";
import { StyleSheet } from "react-native";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    skeletonContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContainer: {
      padding: 16,
      paddingBottom: 32,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
    },
    resultCounter: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: colors.counterBackground,
      borderRadius: 8,
      marginBottom: 12,
      alignSelf: "flex-start",
    },
    resultCounterText: {
      fontSize: 12,
      fontWeight: "700",
      color: colors.counterText,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
  });
