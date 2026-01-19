import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { styles } from "./styles";

type Props = {
  value: number;
  maxValue: number;
  color?: string;
};

export function StatBar({ value, maxValue, color = "#4CAF50" }: Props) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const percentage = Math.min(value / maxValue, 1);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const widthInterpolated = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.barBackground}>
      <Animated.View
        style={[
          styles.barFill,
          {
            width: widthInterpolated,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}
