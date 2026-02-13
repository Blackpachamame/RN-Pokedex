import { useThemeColors } from "@/hooks/useThemedStyles";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({ value, onChangeText }: Props) {
  const colors = useThemeColors();
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChangeText("");
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.inputBackground,
          borderColor: isFocused ? colors.inputBorderFocused : colors.inputBorder,
        },
        isFocused && {
          shadowColor: colors.primary,
        },
      ]}>
      {/* Search Icon */}
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" style={styles.icon}>
        <Circle
          cx="11"
          cy="11"
          r="7"
          stroke={isFocused ? colors.primary : colors.textTertiary}
          strokeWidth={2}
        />
        <Path
          d="M21 21L16.65 16.65"
          stroke={isFocused ? colors.primary : colors.textTertiary}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Svg>

      <TextInput
        placeholder="Search Pokémon..."
        placeholderTextColor={colors.textTertiary}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        style={[styles.input, { color: colors.text }]}
        textContentType="none"
        importantForAutofill="no"
      />

      {/* Clear Button */}
      {value.length > 0 && (
        <Pressable onPress={handleClear} style={styles.clearButton} hitSlop={8}>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Circle cx="12" cy="12" r="10" fill={colors.textTertiary} />
            <Path d="M15 9L9 15M9 9L15 15" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
          </Svg>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
    gap: 12,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  icon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    padding: 0,
    height: 24,
  },
  clearButton: {
    padding: 4,
  },
});
