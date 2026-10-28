import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '@/components/back-button';
import { colors, fontFamily, fontSize, spacing } from '@/constants/theme';
import { formatName } from '@/services/pokemon';

// Placeholder so a card opens something. Built in #4.
export default function PokemonDetailScreen() {
  const { name = '' } = useLocalSearchParams<{ id: string; name?: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <Text style={styles.name}>{formatName(name)}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.lg,
  },
  name: {
    fontFamily: fontFamily.title,
    fontSize: fontSize.name,
    color: colors.text,
  },
});
