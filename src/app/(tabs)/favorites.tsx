import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorState } from '@/components/error-state';
import { PokemonGrid, PokemonGridSkeleton } from '@/components/pokemon-grid';
import { colors, fontFamily, fontSize, iconSize, maxFontScale, spacing } from '@/constants/theme';
import { useFavorites, useToggleFavorite } from '@/hooks/use-favorites';

export default function FavoritesScreen() {
  const { favorites, isFavorite, isPending, isError, refetch } = useFavorites();
  const toggleFavorite = useToggleFavorite();

  const title = <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={maxFontScale.title}>
      My favorites
    </Text>;

  function renderContent() {
    if (isPending) {
      return <PokemonGridSkeleton ListHeaderComponent={title} count={4} />;
    }
    if (isError) {
      return <ErrorState message="Could not load your favorites." onRetry={() => refetch()} />;
    }
    return (
      <PokemonGrid
        pokemon={favorites}
        isFavorite={isFavorite}
        onToggleFavorite={(item) => toggleFavorite.mutate({ pokemon: item, favorite: isFavorite(item.id) })}
        ListHeaderComponent={title}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="favorite-border" size={iconSize.md} color={colors.textMuted} aria-hidden />
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptyText}>Tap the heart on a Pokémon to keep it here.</Text>
          </View>
        }
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontFamily: fontFamily.title,
    fontSize: fontSize.title,
    color: colors.text,
    marginTop: spacing.lg,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
  },
  emptyTitle: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.text,
  },
  emptyText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
