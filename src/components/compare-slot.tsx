import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NumberBadge } from '@/components/number-badge';
import { RemoteImage } from '@/components/remote-image';
import { Skeleton } from '@/components/skeleton';
import { colors, fontFamily, fontSize, iconSize, radius, shadow, spacing } from '@/constants/theme';
import { formatName, getSpriteUrl, type PokemonSummary } from '@/services/pokemon';

type Props = {
  // Undefined: nothing picked yet.
  pokemon: PokemonSummary | undefined;
  isPending: boolean;
  isError: boolean;
  onPress: () => void;
  onRetry: () => void;
};

// One side of the comparison. Tap to pick or change the Pokémon.
export function CompareSlot({ pokemon, isPending, isError, onPress, onRetry }: Props) {
  if (!pokemon) {
    return (
      <Pressable
        style={[styles.card, styles.empty]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Pick a Pokémon"
      >
        <MaterialIcons name="add" size={iconSize.md} color={colors.primary} />
        <Text style={styles.emptyText}>Pick a Pokémon</Text>
      </Pressable>
    );
  }

  const name = formatName(pokemon.name);
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Change ${name}`}
    >
      <View style={styles.imageArea}>
        <RemoteImage uri={getSpriteUrl(pokemon.id)} style={styles.sprite} />
        <View style={styles.badge}>
          <NumberBadge id={pokemon.id} />
        </View>
      </View>
      <View style={styles.footer}>
        {isError ? (
          <Text style={styles.failed} numberOfLines={1}>
            Not loaded
          </Text>
        ) : isPending ? (
          <Skeleton width="60%" height={fontSize.md} />
        ) : (
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
        )}
        {isError ? (
          <Pressable onPress={onRetry} hitSlop={spacing.sm} accessibilityRole="button" accessibilityLabel="Retry">
            <Text style={styles.retry}>Retry</Text>
          </Pressable>
        ) : (
          <Text style={styles.change}>Change</Text>
        )}
      </View>
    </Pressable>
  );
}

const FOOTER_HEIGHT = 48;
const EMPTY_BORDER = 1.5;
// Same proportions as a list card (163 × 211), so both slots line up when one is empty.
const CARD_RATIO = 163 / 211;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    ...shadow,
  },
  pressed: {
    opacity: 0.8,
  },
  empty: {
    aspectRatio: CARD_RATIO,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderWidth: EMPTY_BORDER,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    backgroundColor: colors.imageBackground,
  },
  emptyText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.primary,
  },
  imageArea: {
    aspectRatio: 1,
    backgroundColor: colors.imageBackground,
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
    overflow: 'hidden',
  },
  sprite: {
    flex: 1,
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
  },
  footer: {
    height: FOOTER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
    paddingHorizontal: spacing.ms,
  },
  name: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.text,
  },
  failed: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  change: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  retry: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.primary,
  },
});
