import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NumberBadge } from '@/components/number-badge';
import { RemoteImage } from '@/components/remote-image';
import { Skeleton } from '@/components/skeleton';
import { colors, fontFamily, fontSize, iconSize, radius, shadow, spacing } from '@/constants/theme';
import { useLargeText } from '@/hooks/use-large-text';
import { formatName, getSpriteUrl, type PokemonSummary } from '@/services/pokemon';

type Props = {
  // Which side, for screen readers: both slots look the same.
  position: 'first' | 'second';
  // Undefined: nothing picked yet.
  pokemon: PokemonSummary | undefined;
  isPending: boolean;
  isError: boolean;
  onPress: () => void;
  onRetry: () => void;
};

const RETRY_ACTION = 'retry';

// One side of the comparison. Tap to pick or change the Pokémon.
export function CompareSlot({ position, pokemon, isPending, isError, onPress, onRetry }: Props) {
  const largeText = useLargeText();

  if (!pokemon) {
    return (
      <Pressable
        style={[styles.card, styles.empty, largeText && styles.stacked]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`Pick the ${position} Pokémon`}
      >
        <MaterialIcons name="add" size={iconSize.md} color={colors.primary} />
        <Text style={styles.emptyText}>Pick a Pokémon</Text>
      </Pressable>
    );
  }

  const name = formatName(pokemon.name);
  // The name is only known once the Pokémon has loaded.
  const label = isError
    ? `${capitalize(position)} Pokémon not loaded. Change it`
    : isPending
      ? `Loading the ${position} Pokémon. Change it`
      : `Change ${name}`;
  return (
    // VoiceOver reads the slot as one element, so the Retry inside it is offered as an action (swipe up or down).
    <Pressable
      style={({ pressed }) => [styles.card, largeText && styles.stacked, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityActions={isError ? [{ name: RETRY_ACTION, label: 'Retry' }] : undefined}
      onAccessibilityAction={(event) => {
        if (event.nativeEvent.actionName === RETRY_ACTION) {
          onRetry();
        }
      }}
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
          <Text style={styles.name} numberOfLines={largeText ? undefined : 1}>
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

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
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
  // Slots one under the other: sized by their content, flex: 1 would collapse them in a column.
  stacked: {
    flex: 0,
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
    minHeight: FOOTER_HEIGHT,
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
