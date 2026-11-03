import { Text, View } from 'react-native';

import { fontFamily, fontSize, radius, spacing } from '@/constants/theme';
import { makeStyles } from '@/hooks/use-theme';
import { useTranslation } from '@/hooks/use-translation';
import { statBarRatio, type PokemonStat } from '@/services/pokemon';

type Props = {
  stats: PokemonStat[];
};

export function StatsTab({ stats }: Props) {
  const styles = useStyles();
  const { statName } = useTranslation();
  return (
    <View style={styles.container}>
      {stats.map((stat) => (
        <View key={stat.name} style={styles.row}>
          <View style={styles.labels}>
            <Text style={styles.name}>{statName(stat.name)}</Text>
            <Text style={styles.value}>{stat.value}</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${statBarRatio(stat.value) * 100}%` }]} />
          </View>
        </View>
      ))}
    </View>
  );
}

const BAR_HEIGHT = 4;

const useStyles = makeStyles((colors) => ({
  container: {
    gap: spacing.md + spacing.xs,
  },
  row: {
    gap: spacing.sm,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.text,
  },
  value: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  track: {
    height: BAR_HEIGHT,
    borderRadius: radius.bar,
    backgroundColor: colors.track,
    overflow: 'hidden',
  },
  fill: {
    height: BAR_HEIGHT,
    borderRadius: radius.bar,
    backgroundColor: colors.primary,
  },
}));
