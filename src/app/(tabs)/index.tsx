import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorState } from '@/components/error-state';
import { PokemonGrid, PokemonGridSkeleton } from '@/components/pokemon-grid';
import { SearchField } from '@/components/search-field';
import { colors, fontFamily, fontSize, spacing } from '@/constants/theme';
import { usePokemonList } from '@/hooks/use-pokemon-list';

export default function HomeScreen() {
  const {
    pokemon,
    isPending,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = usePokemonList();

  const title = <Text style={styles.title}>All Pokémon</Text>;

  function renderContent() {
    if (isPending) {
      return <PokemonGridSkeleton ListHeaderComponent={title} />;
    }
    if (isError && pokemon.length === 0) {
      return <ErrorState message="Could not load the Pokémon." onRetry={() => refetch()} />;
    }
    return (
      <PokemonGrid
        pokemon={pokemon}
        ListHeaderComponent={title}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage && !isFetchNextPageError) {
            fetchNextPage();
          }
        }}
        ListFooterComponent={
          isFetchNextPageError ? (
            <ErrorState compact message="Could not load more." onRetry={() => fetchNextPage()} />
          ) : isFetchingNextPage ? (
            <PokemonGridSkeleton count={2} inset={false} />
          ) : undefined
        }
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.search}>
        <SearchField onPress={() => router.push('/search')} />
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
  title: {
    fontFamily: fontFamily.title,
    fontSize: fontSize.title,
    color: colors.text,
    marginTop: spacing.lg,
  },
});
