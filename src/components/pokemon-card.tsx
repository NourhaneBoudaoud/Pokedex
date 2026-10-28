import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NumberBadge } from '@/components/number-badge';
import { RemoteImage } from '@/components/remote-image';
import { Skeleton } from '@/components/skeleton';
import { colors, fontFamily, fontSize, iconSize, radius, shadow, spacing } from '@/constants/theme';
import { formatName, getSpriteUrl, type PokemonSummary } from '@/services/pokemon';

type Props = {
  pokemon: PokemonSummary;
  onPress: () => void;
  onMenuPress: () => void;
};

export function PokemonCard({ pokemon, onPress, onMenuPress }: Props) {
  const name = formatName(pokemon.name);

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open ${name}`}
    >
      <View style={styles.imageArea}>
        <RemoteImage uri={getSpriteUrl(pokemon.id)} style={styles.sprite} />
        <View style={styles.badge}>
          <NumberBadge id={pokemon.id} />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Pressable
          onPress={onMenuPress}
          hitSlop={spacing.sm}
          accessibilityRole="button"
          accessibilityLabel={`More actions for ${name}`}
        >
          <MaterialIcons name="more-vert" size={iconSize.md} color={colors.text} />
        </Pressable>
      </View>
    </Pressable>
  );
}

// Same size and layout as a card, shown while the list loads.
export function PokemonCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.imageArea}>
        <Skeleton style={styles.imagePlaceholder} radius={radius.md} />
        <View style={styles.badge}>
          <Skeleton width={BADGE_WIDTH} height={BADGE_HEIGHT} />
        </View>
      </View>
      <View style={styles.footer}>
        <Skeleton width="60%" height={fontSize.md} />
      </View>
    </View>
  );
}

const FOOTER_HEIGHT = 48;
const BADGE_WIDTH = 30;
const BADGE_HEIGHT = 18;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    ...shadow,
  },
  pressed: {
    opacity: 0.8,
  },
  imageArea: {
    aspectRatio: 1,
    backgroundColor: colors.imageBackground,
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
    overflow: 'hidden',
  },
  sprite: {
    flex: 1,
  },
  // Same inset as the placeholder inside RemoteImage.
  imagePlaceholder: {
    ...StyleSheet.absoluteFill,
    margin: '20%',
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
  },
  footer: {
    height: FOOTER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing.ms,
    paddingRight: spacing.xs,
    gap: spacing.xs,
  },
  name: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.text,
  },
});
