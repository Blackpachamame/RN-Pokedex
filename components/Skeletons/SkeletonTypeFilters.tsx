import React, { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";

/**
 * SkeletonTypeFilters - Loading placeholder para los filtros de tipo
 * Muestra 18 chips skeleton con animación shimmer
 */
export const SkeletonTypeFilters = React.memo(() => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    );

    shimmer.start();

    return () => shimmer.stop();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={false}>
        {/* 18 type chips */}
        {Array.from({ length: 18 }).map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.chipSkeleton,
              { opacity },
              // Variar el ancho para simular diferentes tipos
              { width: 70 + (index % 3) * 15 },
            ]}
          />
        ))}
      </ScrollView>
    </View>
  );
});

SkeletonTypeFilters.displayName = "SkeletonTypeFilters";

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  scrollContent: {
    paddingRight: 16,
  },
  chipSkeleton: {
    height: 40,
    backgroundColor: "#E2E8F0",
    borderRadius: 20,
    marginRight: 8,
  },
});
