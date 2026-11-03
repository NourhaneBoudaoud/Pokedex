import { Pressable, Text, View } from 'react-native';

import { NumberBadge } from '@/components/number-badge';
import { RemoteImage } from '@/components/remote-image';
import { Skeleton } from '@/components/skeleton';
import { cardShadow, fontFamily, fontSize, radius, spacing } from '@/constants/theme';
import { makeStyles } from '@/hooks/use-theme';
import { useTranslation } from '@/hooks/use-translation';
import { useLargeText } from '@/hooks/use-large-text';
import { formatName, getSpriteUrl, type PokemonSummary } from '@/services/pokemon';

type Props = {
  pokemon: PokemonSummary;
  onPress: () => void;
  // What a tap does, for screen readers: "Open" in the evolution tab, "Pick" in the compare picker.
  action: 'open' | 'pick';
};

// A horizontal card: sprite on the left, badge and name on the right. Evolution tab and compare picker.
export function PokemonRow({ pokemon, onPress, action }: Props) {
  const styles = useStyles();
  const { t } = useTranslation();
  const name = formatName(pokemon.name);
  const largeText = useLargeText();
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={t(action === 'open' ? 'pokemon.open' : 'pokemon.pick', { name })}
    >
      <View style={styles.imageArea}>
        <RemoteImage uri={getSpriteUrl(pokemon.id)} style={styles.sprite} />
      </View>
      <View style={styles.info}>
        <NumberBadge id={pokemon.id} />
        <Text style={styles.name} numberOfLines={largeText ? undefined : 1}>
          {name}
        </Text>
      </View>
    </Pressable>
  );
}

const BADGE_WIDTH = 30;
const BADGE_HEIGHT = 18;

export function PokemonRowSkeleton() {
  const styles = useStyles();
  return (
    <View style={styles.card}>
      <View style={styles.imageArea} aria-hidden />
      <View style={styles.info}>
        <Skeleton width={BADGE_WIDTH} height={BADGE_HEIGHT} />
        <Skeleton width="50%" height={fontSize.md} />
      </View>
    </View>
  );
}

export const ROW_HEIGHT = 80;

const useStyles = makeStyles((colors) => ({
  card: {
    minHeight: ROW_HEIGHT,
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    ...cardShadow(colors),
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
    paddingVertical: spacing.sm,
  },
  name: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.text,
  },
}));
