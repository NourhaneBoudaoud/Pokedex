import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { BackButton } from '@/components/back-button';
import { colors, fontFamily, fontSize, iconSize, radius, shadow, spacing } from '@/constants/theme';

export const SEARCH_PLACEHOLDER = 'Search for Pokémon..';

type SearchFieldProps = {
  onPress: () => void;
};

// The field on the home screen. It only opens the search screen, where the real input lives.
export function SearchField({ onPress }: SearchFieldProps) {
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

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  // Where the back arrow goes; defaults to the previous screen.
  onBack?: () => void;
};

// The field on the search screen: same look, a back arrow instead of the search icon, focused on open.
export function SearchInput({ value, onChangeText, onBack }: SearchInputProps) {
  return (
    <View style={styles.field}>
      <BackButton onPress={onBack} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={SEARCH_PLACEHOLDER}
        placeholderTextColor={colors.textFaint}
        selectionColor={colors.primary}
        autoFocus
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        clearButtonMode="while-editing"
        accessibilityLabel="Search for Pokémon"
      />
    </View>
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
  input: {
    flex: 1,
    height: FIELD_HEIGHT,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    color: colors.text,
  },
});
