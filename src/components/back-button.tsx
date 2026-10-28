import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { Pressable } from 'react-native';

import { colors, iconSize, spacing } from '@/constants/theme';

export function BackButton() {
  return (
    <Pressable
      onPress={() => router.back()}
      hitSlop={spacing.sm}
      accessibilityRole="button"
      accessibilityLabel="Back"
    >
      <MaterialIcons name="arrow-back" size={iconSize.md} color={colors.text} />
    </Pressable>
  );
}
