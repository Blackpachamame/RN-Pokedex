import { useTheme } from "@/context/ThemeContext";
import { darkTheme, lightTheme, Theme } from "@/utils/themes";
import { useMemo } from "react";

/**
 * Hook para obtener los colores del tema actual
 * Retorna el objeto de colores según el modo activo
 */
export function useThemeColors(): Theme {
  const { resolvedTheme } = useTheme();

  return useMemo(() => {
    return resolvedTheme === "dark" ? darkTheme : lightTheme;
  }, [resolvedTheme]);
}

/**
 * Hook para crear estilos dinámicos basados en el tema
 * Uso:
 *
 * const styles = useThemedStyles((colors) => ({
 *   container: {
 *     backgroundColor: colors.background,
 *     borderColor: colors.border,
 *   }
 * }));
 */
export function useThemedStyles<T>(createStyles: (colors: Theme) => T): T {
  const colors = useThemeColors();

  return useMemo(() => createStyles(colors), [colors, createStyles]);
}
