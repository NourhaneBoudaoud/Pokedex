import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, TextInput, View } from 'react-native';

import { BackButton } from '@/components/back-button';
import { cardShadow, fontFamily, fontSize, iconSize, radius, spacing } from '@/constants/theme';
import { makeStyles, useTheme } from '@/hooks/use-theme';
import { useTranslation } from '@/hooks/use-translation';

type SearchFieldProps = {
  onPress: () => void;
};

// The field on the home screen. It only opens the search screen, where the real input lives.
export function SearchField({ onPress }: SearchFieldProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = useStyles();
  return (
    <Pressable
      style={styles.field}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={t('search.label')}
      accessibilityHint={t('search.hint')}
    >
      <MaterialIcons name="search" size={iconSize.md} color={colors.text} />
      <Text style={styles.placeholder} numberOfLines={1}>
        {t('search.placeholder')}
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
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = useStyles();
  return (
    <View style={styles.field}>
      <BackButton onPress={onBack} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={t('search.placeholder')}
        placeholderTextColor={colors.textMuted}
        selectionColor={colors.primary}
        autoFocus
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        clearButtonMode="while-editing"
        accessibilityLabel={t('search.label')}
      />
    </View>
  );
}

const FIELD_HEIGHT = 48;

const useStyles = makeStyles((colors) => ({
  field: {
    minHeight: FIELD_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.ms,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    ...cardShadow(colors),
  },
  placeholder: {
    flexShrink: 1,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  input: {
    flex: 1,
    minHeight: FIELD_HEIGHT,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    color: colors.text,
  },
}));
