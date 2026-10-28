import { StyleSheet, View } from 'react-native';

import { loadingProps, Skeleton } from '@/components/skeleton';
import { colors, fontSize, radius, spacing } from '@/constants/theme';

const ARTWORK_SIZE = 160;
const NAME_WIDTH = 180;
const NUMBER_WIDTH = 64;
const PILL_WIDTH = 88;
const PILL_HEIGHT = 32;
const LABEL_WIDTH = 72;
const TAB_HEIGHT = 40;
const ROWS = [0, 1, 2, 3, 4, 5, 6];

// The detail screen while the Pokémon loads: header, artwork, tabs and About rows in their real places.
export function DetailSkeleton() {
  return (
    <View style={styles.container} {...loadingProps}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Skeleton width={NAME_WIDTH} height={fontSize.name} />
          <Skeleton width={NUMBER_WIDTH} height={fontSize.title} />
        </View>
        <View style={styles.types}>
          <Skeleton width={PILL_WIDTH} height={PILL_HEIGHT} radius={radius.pill} />
          <Skeleton width={PILL_WIDTH} height={PILL_HEIGHT} radius={radius.pill} />
        </View>
        <Skeleton
          width={ARTWORK_SIZE}
          height={ARTWORK_SIZE}
          radius={ARTWORK_SIZE / 2}
          style={styles.artwork}
        />
      </View>
      <View style={styles.body}>
        <Skeleton height={TAB_HEIGHT} radius={radius.md} />
        {ROWS.map((row) => (
          <View key={row} style={styles.row}>
            <Skeleton width={LABEL_WIDTH} height={fontSize.sm} />
            <Skeleton width="45%" height={fontSize.sm} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  types: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  artwork: {
    alignSelf: 'center',
    marginTop: spacing.md,
  },
  body: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.lg + spacing.lg,
  },
});
