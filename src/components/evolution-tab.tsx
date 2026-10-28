import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ErrorState } from '@/components/error-state';
import { PokemonRow, PokemonRowSkeleton, ROW_HEIGHT } from '@/components/pokemon-row';
import { colors, fontFamily, fontSize, spacing } from '@/constants/theme';
import type { PokemonSummary } from '@/services/pokemon';

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
    return <EvolutionSkeleton />;
  }
  if (chain.length <= 1) {
    return <Text style={styles.none}>This Pokémon does not evolve.</Text>;
  }

  return (
    <View>
      {chain.map((pokemon, index) => (
        <Fragment key={pokemon.id}>
          {index > 0 && <DottedLine />}
          <PokemonRow pokemon={pokemon} onPress={() => onOpen(pokemon)} actionLabel="Open" />
        </Fragment>
      ))}
    </View>
  );
}

const SKELETON_CARDS = [0, 1, 2];

function EvolutionSkeleton() {
  return (
    <View>
      {SKELETON_CARDS.map((card) => (
        <Fragment key={card}>
          {card > 0 && <DottedLine />}
          <PokemonRowSkeleton />
        </Fragment>
      ))}
    </View>
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

// Cards are 38 apart in the design.
const LINE_HEIGHT = 38;
const DOT_SIZE = 2;

const styles = StyleSheet.create({
  none: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  // Centred under the sprite area.
  line: {
    height: LINE_HEIGHT,
    width: ROW_HEIGHT,
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
