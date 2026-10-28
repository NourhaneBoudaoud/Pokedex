import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect } from 'react';
import { AccessibilityInfo, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fontFamily, fontSize, iconSize, spacing } from '@/constants/theme';
import { useNetworkStatus } from '@/hooks/use-network-status';

const MESSAGE = 'You are offline, showing saved data';

// Above every screen while there is no network. It takes the top safe area, the screen below starts under it.
export function OfflineBanner() {
  const { offline } = useNetworkStatus();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (offline) {
      AccessibilityInfo.announceForAccessibility(MESSAGE);
    }
  }, [offline]);

  if (!offline) {
    return null;
  }

  return (
    <View style={[styles.banner, { paddingTop: insets.top + spacing.xs }]} accessible accessibilityLabel={MESSAGE}>
      <MaterialIcons name="cloud-off" size={iconSize.sm} color={colors.textMuted} aria-hidden />
      <Text style={styles.text}>{MESSAGE}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  text: {
    flexShrink: 1,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.text,
  },
});
