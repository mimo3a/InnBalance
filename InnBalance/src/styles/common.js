import { StyleSheet } from "react-native";
import { useTokens } from "./tokens";

/** Common styles */
export function makeCommonStyles(tokens) {
  const { colors, spacing, radius, font, weight } = tokens;

  return StyleSheet.create({
    // Layout
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      padding: spacing.md,
    },

    // Background image layout
    backgroundImage: {
      flex: 1,
    },

    backgroundOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.overlay,
    },

    backgroundContent: {
      flex: 1,
    },

    // Rows / Columns
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    rowStart: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      flexWrap: "wrap",
    },
    center: {
      justifyContent: "center",
      alignItems: "center",
    },

    // Text
    title: {
      fontSize: font.title,
      fontWeight: weight.extrabold,
      color: colors.text,
      flexWrap: "wrap",
    },
    header: {
      fontSize: font.header,
      fontWeight: weight.bold,
      color: colors.text,
      flexWrap: "wrap",
    },
    body: {
      fontSize: font.body,
      fontWeight: weight.regular,
      color: colors.text,
      marginVertical: spacing.sm,
      lineHeight: font.body * 1.4,
      flexWrap: "wrap",
    },
    small: {
      fontSize: font.small,
      fontWeight: weight.regular,
      color: colors.textMuted,
      flexWrap: "wrap",
    },

    // Cards
    card: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      padding: spacing.md,
      backgroundColor: colors.surface,
    },
    cardSoft: {
      borderWidth: 1,
      borderColor: colors.borderSoft,
      borderRadius: radius.md,
      padding: spacing.md,
      backgroundColor: colors.surfaceVariant,
    },

    // Dividers
    divider: {
      width: "100%",
      height: 1,
      backgroundColor: colors.divider,
      marginVertical: spacing.sm,
    },

    // Buttons
    button: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderRadius: radius.sm,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: colors.onPrimary,
      fontSize: font.body,
      fontWeight: weight.semibold,
      flexWrap: "wrap",
    },

    // Accent buttons
    buttonAccent: {
      backgroundColor: colors.accent,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderRadius: radius.sm,
      alignSelf: "center",
    },
    buttonAccentText: {
      color: colors.onAccent,
      fontSize: font.body,
      fontWeight: weight.semibold,
      flexWrap: "wrap",
    },

    // Accent buttons version 2
    buttonAccent2: {
      backgroundColor: colors.accent,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderRadius: radius.xl,
      alignSelf: "flex-start",
    },
    buttonAccentText2: {
      color: colors.onAccent,
      fontSize: font.body,
      fontWeight: weight.semibold,
      flexWrap: "wrap",
    },

    // Inputs
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.sm,
      padding: spacing.sm,
      fontSize: font.body,
      color: colors.text,
      flexGrow: 1,
      flexShrink: 1,
      minWidth: 220,
      backgroundColor: colors.surface,
    },

    // Shadow helper
    shadowCard: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 4,
    },
  });
}

export function useCommonStyles(preferredMode) {
  const tokens = useTokens(preferredMode);
  return makeCommonStyles(tokens);
}
