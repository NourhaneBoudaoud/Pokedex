import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fontFamily, fontSize, spacing } from '@/constants/theme';

// Placeholder so the tab exists. Built in #5.
export default function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>My favorites</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontFamily: fontFamily.title,
    fontSize: fontSize.title,
    color: colors.text,
    marginTop: spacing.lg,
  },
});
