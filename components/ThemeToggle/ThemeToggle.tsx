import { useTheme } from "@/context/ThemeContext";
import { useThemeColors } from "@/hooks/useThemedStyles";
import { Moon, Sun } from "lucide-react-native";
import { Pressable, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

/**
 * ThemeToggle - Botón para cambiar entre modo claro y oscuro
 * Con animación de rotación
 */
export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const colors = useThemeColors();
  const rotation = useSharedValue(0);

  const handlePress = () => {
    rotation.value = withSpring(rotation.value + 180);
    toggleTheme();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const isDark = resolvedTheme === "dark";

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.button, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Animated.View style={animatedStyle}>
        {isDark ? (
          <Moon size={20} color={colors.text} fill={colors.text} />
        ) : (
          <Sun size={20} color={colors.text} />
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
