import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { Pressable, Text } from 'react-native';

import { fontFamily, fontSize, iconSize, spacing } from '@/constants/theme';
import { makeStyles, useTheme } from '@/hooks/use-theme';
import { useTranslation } from '@/hooks/use-translation';

type Props = {
  // With the "Back" label: the iOS chevron and text from the detail design. Without: the plain arrow of the
  // search field.
  withLabel?: boolean;
  // Defaults to going back one screen.
  onPress?: () => void;
};

export function BackButton({ withLabel = false, onPress = () => router.back() }: Props) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const label = t('common.back');
  const styles = useStyles();
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      hitSlop={spacing.sm}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <MaterialIcons
        name={withLabel ? 'arrow-back-ios' : 'arrow-back'}
        size={withLabel ? iconSize.sm : iconSize.md}
        color={colors.text}
      />
      {withLabel && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
}

const useStyles = makeStyles((colors) => ({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    color: colors.text,
  },
}));
