import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fontFamily, fontSize, iconSize, spacing } from '@/constants/theme';

type Props = {
  // With a label: the iOS chevron and text from the detail design. Without: the plain arrow of the search field.
  label?: string;
  // Defaults to going back one screen.
  onPress?: () => void;
};

export function BackButton({ label, onPress = () => router.back() }: Props) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      hitSlop={spacing.sm}
      accessibilityRole="button"
      accessibilityLabel="Back"
    >
      <MaterialIcons
        name={label ? 'arrow-back-ios' : 'arrow-back'}
        size={label ? iconSize.sm : iconSize.md}
        color={colors.text}
      />
      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    color: colors.text,
  },
});
