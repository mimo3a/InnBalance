// PlaceBottomSheet.jsx
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Pressable, StyleSheet, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/contexts/ThemeContext";
import { ThemedText } from "@/src/components/themed-text";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function PlaceBottomSheet({ place, visible, onClose, onOpen }) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const { theme, isDark } = useTheme();

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : SCREEN_HEIGHT,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [visible, translateY]);

  if (!place && !visible) return null;

  const sheetBg = theme.card ?? theme.background;
  const cardBg = theme.card ?? theme.background;
  const border = theme.border ?? (isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)");
  const iconColor = theme.textSecondary ?? theme.text;
  const accent = theme.tint ?? theme.primary ?? theme.text;
  const imageBg = theme.surface ?? (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)");
  const backdropColor = isDark ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.30)";

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents={visible ? "auto" : "none"}>
      <Pressable style={[styles.backdrop, { backgroundColor: backdropColor }]} onPress={onClose} />

      <Animated.View
        style={[
          styles.sheet,
          {
            backgroundColor: sheetBg,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.headerRow}>
          <ThemedText type="subtitle" numberOfLines={1} style={{ flex: 1, marginRight: 12 }}>
            {place?.name}
          </ThemedText>

          <Pressable onPress={onClose} hitSlop={10}>
            <Ionicons name="close" size={22} color={iconColor} />
          </Pressable>
        </View>

        <Pressable
          onPress={onOpen}
          style={[
            styles.card,
            {
              backgroundColor: cardBg,
              borderColor: border,
            },
          ]}
        >
          <View style={styles.rowStart}>
            {place?.image ? (
              <Image
                source={typeof place.image === "string" ? { uri: place.image } : place.image}
                style={[styles.image, { backgroundColor: imageBg }]}
              />
            ) : (
              <View style={[styles.image, styles.imageFallback, { backgroundColor: imageBg }]}>
                <Ionicons name="image-outline" size={22} color={accent} />
              </View>
            )}

            <View style={{ flex: 1 }}>
              {!!place?.info && (
                <ThemedText type="default" numberOfLines={2} style={{ marginBottom: 6 }}>
                  {place.info}
                </ThemedText>
              )}

              <View style={styles.metaRow}>
                <Ionicons name="star" size={14} color={theme.warning ?? "#f5b400"} />
                <ThemedText type="default" tone="secondary" style={{ marginLeft: 4 }}>
                  {place?.rating ?? "-"}
                </ThemedText>

                <ThemedText type="default" tone="secondary">
                  {" "}· {place?.distance ?? "-"} km · {place?.category ?? "-"}
                </ThemedText>
              </View>

              <View style={styles.openRow}>
                <ThemedText type="defaultSemiBold" tone="accent">
                  Open details
                </ThemedText>
                <Ionicons name="chevron-forward" size={18} color={accent} />
              </View>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 20,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -3 },
    elevation: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  card: {
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
  },
  rowStart: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  image: {
    width: 74,
    height: 74,
    borderRadius: 12,
    marginRight: 10,
  },
  imageFallback: {
    alignItems: "center",
    justifyContent: "center",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  openRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});