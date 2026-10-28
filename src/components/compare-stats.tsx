import { StyleSheet, Text, View } from 'react-native';

import { Skeleton } from '@/components/skeleton';
import { colors, fontFamily, fontSize, radius, spacing } from '@/constants/theme';
import type { StatComparison } from '@/services/compare';
import { formatStatName, statBarRatio } from '@/services/pokemon';

type Props = {
  rows: StatComparison[];
  total: StatComparison;
};

const STAT_COUNT = 6;

// Six stats and the total. Each side: value and a bar growing from the middle; the higher side is highlighted.
export function CompareStats({ rows, total }: Props) {
  return (
    <View style={styles.container}>
      {rows.map((row) => (
        <CompareRow key={row.name} row={row} label={formatStatName(row.name)} />
      ))}
      <View style={styles.divider} />
      <CompareRow row={total} label="Total" ratioOf={(value) => statBarRatio(value / STAT_COUNT)} />
    </View>
  );
}

type RowProps = {
  row: StatComparison;
  label: string;
  ratioOf?: (value: number) => number;
};

function CompareRow({ row, label, ratioOf = statBarRatio }: RowProps) {
  const leftWins = row.winner !== 'right';
  const rightWins = row.winner !== 'left';
  return (
    <View style={styles.row} accessible accessibilityLabel={`${label}: ${row.left} against ${row.right}`}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.sides}>
        <Text style={[styles.value, leftWins ? styles.valueWin : styles.valueLose]}>{row.left}</Text>
        <View style={[styles.track, styles.trackLeft]}>
          <View style={[styles.fill, leftWins ? styles.fillWin : styles.fillLose, { width: `${ratioOf(row.left) * 100}%` }]} />
        </View>
        <View style={styles.track}>
          <View style={[styles.fill, rightWins ? styles.fillWin : styles.fillLose, { width: `${ratioOf(row.right) * 100}%` }]} />
        </View>
        <Text style={[styles.value, styles.valueRight, rightWins ? styles.valueWin : styles.valueLose]}>
          {row.right}
        </Text>
      </View>
    </View>
  );
}

const SKELETON_ROWS = [0, 1, 2, 3, 4, 5, 6];
const LABEL_WIDTH = 96;

export function CompareStatsSkeleton() {
  return (
    <View style={styles.container}>
      {SKELETON_ROWS.map((row) => (
        <View key={row} style={styles.row}>
          <Skeleton width={LABEL_WIDTH} height={fontSize.sm} style={styles.skeletonLabel} />
          <Skeleton height={BAR_HEIGHT} radius={radius.bar} />
        </View>
      ))}
    </View>
  );
}

const BAR_HEIGHT = 4;
const VALUE_WIDTH = 36;

const styles = StyleSheet.create({
  container: {
    gap: spacing.md + spacing.xs,
  },
  row: {
    gap: spacing.sm,
  },
  label: {
    textAlign: 'center',
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.text,
  },
  skeletonLabel: {
    alignSelf: 'center',
  },
  sides: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  value: {
    width: VALUE_WIDTH,
    fontSize: fontSize.sm,
  },
  valueRight: {
    textAlign: 'right',
  },
  valueWin: {
    fontFamily: fontFamily.medium,
    color: colors.primary,
  },
  valueLose: {
    fontFamily: fontFamily.regular,
    color: colors.textMuted,
  },
  track: {
    flex: 1,
    height: BAR_HEIGHT,
    flexDirection: 'row',
    borderRadius: radius.bar,
    backgroundColor: colors.track,
    overflow: 'hidden',
  },
  // The left bar grows from the middle towards the left.
  trackLeft: {
    flexDirection: 'row-reverse',
  },
  fill: {
    height: BAR_HEIGHT,
    borderRadius: radius.bar,
  },
  fillWin: {
    backgroundColor: colors.primary,
  },
  fillLose: {
    backgroundColor: colors.textFaint,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
  },
});
