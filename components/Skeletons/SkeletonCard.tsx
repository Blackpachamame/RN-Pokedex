import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

/**
 * SkeletonCard - Loading placeholder que imita la estructura de PokemonCard
 * Muestra una animación shimmer mientras se cargan los datos
 */
export const SkeletonCard = React.memo(() => {
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
    <LinearGradient
      style={styles.card}
      colors={["rgba(230, 230, 230, 1)", "rgba(255, 255, 255, 1)", "rgba(240, 240, 240, 1)"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}>
      <View style={styles.textContainer}>
        <View style={styles.contentWrapper}>
          {/* Number skeleton - #0000 */}
          <Animated.View style={[styles.numberSkeleton, { opacity }]} />

          {/* Name skeleton */}
          <Animated.View style={[styles.nameSkeleton, { opacity }]} />

          {/* Type badges skeleton */}
          <View style={styles.typesContainer}>
            <Animated.View style={[styles.typeBadge, { opacity }]} />
            <Animated.View style={[styles.typeBadge, { opacity, width: 60 }]} />
          </View>
        </View>
      </View>

      {/* Image skeleton - círculo como el Pokémon */}
      <View style={styles.imageContainer}>
        <Animated.View style={[styles.imageSkeleton, { opacity }]} />
      </View>
    </LinearGradient>
  );
});

SkeletonCard.displayName = "SkeletonCard";

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  contentWrapper: {
    gap: 4,
  },
  // #0000 style
  numberSkeleton: {
    width: 50,
    height: 14,
    backgroundColor: "#E2E8F0",
    borderRadius: 4,
  },
  // Pokemon name style
  nameSkeleton: {
    width: 130,
    height: 20,
    backgroundColor: "#E2E8F0",
    borderRadius: 4,
    marginTop: 2,
  },
  typesContainer: {
    flexDirection: "row",
    gap: 6,
    marginTop: 4,
  },
  // Type badge style
  typeBadge: {
    width: 70,
    height: 24,
    backgroundColor: "#E2E8F0",
    borderRadius: 12,
  },
  imageContainer: {
    width: 80,
    height: 80,
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  // Circular skeleton matching pokemon image
  imageSkeleton: {
    width: 64,
    height: 64,
    backgroundColor: "#E2E8F0",
    borderRadius: 32,
  },
});
