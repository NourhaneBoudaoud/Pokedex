import { Text, View } from 'react-native';

import { fontFamily, fontSize, getTypeColor, maxFontScale, radius, spacing } from '@/constants/theme';
import { makeStyles, useTheme } from '@/hooks/use-theme';
import { formatName } from '@/services/pokemon';

type Props = {
  // PokeAPI type name: "grass", "fire", ...
  type: string;
};

export function TypePill({ type }: Props) {
  const { colors } = useTheme();
  const styles = useStyles();
  const name = formatName(type);
  return (
    <View style={styles.pill} accessible accessibilityLabel={`Type: ${name}`}>
      <View style={[styles.dot, { backgroundColor: getTypeColor(type, colors) }]} aria-hidden />
      <Text style={styles.label} maxFontSizeMultiplier={maxFontScale.chip}>
        {name}
      </Text>
    </View>
  );
}

const PILL_HEIGHT = 32;
const DOT_SIZE = 8;

const useStyles = makeStyles((colors) => ({
  pill: {
    height: PILL_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.ms,
    backgroundColor: colors.chip,
    borderRadius: radius.pill,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.text,
  },
}));
