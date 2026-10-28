import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { OfflineBanner } from '@/components/offline-banner';
import { colors } from '@/constants/theme';
import { useAppFonts } from '@/hooks/use-app-fonts';
import { connectOnlineManager } from '@/services/network';
import { CACHE_MAX_AGE, cacheBuster, queryClient, queryPersister } from '@/services/query-client';

SplashScreen.preventAutoHideAsync();
connectOnlineManager();

export default function RootLayout() {
  const { loaded, error } = useAppFonts();
  // A font that fails to load falls back to the system font instead of keeping the splash forever.
  const ready = loaded || error !== null;

  useEffect(() => {
    if (ready) {
      SplashScreen.hide();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    // The cache is saved on the phone and restored at start, so data already seen is there offline.
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: queryPersister, maxAge: CACHE_MAX_AGE, buster: cacheBuster }}
    >
      <View style={styles.container}>
        <OfflineBanner />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        />
      </View>
    </PersistQueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
