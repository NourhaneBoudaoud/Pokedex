import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontFamily, fontSize, spacing } from '@/constants/theme';

export const DETAIL_TABS = ['About', 'Stats', 'Evolution'] as const;

export type DetailTab = (typeof DETAIL_TABS)[number];

type Props = {
  active: DetailTab;
  onChange: (tab: DetailTab) => void;
};

export function DetailTabs({ active, onChange }: Props) {
  return (
    <View style={styles.container} accessibilityRole="tablist">
      {DETAIL_TABS.map((tab) => {
        const selected = tab === active;
        return (
          <Pressable
            key={tab}
            style={[styles.tab, selected && styles.tabActive]}
            onPress={() => onChange(tab)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
          >
            <Text style={[styles.label, selected && styles.labelActive]}>{tab}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const UNDERLINE = 2;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: spacing.ms,
    borderBottomWidth: UNDERLINE,
    borderBottomColor: colors.divider,
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  labelActive: {
    color: colors.text,
  },
});
