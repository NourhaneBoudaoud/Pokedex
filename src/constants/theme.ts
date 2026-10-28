// Design tokens from specs/design.md. Screens and components take every colour, size and font from here.

export const colors = {
  background: '#EDF6FF',
  surface: '#FFFFFF',
  imageBackground: '#F7F7FF',
  primary: '#5631E8',
  onPrimary: '#FFFFFF',
  text: '#0E0940',
  textSecondary: 'rgba(14, 9, 64, 0.65)',
  textMuted: 'rgba(14, 9, 64, 0.5)',
  textFaint: 'rgba(14, 9, 64, 0.3)',
  chip: 'rgba(14, 9, 64, 0.08)',
  divider: '#DBDAE6',
  track: '#F3F3F7',
  favorite: '#FF4F68',
  tabBar: 'rgba(237, 246, 255, 0.5)',
  skeleton: 'rgba(14, 9, 64, 0.06)',
} as const;

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

// Takes the type name as PokeAPI returns it ("grass", "fire", ...).
export function getTypeColor(name: string): string {
  return isPokemonTypeName(name) ? typeColors[name] : colors.textMuted;
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

// Cards and the search field.
export const shadow = {
  shadowColor: '#303773',
  shadowOpacity: 0.15,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 7.5,
  elevation: 4,
} as const;

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
