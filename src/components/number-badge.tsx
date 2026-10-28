import { StyleSheet, Text, View } from 'react-native';

import { colors, fontFamily, fontSize, radius, spacing } from '@/constants/theme';
import { formatNumber } from '@/services/pokemon';

type Props = {
  id: number;
};

// The purple "001" badge on cards and evolution cards.
export function NumberBadge({ id }: Props) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{formatNumber(id)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
