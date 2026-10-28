import { FlatList, StyleSheet, Text, View } from 'react-native';

import { ErrorState } from '@/components/error-state';
import { PokemonRow, PokemonRowSkeleton } from '@/components/pokemon-row';
import { SearchInput } from '@/components/search-field';
import { loadingProps } from '@/components/skeleton';
import { colors, fontFamily, fontSize, spacing } from '@/constants/theme';
import type { PokemonSummary } from '@/services/pokemon';

type Props = {
  text: string;
  onChangeText: (text: string) => void;
  results: PokemonSummary[];
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
  onPick: (pokemon: PokemonSummary) => void;
  onBack: () => void;
};

const SKELETON_ROWS = [0, 1, 2, 3];

// Search and pick a Pokémon for one side of the comparison. Same field and filter as the search screen.
export function ComparePicker({ text, onChangeText, results, isPending, isError, onRetry, onPick, onBack }: Props) {
  function renderResults() {
    if (isPending) {
      return (
        <View style={styles.list} {...loadingProps}>
          {SKELETON_ROWS.map((row) => (
            <PokemonRowSkeleton key={row} />
          ))}
        </View>
      );
    }
    if (isError) {
      return <ErrorState message="Could not load the Pokémon names." onRetry={onRetry} />;
    }
    const message =
      text.trim() === '' ? 'Type a name to pick a Pokémon' : `No Pokémon found for "${text.trim()}"`;
    return (
      <FlatList
        data={results}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <PokemonRow pokemon={item} onPress={() => onPick(item)} actionLabel="Pick" />}
        contentContainerStyle={[styles.list, results.length === 0 && styles.listEmpty]}
        ListEmptyComponent={<Text style={styles.empty}>{message}</Text>}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <SearchInput value={text} onChangeText={onChangeText} onBack={onBack} />
      </View>
      {renderResults()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  list: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  listEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  empty: {
    textAlign: 'center',
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
});
