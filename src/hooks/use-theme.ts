import { StyleSheet, useColorScheme, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';

import { darkColors, lightColors, palettes, type ColorScheme, type Palette } from '@/constants/theme';

// The phone's light or dark setting. Re-renders when it changes, so the app switches live.
export function useTheme(): { scheme: ColorScheme; colors: Palette } {
  const scheme: ColorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  return { scheme, colors: palettes[scheme] };
}

// Style sheets that use colours: written once with the palette as argument, built for both palettes at load,
// so switching mode or re-rendering creates nothing.
// const useStyles = makeStyles((colors) => ({ card: { backgroundColor: colors.surface } }));
type NamedStyles = Record<string, ViewStyle | TextStyle | ImageStyle>;

export function makeStyles<const T extends NamedStyles>(create: (colors: Palette) => T) {
  const sheets = {
    light: StyleSheet.create(create(lightColors)),
    dark: StyleSheet.create(create(darkColors)),
  };
  return function useStyles(): T {
    return sheets[useTheme().scheme];
  };
}
