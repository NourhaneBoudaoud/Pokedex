import { StyleSheet, Text, View } from 'react-native';

import { colors, fontFamily, fontSize, spacing } from '@/constants/theme';
import { useLargeText } from '@/hooks/use-large-text';
import {
  formatHeight,
  formatLabel,
  formatName,
  formatNumber,
  formatWeight,
  type PokemonDetail,
} from '@/services/pokemon';

type Props = {
  pokemon: PokemonDetail;
};

export function AboutTab({ pokemon }: Props) {
  const largeText = useLargeText();
  const rows = [
    { label: 'Name', value: formatName(pokemon.name) },
    { label: 'ID', value: formatNumber(pokemon.id) },
    { label: 'Base', value: pokemon.baseExperience === null ? '–' : `${pokemon.baseExperience} XP` },
    { label: 'Weight', value: formatWeight(pokemon.weightHg) },
    { label: 'Height', value: formatHeight(pokemon.heightDm) },
    { label: 'Types', value: pokemon.types.map(formatName).join(', ') },
    { label: 'Abilities', value: pokemon.abilities.map(formatLabel).join(', ') },
  ];

  return (
    <View style={styles.container}>
      {rows.map((row) => (
        // Label above the value with a large text size: the label column is too narrow for it.
        <View key={row.label} style={[styles.row, largeText && styles.rowStacked]}>
          <Text style={[styles.label, largeText && styles.labelStacked]}>{row.label}</Text>
          <Text style={styles.value}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
}

// The design puts the values at x 140, 116 from the label.
const LABEL_WIDTH = 116;
const LINE_HEIGHT = 22;

const styles = StyleSheet.create({
  container: {
    gap: spacing.ms,
  },
  row: {
    flexDirection: 'row',
  },
  rowStacked: {
    flexDirection: 'column',
  },
  label: {
    width: LABEL_WIDTH,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    lineHeight: LINE_HEIGHT,
    color: colors.text,
  },
  labelStacked: {
    width: 'auto',
  },
  value: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    lineHeight: LINE_HEIGHT,
    color: colors.textSecondary,
  },
});
