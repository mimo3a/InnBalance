/**
 * Theme Configuration
 * 
 * Defines color schemes and font families for the application.
 * Supports both light and dark mode with consistent color values.
 * Provides platform-specific font configurations for iOS, Android, and Web.
 * 
 * Color Palette:
 * - Light mode: Dark text on white background with teal accent
 * - Dark mode: Light text on dark background with white accent
 * 
 * Usage:
 * Import Colors and Fonts from this file to maintain consistent theming
 * throughout the app.
 */

import { Platform } from 'react-native';

// Accent color for light mode (teal)
const tintColorLight = '#0a7ea4';

// Accent color for dark mode (white)
const tintColorDark = '#fff';

/**
 * Colors Object
 * Contains color schemes for both light and dark modes
 * Each mode defines colors for text, background, icons, and tabs
 */
export const Colors = {
  light: {
    text: '#11181C',           // Nearly black for text
    background: '#fff',        // White background
    tint: tintColorLight,      // Teal accent color
    icon: '#687076',           // Medium gray for icons
    tabIconDefault: '#687076', // Default tab icon color
    tabIconSelected: tintColorLight, // Active tab color
  },
  dark: {
    text: '#ECEDEE',           // Off-white for text
    background: '#151718',     // Dark gray background
    tint: tintColorDark,       // White accent color
    icon: '#9BA1A6',           // Light gray for icons
    tabIconDefault: '#9BA1A6', // Default tab icon color
    tabIconSelected: tintColorDark, // Active tab color
  },
};

/**
 * Fonts Object
 * Platform-specific font family configurations
 * Provides sans-serif, serif, rounded, and monospace variants
 */

/**
 * Fonts Object
 * Platform-specific font family configurations
 * Provides sans-serif, serif, rounded, and monospace variants
 */
export const Fonts = Platform.select({
  // iOS system fonts
  ios: {
    /** iOS UIFontDescriptorSystemDesignDefault - System default font */
    sans: 'system-ui',
    /** iOS UIFontDescriptorSystemDesignSerif - Serif font */
    serif: 'ui-serif',
    /** iOS UIFontDescriptorSystemDesignRounded - Rounded font */
    rounded: 'ui-rounded',
    /** iOS UIFontDescriptorSystemDesignMonospaced - Monospace font */
    mono: 'ui-monospace',
  },
  // Default Android fonts
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  // Web font stack with fallbacks
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
