import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fontFamily, fontSize, iconSize, radius, shadow, spacing } from '@/constants/theme';

export const SEARCH_PLACEHOLDER = 'Search for Pokémon..';

type Props = {
  onPress: () => void;
};

// The field on the home screen. It only opens the search screen, where the real input lives.
export function SearchField({ onPress }: Props) {
  return (
    <Pressable
      style={styles.field}
      onPress={onPress}
      accessibilityRole="search"
      accessibilityLabel="Search for Pokémon"
    >
      <MaterialIcons name="search" size={iconSize.md} color={colors.text} />
      <Text style={styles.placeholder}>{SEARCH_PLACEHOLDER}</Text>
    </Pressable>
  );
}

const FIELD_HEIGHT = 48;

const styles = StyleSheet.create({
  field: {
    height: FIELD_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.ms,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    ...shadow,
  },
  placeholder: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    color: colors.textFaint,
  },
});
