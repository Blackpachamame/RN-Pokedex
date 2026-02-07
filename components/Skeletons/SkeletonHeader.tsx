import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * SkeletonHeader - Loading placeholder para PokemonHeader
 */
export const SkeletonHeader = React.memo(() => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

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
    <LinearGradient
      colors={["#E2E8F0", "#F1F5F9", "#E2E8F0"]}
      style={[styles.container, { paddingTop: insets.top + 16 }]}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}>
      {/* Background pokeball icon (static) */}
      <Image
        source={require("@/assets/images/pokeball2.png")}
        style={styles.backgroundIcon}
        resizeMode="contain"
      />

      <View style={styles.topRow}>
        {/* Name skeleton */}
        <Animated.View style={[styles.nameSkeleton, { opacity }]} />
        {/* Number skeleton */}
        <Animated.View style={[styles.numberSkeleton, { opacity }]} />
      </View>

      {/* Types skeleton */}
      <View style={styles.types}>
        <Animated.View style={[styles.typeBadge, { opacity }]} />
        <Animated.View style={[styles.typeBadge, { opacity, width: 100 }]} />
      </View>

      {/* Image skeleton (circular) */}
      <Animated.View style={[styles.imageSkeleton, { opacity }]} />
    </LinearGradient>
  );
});

SkeletonHeader.displayName = "SkeletonHeader";

const styles = StyleSheet.create({
  container: {
    height: 320,
    paddingTop: 24,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
  },
  nameSkeleton: {
    width: 150,
    height: 32,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 8,
    flex: 1,
    marginRight: 12,
  },
  numberSkeleton: {
    width: 60,
    height: 18,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 6,
    marginTop: 8,
    flexShrink: 0,
  },
  backgroundIcon: {
    position: "absolute",
    width: 240,
    height: 240,
    top: 30,
    right: 10,
    opacity: 0.12,
    zIndex: 0,
  },
  types: {
    flexDirection: "row",
    marginTop: 8,
    gap: 8,
    zIndex: 1,
  },
  typeBadge: {
    width: 90,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 16,
  },
  imageSkeleton: {
    width: 160,
    height: 160,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 80,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    zIndex: 2,
  },
});
