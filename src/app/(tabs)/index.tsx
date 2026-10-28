import { router } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { showPokemonActions } from '@/components/pokemon-actions';
import { PokemonCard } from '@/components/pokemon-card';
import { SearchField } from '@/components/search-field';
import { colors, fontFamily, fontSize, spacing } from '@/constants/theme';
import { usePokemonList } from '@/hooks/use-pokemon-list';
import type { PokemonSummary } from '@/services/pokemon';

function openPokemon(pokemon: PokemonSummary) {
  router.push({ pathname: '/pokemon/[id]', params: { id: String(pokemon.id), name: pokemon.name } });
}

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
      <FlatList
        data={pokemon}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.title}>All Pokémon</Text>}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            onPress={() => openPokemon(item)}
            onMenuPress={() => showPokemonActions(item, { onOpen: () => openPokemon(item) })}
          />
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage && !isFetchNextPageError) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
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
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  row: {
    gap: spacing.md,
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
