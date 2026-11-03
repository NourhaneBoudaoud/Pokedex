import { Text, View } from 'react-native';

import { fontFamily, fontSize, maxFontScale, radius, spacing } from '@/constants/theme';
import { makeStyles } from '@/hooks/use-theme';
import { formatNumber } from '@/services/pokemon';

type Props = {
  id: number;
};

// The purple "001" badge on cards and evolution cards.
export function NumberBadge({ id }: Props) {
  const styles = useStyles();
  return (
    <View style={styles.badge}>
      <Text style={styles.text} maxFontSizeMultiplier={maxFontScale.chip}>{formatNumber(id)}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
  },
  text: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.onPrimary,
  },
}));
