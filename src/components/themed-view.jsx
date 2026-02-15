import { View } from 'react-native';

import { useTheme } from '@/src/contexts/ThemeContext';

export function ThemedView({ style, ...otherProps }) {
  const { theme } = useTheme();
  const backgroundColor = theme.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
