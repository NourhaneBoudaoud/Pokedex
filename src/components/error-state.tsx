import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontFamily, fontSize, iconSize, radius, spacing } from '@/constants/theme';

type Props = {
  message?: string;
  onRetry: () => void;
  // Compact: a single line, for the end of a list instead of the whole screen.
  compact?: boolean;
};

export function ErrorState({ message = 'Something went wrong.', onRetry, compact = false }: Props) {
  return (
    <View style={[styles.container, compact && styles.compact]}>
      {!compact && <MaterialIcons name="error-outline" size={iconSize.md} color={colors.textMuted} aria-hidden />}
      <Text style={styles.message}>{message}</Text>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={onRetry}
        accessibilityRole="button"
        accessibilityLabel="Retry"
      >
        <Text style={styles.buttonText}>Retry</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  compact: {
    flex: 0,
    flexDirection: 'row',
    gap: spacing.ms,
    padding: spacing.md,
  },
  message: {
    flexShrink: 1,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  pressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.onPrimary,
  },
});
