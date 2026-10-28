import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorState } from '@/components/error-state';
import { PokemonGrid, PokemonGridSkeleton } from '@/components/pokemon-grid';
import { SearchInput } from '@/components/search-field';
import { colors, fontFamily, fontSize, spacing } from '@/constants/theme';
import { useFavorites, useToggleFavorite } from '@/hooks/use-favorites';
import { usePokemonSearch } from '@/hooks/use-pokemon-search';

export default function SearchScreen() {
  const [text, setText] = useState('');
  const { results, data, isPending, isError, refetch } = usePokemonSearch(text);
  const { isFavorite } = useFavorites();
  const toggleFavorite = useToggleFavorite();

  function renderContent() {
    if (isPending) {
      return <PokemonGridSkeleton ListHeaderComponent={<View style={styles.header} />} />;
    }
    if (isError && !data) {
      return <ErrorState message="Could not load the Pokémon names." onRetry={() => refetch()} />;
    }
    const message =
      text.trim() === '' ? 'Start typing to find a Pokémon' : `No Pokémon found for "${text.trim()}"`;
    return (
      <PokemonGrid
        isFavorite={isFavorite}
        onToggleFavorite={(item) => toggleFavorite.mutate({ pokemon: item, favorite: isFavorite(item.id) })}
        pokemon={results}
        ListHeaderComponent={<View style={styles.header} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>{message}</Text>
          </View>
        }
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.search}>
        <SearchInput value={text} onChangeText={setText} />
      </View>
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  search: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  // The design puts the first row of results 32 below the field; the grid gap adds 16.
  header: {
    height: spacing.md,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  emptyText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
