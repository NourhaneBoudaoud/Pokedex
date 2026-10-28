import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fontFamily, fontSize, spacing } from '@/constants/theme';

// Placeholder to check the theme and fonts on a phone. Replaced by the list in #2.
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>All Pokémon</Text>
      <Text style={styles.body}>Rubik Medium, theme loaded.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    fontFamily: fontFamily.title,
    fontSize: fontSize.title,
    color: colors.text,
  },
  body: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
});
