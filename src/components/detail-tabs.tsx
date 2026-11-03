import { Platform, Pressable, Text, View } from 'react-native';

import { fontFamily, fontSize, maxFontScale, spacing } from '@/constants/theme';
import { type TranslationKey } from '@/constants/translations/en';
import { makeStyles } from '@/hooks/use-theme';
import { useTranslation } from '@/hooks/use-translation';
import type { Translate } from '@/services/i18n';

export const DETAIL_TABS = ['About', 'Stats', 'Evolution'] as const;

export type DetailTab = (typeof DETAIL_TABS)[number];

const TAB_LABELS: Record<DetailTab, TranslationKey> = {
  About: 'detail.tab.about',
  Stats: 'detail.tab.stats',
  Evolution: 'detail.tab.evolution',
};

type Props = {
  active: DetailTab;
  onChange: (tab: DetailTab) => void;
};

// On iOS the "tab" and "tablist" roles give VoiceOver nothing to announce, so the label says it is a tab and
// where it is. TalkBack on Android announces the role itself.
function tabLabel(t: Translate, tab: string, index: number) {
  return Platform.OS === 'ios' ? t('detail.tabPosition', { tab, index: index + 1, count: DETAIL_TABS.length }) : tab;
}

export function DetailTabs({ active, onChange }: Props) {
  const styles = useStyles();
  const { t } = useTranslation();
  return (
    <View style={styles.container} accessibilityRole="tablist">
      {DETAIL_TABS.map((tab, index) => {
        const selected = tab === active;
        const label = t(TAB_LABELS[tab]);
        return (
          <Pressable
            key={tab}
            style={[styles.tab, selected && styles.tabActive]}
            onPress={() => onChange(tab)}
            accessibilityRole="tab"
            accessibilityLabel={tabLabel(t, label, index)}
            accessibilityState={{ selected }}
          >
            <Text
              style={[styles.label, selected && styles.labelActive]}
              numberOfLines={1}
              maxFontSizeMultiplier={maxFontScale.tab}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const UNDERLINE = 2;

const useStyles = makeStyles((colors) => ({
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
}));
