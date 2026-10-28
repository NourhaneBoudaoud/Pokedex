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
      accessibilityRole="button"
      accessibilityLabel="Search for Pokémon"
      accessibilityHint="Opens the search screen"
    >
      <MaterialIcons name="search" size={iconSize.md} color={colors.text} />
      <Text style={styles.placeholder} numberOfLines={1}>
        {SEARCH_PLACEHOLDER}
      </Text>
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
    minHeight: FIELD_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.ms,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    ...shadow,
  },
  placeholder: {
    flexShrink: 1,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    color: colors.textFaint,
  },
  input: {
    flex: 1,
    minHeight: FIELD_HEIGHT,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    color: colors.text,
  },
});
