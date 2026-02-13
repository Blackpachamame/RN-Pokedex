/**
 * Paleta de colores para modo claro y oscuro
 * Basada en un sistema de diseño consistente
 */

export const lightTheme = {
  // Backgrounds
  background: "#FFFFFF",
  backgroundSecondary: "#F8FAFC",
  backgroundTertiary: "#F1F5F9",

  // Cards & Surfaces
  card: "#FFFFFF",
  cardBorder: "#F1F5F9",

  // Text
  text: "#1E293B",
  textSecondary: "#64748B",
  textTertiary: "#94A3B8",
  textInverse: "#FFFFFF",

  // Borders & Dividers
  border: "#E2E8F0",
  divider: "#E2E8F0",

  // Interactive
  primary: "#6390F0",
  primaryHover: "#5080E0",

  // Status
  success: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",

  // Overlays
  overlay: "rgba(0, 0, 0, 0.5)",
  shimmer: "#E2E8F0",

  // Search & Inputs
  inputBackground: "#F1F5F9",
  inputBorder: "transparent",
  inputBorderFocused: "#6390F0",

  // Skeleton
  skeleton: "#E2E8F0",
  skeletonHighlight: "rgba(255, 255, 255, 0.4)",

  // Tab
  tabBackground: "#FFFFFF",
  tabInactive: "#64748B",

  // Type Filter
  filterBackground: "#F8FAFC",
  filterBorder: "transparent",

  // Counter Badge
  counterBackground: "#EEF2FF",
  counterText: "#6390F0",
} as const;

export const darkTheme = {
  // Backgrounds
  background: "#0F172A",
  backgroundSecondary: "#1E293B",
  backgroundTertiary: "#334155",

  // Cards & Surfaces
  card: "#0F172A",
  cardBorder: "#0b1221",

  // Text
  text: "#F1F5F9",
  textSecondary: "#94A3B8",
  textTertiary: "#64748B",
  textInverse: "#0F172A",

  // Borders & Dividers
  border: "#334155",
  divider: "#334155",

  // Interactive
  primary: "#6390F0",
  primaryHover: "#5080E0",

  // Status
  success: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",

  // Overlays
  overlay: "rgba(0, 0, 0, 0.7)",
  shimmer: "#334155",

  // Search & Inputs
  inputBackground: "#1e2c41",
  inputBorder: "transparent",
  inputBorderFocused: "#6390F0",

  // Skeleton
  skeleton: "#334155",
  skeletonHighlight: "rgba(255, 255, 255, 0.1)",

  // Tab
  tabBackground: "#1E293B",
  tabInactive: "#94A3B8",

  // Type Filter
  filterBackground: "#1E293B",
  filterBorder: "transparent",

  // Counter Badge
  counterBackground: "#1E3A8A",
  counterText: "#93C5FD",
} as const;

// Tipo base para los temas
export type ThemeColors = {
  // Backgrounds
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;

  // Cards & Surfaces
  card: string;
  cardBorder: string;

  // Text
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;

  // Borders & Dividers
  border: string;
  divider: string;

  // Interactive
  primary: string;
  primaryHover: string;

  // Status
  success: string;
  error: string;
  warning: string;

  // Overlays
  overlay: string;
  shimmer: string;

  // Search & Inputs
  inputBackground: string;
  inputBorder: string;
  inputBorderFocused: string;

  // Skeleton
  skeleton: string;
  skeletonHighlight: string;

  // Tab
  tabBackground: string;
  tabInactive: string;

  // Type Filter
  filterBackground: string;
  filterBorder: string;

  // Counter Badge
  counterBackground: string;
  counterText: string;
};

export type Theme = ThemeColors;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;
