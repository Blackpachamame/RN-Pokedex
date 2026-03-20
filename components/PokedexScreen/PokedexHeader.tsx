import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { useThemeColors } from "@/hooks/useThemedStyles";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

export function PokedexHeader() {
  const colors = useThemeColors();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
      }}>
      <TouchableOpacity
        onPress={() => router.back()}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
        <ChevronLeft size={26} color={colors.text} strokeWidth={2.5} />
      </TouchableOpacity>
      <View style={{ flex: 1 }} />
      <ThemeToggle />
    </View>
  );
}
