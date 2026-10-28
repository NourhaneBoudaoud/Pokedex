import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '@/components/back-button';
import { colors, spacing } from '@/constants/theme';

// Placeholder so the search field opens something. Built in #3.
export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
});
