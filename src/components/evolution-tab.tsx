import { Image } from 'expo-image';
import { Fragment } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { NumberBadge } from '@/components/number-badge';
import { colors, fontFamily, fontSize, radius, shadow, spacing } from '@/constants/theme';
import { formatName, getSpriteUrl, type PokemonSummary } from '@/services/pokemon';

type Props = {
  chain: PokemonSummary[] | undefined;
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
  onOpen: (pokemon: PokemonSummary) => void;
};

export function EvolutionTab({ chain, isPending, isError, onRetry, onOpen }: Props) {
  if (isError) {
    return <ErrorState message="Could not load the evolution chain." onRetry={onRetry} />;
  }
  if (isPending || !chain) {
    return <LoadingState />;
  }
  if (chain.length <= 1) {
    return <Text style={styles.none}>This Pokémon does not evolve.</Text>;
  }

  return (
    <View>
      {chain.map((pokemon, index) => (
        <Fragment key={pokemon.id}>
          {index > 0 && <DottedLine />}
          <EvolutionCard pokemon={pokemon} onPress={() => onOpen(pokemon)} />
        </Fragment>
      ))}
    </View>
  );
}

function EvolutionCard({ pokemon, onPress }: { pokemon: PokemonSummary; onPress: () => void }) {
  const name = formatName(pokemon.name);
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open ${name}`}
    >
      <View style={styles.imageArea}>
        <Image source={getSpriteUrl(pokemon.id)} style={styles.sprite} contentFit="contain" />
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

const DOTS = [0, 1, 2];

function DottedLine() {
  return (
    <View style={styles.line}>
      {DOTS.map((dot) => (
        <View key={dot} style={styles.dot} />
      ))}
    </View>
  );
}

const CARD_HEIGHT = 80;
// Cards are 38 apart in the design.
const LINE_HEIGHT = 38;
const DOT_SIZE = 2;

const styles = StyleSheet.create({
  none: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  card: {
    height: CARD_HEIGHT,
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    ...shadow,
  },
  pressed: {
    opacity: 0.8,
  },
  imageArea: {
    width: CARD_HEIGHT,
    height: CARD_HEIGHT,
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
  // Centred under the sprite area.
  line: {
    height: LINE_HEIGHT,
    width: CARD_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: colors.textFaint,
  },
});
