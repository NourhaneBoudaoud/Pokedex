import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect } from 'react';
import { AccessibilityInfo, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { fontFamily, fontSize, iconSize, spacing } from '@/constants/theme';
import { makeStyles, useTheme } from '@/hooks/use-theme';
import { useNetworkStatus } from '@/hooks/use-network-status';
import { useTranslation } from '@/hooks/use-translation';

// Above every screen while there is no network. It takes the top safe area, the screen below starts under it.
export function OfflineBanner() {
  const { colors } = useTheme();
  const styles = useStyles();
  const { offline } = useNetworkStatus();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const message = t('offline.message');

  useEffect(() => {
    if (offline) {
      AccessibilityInfo.announceForAccessibility(message);
    }
  }, [offline, message]);

  if (!offline) {
    return null;
  }

  return (
    <View style={[styles.banner, { paddingTop: insets.top + spacing.xs }]} accessible accessibilityLabel={message}>
      <MaterialIcons name="cloud-off" size={iconSize.sm} color={colors.textMuted} aria-hidden />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
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
}));
