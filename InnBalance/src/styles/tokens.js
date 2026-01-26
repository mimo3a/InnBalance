import { useColorScheme } from "react-native";

export const MODES = {
    light: "light",
    dark: "dark",
};

export const SPACING = {
    xxs: 4,
    xs: 6,
    sm: 10,
    md: 16,
    lg: 20,
    xl: 28,
};

export const RADIUS = {
    sm: 10,
    md: 12,
    lg: 16,
    xl: 20,
};

export const FONT = {
    title: 36,
    header: 26,
    body: 16,
    small: 14,
};

export const WEIGHT = {
    regular: "400",
    semibold: "600",
    bold: "700",
    extrabold: "800",
};

/** App color tokens, please keep them stable, so screens/components can rely on them */

export const COLORS = {
    // Light mode colors
    light: {
        // Surfaces
        background: "#e7ede2",
        surface: "#F2F2F2",
        surfaceVariant: "#E0E0E0",

        // Text
        text: "#000000",
        textMuted: "#666666",

        // Borders / Dividers
        border: "#C1CCC6",
        borderSoft: "#C1CCC6",
        divider: "#c1ccc7",

        // Brand / Actions
        primary: "#296448",
        onPrimary: "#eefff2",

        // Success/Info-ish accent used for selected states, etc.
        accent: "#95caa0",
        onAccent: "#0c2217",

        // Shadows
        shadow: "#00000033",
    },

    // Dark mode colors
    dark: {
        background: "#09100e",
        surface: "#1B1D1E",
        surfaceVariant: "#202324",

        text: "#F8F7F3",
        textMuted: "#F8F7F3",
        border: "#2a2f2e",
        borderSoft: "#242926",
        divider: "#2a2f2a",

        primary: "#7e9d84",
        onPrimary: "#0c2217",
        accent: "#39825f",
        onAccent: "#0c2217",

        shadow: "#000000",
    },
};

function normalizeMode(mode) {
    if (mode === MODES.light || mode === MODES.dark) return mode;
    return MODES.light;
}

export function getTokens(mode) {
    const m = normalizeMode(mode);
    return {
        mode: m,
        colors: COLORS[m],
        spacing: SPACING,
        radius: RADIUS,
        font: FONT,
        weight: WEIGHT,
    };
}

/** Hook: uses system color scheme by default, passes "light" or "dark" to force a mode */

export function useTokens(preferredMode) {
    const systemScheme = useColorScheme();
    const mode = preferredMode ? normalizeMode(preferredMode) : normalizeMode(systemScheme);
    return getTokens(mode);
}

