import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NumberBadge } from '@/components/number-badge';
import { RemoteImage } from '@/components/remote-image';
import { Skeleton } from '@/components/skeleton';
import { colors, fontFamily, fontSize, radius, shadow, spacing } from '@/constants/theme';
import { formatName, getSpriteUrl, type PokemonSummary } from '@/services/pokemon';

type Props = {
  pokemon: PokemonSummary;
  onPress: () => void;
  // What a tap does, for screen readers: "Open" in the evolution tab, "Pick" in the compare picker.
  actionLabel: string;
};

// A horizontal card: sprite on the left, badge and name on the right. Evolution tab and compare picker.
export function PokemonRow({ pokemon, onPress, actionLabel }: Props) {
  const name = formatName(pokemon.name);
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${actionLabel} ${name}`}
    >
      <View style={styles.imageArea}>
        <RemoteImage uri={getSpriteUrl(pokemon.id)} style={styles.sprite} />
      </View>
      <View style={styles.info}>
        <NumberBadge id={pokemon.id} />
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
      </View>
    </Pressable>
  );
}

const BADGE_WIDTH = 30;
const BADGE_HEIGHT = 18;

export function PokemonRowSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.imageArea} />
      <View style={styles.info}>
        <Skeleton width={BADGE_WIDTH} height={BADGE_HEIGHT} />
        <Skeleton width="50%" height={fontSize.md} />
      </View>
    </View>
  );
}

export const ROW_HEIGHT = 80;

const styles = StyleSheet.create({
  card: {
    height: ROW_HEIGHT,
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    ...shadow,
  },
  pressed: {
    opacity: 0.8,
  },
  imageArea: {
    width: ROW_HEIGHT,
    height: ROW_HEIGHT,
    backgroundColor: colors.imageBackground,
    borderTopLeftRadius: radius.md,
    borderBottomLeftRadius: radius.md,
    overflow: 'hidden',
  },
  sprite: {
    flex: 1,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.ms,
  },
  name: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.text,
  },
});
