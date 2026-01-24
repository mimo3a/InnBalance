import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Pressable, StyleSheet, View, Text, Image, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCommonStyles } from "@/src/styles/common";
import { useTokens } from "@/src/styles/tokens";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function PlaceBottomSheet({ place, visible, onClose, onOpen }) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const common = useCommonStyles();
  const tokens = useTokens();

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : SCREEN_HEIGHT,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [visible, translateY]);

  if (!place && !visible) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents={visible ? "auto" : "none"}>
      {/* backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* sheet */}
      <Animated.View style={[styles.sheet, common.card, common.shadowCard,{borderRadius: 18}, { transform: [{ translateY }] }]}>

        {/* header row */}
        <View style={[common.row, { marginBottom: tokens.spacing.sm }]}>
          <Text style={common.header} numberOfLines={1}>
            {place?.name}
          </Text>

          <Pressable onPress={onClose} hitSlop={10}>
            <Ionicons name="close" size={22} color="#444" />
          </Pressable>
        </View>

        {/* content card */}
        <Pressable onPress={onOpen} style={[common.card, common.shadowCard]}>
          <View style={common.rowStart}>
            
            {place?.image ? (
              <Image source={place.image} style={styles.image} />
            ) : (
              <View style={[styles.image, styles.imageFallback]}>
                <Ionicons name="image-outline" size={22} color={tokens.colors.primary} />
              </View>
            )}

            <View style={{ flex: 1 }}>
              {!!place?.info && (
                <Text style={common.body} numberOfLines={2}>
                  {place.info}
                </Text>
              )}

              {/* rating / distance / category row */}
              <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                <Ionicons name="star" size={14} color="#f5b400" />
                <Text style={[common.small, { marginLeft: 4 }]}>
                  {place?.rating ?? "-"}
                </Text>

                <Text style={common.small}>
                  {" "}· {place?.distance ?? "-"} km · {place?.category ?? "-"}
                </Text>
              </View>

              {/* open hint */}
              <View style={styles.openRow}>
                <Text style={[common.small, { fontWeight: tokens.weight.semibold, color: tokens.colors.accent }]}>Open details</Text>
                <Ionicons name="chevron-forward" size={18} color="#39825f" />
              </View>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
}


// Styles, specific to this component, not in common.js or tokens.js
const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -3 },
    elevation: 8,
  },
  image: {
    width: 74,
    height: 74,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: "#eee",
  },
  imageFallback: {
    alignItems: "center",
    justifyContent: "center",
  },
  openRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});