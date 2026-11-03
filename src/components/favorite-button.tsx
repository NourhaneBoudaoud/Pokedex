import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { iconSize, spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from '@/hooks/use-translation';

type Props = {
  // Display name, for the screen reader label. Empty while the Pokémon loads.
  name: string;
  favorite: boolean;
  disabled?: boolean;
  onPress: () => void;
};

// A fast grow, then a bouncy spring back: a spring on the way up is too slow to read as a pop.
const POP_SCALE = 1.6;
const POP_UP_MS = 100;
const POP_SPRING = { damping: 10, stiffness: 400 } as const;

// The heart of the detail bar. Adding a favourite makes it pop, so the user sees the tap worked.
export function FavoriteButton({ name, favorite, disabled, onPress }: Props) {
  const { colors } = useTheme();
  const reduceMotion = useReducedMotion();
  const { t } = useTranslation();
  const label = t(favorite ? 'favorite.remove' : 'favorite.add', { name: name || t('favorite.thisPokemon') });
  const scale = useSharedValue(1);
  const popStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.get() }] }));

  function press() {
    onPress();
    // Started by the tap, not by `favorite` changing: no pop when the screen opens on a favourite.
    if (!favorite && !reduceMotion) {
      scale.set(withSequence(withTiming(POP_SCALE, { duration: POP_UP_MS }), withSpring(1, POP_SPRING)));
    }
  }

  return (
    <Pressable
      onPress={press}
      disabled={disabled}
      hitSlop={spacing.sm}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: favorite, disabled }}
    >
      <Animated.View style={popStyle}>
        <MaterialIcons
          name={favorite ? 'favorite' : 'favorite-border'}
          size={iconSize.md}
          color={favorite ? colors.favorite : colors.text}
        />
      </Animated.View>
    </Pressable>
  );
}
