import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NumberBadge } from '@/components/number-badge';
import { RemoteImage } from '@/components/remote-image';
import { Skeleton } from '@/components/skeleton';
import { cardShadow, fontFamily, fontSize, iconSize, radius, spacing } from '@/constants/theme';
import { makeStyles, useTheme } from '@/hooks/use-theme';
import { useLargeText } from '@/hooks/use-large-text';
import { useTranslation } from '@/hooks/use-translation';
import { formatName, getSpriteUrl, type PokemonSummary } from '@/services/pokemon';

type Props = {
  pokemon: PokemonSummary;
  onPress: () => void;
  onMenuPress: () => void;
};

const MENU_ACTION = 'menu';

export function PokemonCard({ pokemon, onPress, onMenuPress }: Props) {
  const { colors } = useTheme();
  const styles = useStyles();
  const name = formatName(pokemon.name);
  const largeText = useLargeText();
  const { t } = useTranslation();
  const moreActions = t('pokemon.moreActions', { name });

  return (
    // VoiceOver reads the card as one element, so the ⋮ inside it is offered as an action (swipe up or down).
    <Pressable
      style={({ pressed }) => [styles.card, largeText && styles.stacked, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={t('pokemon.open', { name })}
      accessibilityActions={[{ name: MENU_ACTION, label: moreActions }]}
      onAccessibilityAction={(event) => {
        if (event.nativeEvent.actionName === MENU_ACTION) {
          onMenuPress();
        }
      }}
    >
      <View style={styles.imageArea}>
        <RemoteImage uri={getSpriteUrl(pokemon.id)} style={styles.sprite} />
        <View style={styles.badge}>
          <NumberBadge id={pokemon.id} />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.name} numberOfLines={largeText ? undefined : 1}>
          {name}
        </Text>
        <Pressable
          onPress={onMenuPress}
          hitSlop={spacing.sm}
          accessibilityRole="button"
          accessibilityLabel={moreActions}
        >
          <MaterialIcons name="more-vert" size={iconSize.md} color={colors.text} />
        </Pressable>
      </View>
    </Pressable>
  );
}

// Same size and layout as a card, shown while the list loads.
export function PokemonCardSkeleton() {
  const styles = useStyles();
  const largeText = useLargeText();
  return (
    <View style={[styles.card, largeText && styles.stacked]}>
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

const useStyles = makeStyles((colors) => ({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    ...cardShadow(colors),
  },
  // One card per row: sized by its content, flex: 1 would collapse it in a column.
  stacked: {
    flex: 0,
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
    minHeight: FOOTER_HEIGHT,
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
}));
