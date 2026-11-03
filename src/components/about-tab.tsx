import { Text, View } from 'react-native';

import { fontFamily, fontSize, spacing } from '@/constants/theme';
import { makeStyles } from '@/hooks/use-theme';
import { useLargeText } from '@/hooks/use-large-text';
import { useTranslation } from '@/hooks/use-translation';
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
  const styles = useStyles();
  const largeText = useLargeText();
  const { t, typeName, decimalSeparator } = useTranslation();
  // Name and abilities stay as PokeAPI gives them; the types are translated.
  const rows = [
    { label: t('about.name'), value: formatName(pokemon.name) },
    { label: t('about.id'), value: formatNumber(pokemon.id) },
    {
      label: t('about.base'),
      value: pokemon.baseExperience === null ? '–' : t('about.baseValue', { value: pokemon.baseExperience }),
    },
    { label: t('about.weight'), value: formatWeight(pokemon.weightHg, decimalSeparator) },
    { label: t('about.height'), value: formatHeight(pokemon.heightDm, decimalSeparator) },
    { label: t('about.types'), value: pokemon.types.map(typeName).join(', ') },
    { label: t('about.abilities'), value: pokemon.abilities.map(formatLabel).join(', ') },
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

const useStyles = makeStyles((colors) => ({
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
}));
