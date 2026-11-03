// Design tokens from specs/design.md. Screens and components take every colour, size and font from here.

// Two palettes with the same tokens: the app follows the phone's light or dark setting.
// Screens and components read them through useTheme() / makeStyles() (src/hooks/use-theme.ts), never directly.
// Every text token is at least 4.5:1 on background, surface and imageBackground (src/services/__tests__/theme.test.ts).
export const lightColors = {
  background: '#EDF6FF',
  surface: '#FFFFFF',
  imageBackground: '#F7F7FF',
  primary: '#5631E8',
  onPrimary: '#FFFFFF',
  text: '#0E0940',
  textSecondary: 'rgba(14, 9, 64, 0.65)',
  // 60 %, not the design's 50 %: 50 % is only 3.5:1 on the background.
  textMuted: 'rgba(14, 9, 64, 0.6)',
  // Lines and empty bars only, never text (2:1).
  textFaint: 'rgba(14, 9, 64, 0.3)',
  chip: 'rgba(14, 9, 64, 0.08)',
  divider: '#DBDAE6',
  track: '#F3F3F7',
  favorite: '#FF4F68',
  tabBar: 'rgba(237, 246, 255, 0.5)',
  skeleton: 'rgba(14, 9, 64, 0.06)',
  // Opacity included: shadowOpacity stays 1 (see cardShadow).
  shadow: 'rgba(48, 55, 115, 0.15)',
};

export type Palette = typeof lightColors;

// No dark version in the Figma: dark blue-grey background, slightly lighter cards, a lighter purple
// (#5631E8 is 2.5:1 on the dark background), so the text on it turns dark.
export const darkColors: Palette = {
  background: '#14172B',
  surface: '#1F2338',
  imageBackground: '#282D45',
  primary: '#9D87FF',
  onPrimary: '#0E0940',
  text: '#EEEDFB',
  textSecondary: 'rgba(238, 237, 251, 0.65)',
  textMuted: 'rgba(238, 237, 251, 0.6)',
  textFaint: 'rgba(238, 237, 251, 0.3)',
  chip: 'rgba(238, 237, 251, 0.12)',
  divider: '#353A52',
  track: '#2C3149',
  favorite: '#FF4F68',
  tabBar: 'rgba(20, 23, 43, 0.5)',
  skeleton: 'rgba(238, 237, 251, 0.08)',
  shadow: 'rgba(0, 0, 0, 0.4)',
};

export const palettes = {
  light: lightColors,
  dark: darkColors,
} as const;

export type ColorScheme = keyof typeof palettes;

// The same in both modes: they are only used as the dot of a type pill.
export const typeColors = {
  normal: '#A8A77A',
  fire: '#FF4F68',
  water: '#4D90D5',
  electric: '#FFCF00',
  grass: '#64BC55',
  ice: '#74CEC0',
  fighting: '#CE4069',
  poison: '#AB6AC8',
  ground: '#D97746',
  flying: '#8FA8DD',
  psychic: '#F97176',
  bug: '#90C12C',
  rock: '#C7B78B',
  ghost: '#5269AC',
  dragon: '#0A6DC4',
  dark: '#5A5366',
  steel: '#5A8EA1',
  fairy: '#EC8FE6',
} as const;

export type PokemonTypeName = keyof typeof typeColors;

function isPokemonTypeName(name: string): name is PokemonTypeName {
  return name in typeColors;
}

// Takes the type name as PokeAPI returns it ("grass", "fire", ...). An unknown type gets the palette's muted colour.
export function getTypeColor(name: string, palette: Palette): string {
  return isPokemonTypeName(name) ? typeColors[name] : palette.textMuted;
}

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  ms: 12,
  md: 16,
  lg: 24,
} as const;

export const iconSize = {
  sm: 20,
  md: 24,
} as const;

export const radius = {
  bar: 2,
  sm: 4,
  md: 8,
  pill: 16,
} as const;

// Cards and the search field. The colour (with its opacity) comes from the palette.
export function cardShadow(palette: Palette) {
  return {
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7.5,
    elevation: 4,
  } as const;
}

// Names match the keys given to useFonts in src/hooks/use-app-fonts.ts.
export const fontFamily = {
  regular: 'Rubik-Regular',
  medium: 'Rubik-Medium',
  title: 'CabinetGrotesk-Extrabold',
  number: 'CabinetGrotesk-Regular',
} as const;

export const fontSize = {
  xs: 10,
  sm: 14,
  md: 16,
  title: 24,
  name: 32,
} as const;

// Upper limit of the system text size (maxFontSizeMultiplier) for text that cannot grow freely:
// fixed-height badge and pills, the three detail tabs side by side, and the big Cabinet Grotesk titles.
export const maxFontScale = {
  chip: 1.5,
  tab: 1.3,
  title: 1.5,
} as const;

// From this system text size on, layouts switch to one column so names and values have room to wrap.
export const largeTextScale = 1.5;
