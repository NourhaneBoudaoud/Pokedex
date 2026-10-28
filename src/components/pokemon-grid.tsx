import type { ReactElement } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { openCompare, openPokemon } from '@/components/open-pokemon';
import { showPokemonActions } from '@/components/pokemon-actions';
import { PokemonCard, PokemonCardSkeleton } from '@/components/pokemon-card';
import { spacing } from '@/constants/theme';
import type { PokemonSummary } from '@/services/pokemon';

type Props = {
  pokemon: PokemonSummary[];
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (pokemon: PokemonSummary) => void;
  ListHeaderComponent?: ReactElement;
  ListFooterComponent?: ReactElement;
  ListEmptyComponent?: ReactElement;
  onEndReached?: () => void;
};

// Two columns of cards. A tap opens the detail, ⋮ opens the card menu (open, favourite, compare, share).
export function PokemonGrid({
  pokemon,
  isFavorite,
  onToggleFavorite,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  onEndReached,
}: Props) {
  return (
    <FlatList
      data={pokemon}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={[styles.list, pokemon.length === 0 && styles.empty]}
      renderItem={({ item }) => (
        <PokemonCard
          pokemon={item}
          onPress={() => openPokemon(item)}
          onMenuPress={() =>
            showPokemonActions(item, {
              onOpen: () => openPokemon(item),
              isFavorite: isFavorite(item.id),
              onToggleFavorite: () => onToggleFavorite(item),
              onCompare: () => openCompare(item),
            })
          }
        />
      )}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  // Lets ListEmptyComponent fill the screen so its message can be centred.
  empty: {
    flexGrow: 1,
  },
  row: {
    gap: spacing.md,
  },
  skeleton: {
    gap: spacing.md,
  },
  skeletonRow: {
    flexDirection: 'row',
  },
});

const SKELETON_CARDS = 6;

type SkeletonProps = {
  ListHeaderComponent?: ReactElement;
  // 6 fill the first screen; 2 make one row at the end of a list.
  count?: number;
  // False when the skeleton sits inside a grid that already has the side margins.
  inset?: boolean;
};

// The grid while it loads: placeholder cards in the same two columns. Plain views, not a list, so it can sit
// inside a list footer.
export function PokemonGridSkeleton({ ListHeaderComponent, count = SKELETON_CARDS, inset = true }: SkeletonProps) {
  const rows = Array.from({ length: Math.ceil(count / 2) }, (_, index) => index);
  return (
    <View style={[styles.skeleton, inset && styles.list]}>
      {ListHeaderComponent}
      {rows.map((row) => (
        <View key={row} style={[styles.row, styles.skeletonRow]}>
          <PokemonCardSkeleton />
          <PokemonCardSkeleton />
        </View>
      ))}
    </View>
  );
}
