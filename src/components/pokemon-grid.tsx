import type { ReactElement } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { openPokemon } from '@/components/open-pokemon';
import { showPokemonActions } from '@/components/pokemon-actions';
import { PokemonCard } from '@/components/pokemon-card';
import { spacing } from '@/constants/theme';
import type { PokemonSummary } from '@/services/pokemon';

type Props = {
  pokemon: PokemonSummary[];
  ListHeaderComponent?: ReactElement;
  ListFooterComponent?: ReactElement;
  ListEmptyComponent?: ReactElement;
  onEndReached?: () => void;
};

// Two columns of cards. A tap opens the detail, ⋮ opens the card menu.
export function PokemonGrid({
  pokemon,
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
          onMenuPress={() => showPokemonActions(item, { onOpen: () => openPokemon(item) })}
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
});
