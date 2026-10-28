import { router } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { PokemonGrid } from '@/components/pokemon-grid';
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

  function renderContent() {
    if (isPending) {
      return <LoadingState />;
    }
    if (isError && pokemon.length === 0) {
      return <ErrorState message="Could not load the Pokémon." onRetry={() => refetch()} />;
    }
    return (
      <PokemonGrid
        pokemon={pokemon}
        ListHeaderComponent={<Text style={styles.title}>All Pokémon</Text>}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage && !isFetchNextPageError) {
            fetchNextPage();
          }
        }}
        ListFooterComponent={
          isFetchNextPageError ? (
            <ErrorState compact message="Could not load more." onRetry={() => fetchNextPage()} />
          ) : isFetchingNextPage ? (
            <ActivityIndicator style={styles.footer} color={colors.primary} />
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
  footer: {
    paddingVertical: spacing.md,
  },
});
