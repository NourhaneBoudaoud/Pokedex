import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '@/components/back-button';
import { ComparePicker } from '@/components/compare-picker';
import { CompareSlot } from '@/components/compare-slot';
import { CompareStats, CompareStatsSkeleton } from '@/components/compare-stats';
import { ErrorState } from '@/components/error-state';
import { colors, fontFamily, fontSize, maxFontScale, radius, shadow, spacing } from '@/constants/theme';
import { useLargeText } from '@/hooks/use-large-text';
import { usePokemonDetail } from '@/hooks/use-pokemon-detail';
import { usePokemonSearch } from '@/hooks/use-pokemon-search';
import { compareStats } from '@/services/compare';
import type { PokemonSummary } from '@/services/pokemon';

type Side = 'left' | 'right';

const BAR_HEIGHT = 48;

function parseId(value: string | undefined): number | undefined {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : undefined;
}

export default function CompareScreen() {
  const params = useLocalSearchParams<{ left?: string }>();
  const [leftId, setLeftId] = useState(parseId(params.left));
  const [rightId, setRightId] = useState<number | undefined>(undefined);
  const [picking, setPicking] = useState<Side | null>(null);
  const [text, setText] = useState('');

  // Same hooks and cache as the detail and search screens: no new request for a Pokémon already seen.
  const left = usePokemonDetail(leftId ?? 0);
  const right = usePokemonDetail(rightId ?? 0);
  const search = usePokemonSearch(text);
  const largeText = useLargeText();

  function pick(pokemon: PokemonSummary) {
    if (picking === 'left') {
      setLeftId(pokemon.id);
    } else {
      setRightId(pokemon.id);
    }
    setPicking(null);
    setText('');
  }

  function closePicker() {
    setPicking(null);
    setText('');
  }

  if (picking) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ComparePicker
          text={text}
          onChangeText={setText}
          results={search.results}
          isPending={search.isPending}
          isError={search.isError}
          onRetry={() => search.refetch()}
          onPick={pick}
          onBack={closePicker}
        />
      </SafeAreaView>
    );
  }

  function slotPokemon(id: number | undefined, name: string | undefined): PokemonSummary | undefined {
    return id === undefined ? undefined : { id, name: name ?? '' };
  }

  function renderStats() {
    if (leftId === undefined || rightId === undefined) {
      return (
        <Text style={styles.hint}>
          {leftId === undefined && rightId === undefined ? 'Pick two Pokémon to compare' : 'Pick a second Pokémon'}
        </Text>
      );
    }
    if (left.isError || right.isError) {
      return (
        <ErrorState
          compact
          message="Could not load the stats."
          onRetry={() => {
            if (left.isError) left.refetch();
            if (right.isError) right.refetch();
          }}
        />
      );
    }
    if (!left.data || !right.data) {
      return <CompareStatsSkeleton />;
    }
    const { rows, total } = compareStats(left.data.stats, right.data.stats);
    return <CompareStats rows={rows} total={total} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.bar}>
        <BackButton label="Back" />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={maxFontScale.title}>
          Compare
        </Text>
        {/* One under the other with a large text size, so each name has the full width. */}
        <View style={[styles.slots, largeText && styles.slotsStacked]}>
          <CompareSlot
            position="first"
            pokemon={slotPokemon(leftId, left.data?.name)}
            isPending={left.isPending}
            isError={left.isError}
            onPress={() => setPicking('left')}
            onRetry={() => left.refetch()}
          />
          <CompareSlot
            position="second"
            pokemon={slotPokemon(rightId, right.data?.name)}
            isPending={right.isPending}
            isError={right.isError}
            onPress={() => setPicking('right')}
            onRetry={() => right.refetch()}
          />
        </View>
        <View style={styles.stats}>{renderStats()}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bar: {
    minHeight: BAR_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  title: {
    fontFamily: fontFamily.title,
    fontSize: fontSize.title,
    color: colors.text,
  },
  slots: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  slotsStacked: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  stats: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    ...shadow,
  },
  hint: {
    textAlign: 'center',
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    paddingVertical: spacing.lg,
  },
});
