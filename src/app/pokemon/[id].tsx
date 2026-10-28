import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AboutTab } from '@/components/about-tab';
import { BackButton } from '@/components/back-button';
import { DetailTabs, type DetailTab } from '@/components/detail-tabs';
import { ErrorState } from '@/components/error-state';
import { EvolutionTab } from '@/components/evolution-tab';
import { LoadingState } from '@/components/loading-state';
import { openPokemon } from '@/components/open-pokemon';
import { StatsTab } from '@/components/stats-tab';
import { TypePill } from '@/components/type-pill';
import { colors, fontFamily, fontSize, iconSize, spacing } from '@/constants/theme';
import { useEvolutionChain } from '@/hooks/use-evolution-chain';
import { usePokemonDetail } from '@/hooks/use-pokemon-detail';
import { formatName, formatNumber } from '@/services/pokemon';

const ARTWORK_SIZE = 200;
// How far the artwork reaches into the white body below the header.
const ARTWORK_OVERLAP = 50;
const BAR_HEIGHT = 48;
// The compact name fades in while the big name scrolls under the bar.
const FADE_START = 24;
const FADE_END = 64;

export default function PokemonDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = Number(params.id);
  const { data: pokemon, isPending, isError, refetch } = usePokemonDetail(id);

  const [tab, setTab] = useState<DetailTab>('About');
  // Stays true once the Evolution tab has been opened, so the chain is fetched once and kept.
  const [evolutionOpened, setEvolutionOpened] = useState(false);
  const evolution = useEvolutionChain(pokemon?.speciesId, evolutionOpened);

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const compactNameStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [FADE_START, FADE_END], [0, 1], Extrapolation.CLAMP),
  }));

  function changeTab(next: DetailTab) {
    setTab(next);
    if (next === 'Evolution') {
      setEvolutionOpened(true);
    }
  }

  function renderBody() {
    if (isError || !Number.isInteger(id)) {
      return <ErrorState message="Could not load this Pokémon." onRetry={() => refetch()} />;
    }
    if (isPending) {
      return <LoadingState />;
    }

    const name = formatName(pokemon.name);
    return (
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        stickyHeaderIndices={[2]}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.number}>#{formatNumber(pokemon.id)}</Text>
          </View>
          <View style={styles.types}>
            {pokemon.types.map((type) => (
              <TypePill key={type} type={type} />
            ))}
          </View>
          <View style={styles.artworkSpace}>
            {pokemon.artworkUrl && (
              <Image
                source={pokemon.artworkUrl}
                style={styles.artwork}
                contentFit="contain"
                accessibilityLabel={`${name} artwork`}
              />
            )}
          </View>
        </View>
        <View style={styles.overlapSpace} />
        <DetailTabs active={tab} onChange={changeTab} />
        <View style={styles.tabContent}>
          {tab === 'About' && <AboutTab pokemon={pokemon} />}
          {tab === 'Stats' && <StatsTab stats={pokemon.stats} />}
          {tab === 'Evolution' && (
            <EvolutionTab
              chain={evolution.data}
              isPending={evolution.isPending}
              isError={evolution.isError}
              onRetry={() => evolution.refetch()}
              onOpen={openPokemon}
            />
          )}
        </View>
      </Animated.ScrollView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.bar}>
        <BackButton label="Back" />
        <Animated.Text style={[styles.compactName, compactNameStyle]} numberOfLines={1}>
          {pokemon ? formatName(pokemon.name) : ''}
        </Animated.Text>
        {/* Favourites come in #5: shown, not active yet. */}
        <MaterialIcons name="favorite-border" size={iconSize.md} color={colors.text} />
      </View>
      {renderBody()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bar: {
    height: BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
    zIndex: 1,
  },
  compactName: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.text,
    // Taps go to the back button and the heart underneath.
    pointerEvents: 'none',
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: colors.surface,
  },
  header: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    // Draws the artwork over the white space below.
    zIndex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  name: {
    flexShrink: 1,
    fontFamily: fontFamily.title,
    fontSize: fontSize.name,
    color: colors.text,
  },
  number: {
    fontFamily: fontFamily.number,
    fontSize: fontSize.title,
    color: colors.textFaint,
  },
  types: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  artworkSpace: {
    height: ARTWORK_SIZE - ARTWORK_OVERLAP + spacing.lg,
    alignItems: 'center',
  },
  artwork: {
    position: 'absolute',
    top: spacing.lg,
    width: ARTWORK_SIZE,
    height: ARTWORK_SIZE,
  },
  overlapSpace: {
    height: ARTWORK_OVERLAP,
  },
  tabContent: {
    flexGrow: 1,
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
});
