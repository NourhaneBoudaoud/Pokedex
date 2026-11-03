import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider, type Theme } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';

import { OfflineBanner } from '@/components/offline-banner';
import { type ColorScheme, type Palette } from '@/constants/theme';
import { useAppFonts } from '@/hooks/use-app-fonts';
import { makeStyles, useTheme } from '@/hooks/use-theme';
import { connectOnlineManager } from '@/services/network';
import { CACHE_MAX_AGE, cacheBuster, queryClient, queryPersister } from '@/services/query-client';

SplashScreen.preventAutoHideAsync();
connectOnlineManager();

// React Navigation draws the screen and tab bar backgrounds itself (also during transitions): same palette.
function navigationTheme(scheme: ColorScheme, colors: Palette): Theme {
  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
  return {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.background,
      text: colors.text,
      border: colors.divider,
      notification: colors.favorite,
    },
  };
}

export default function RootLayout() {
  const { scheme, colors } = useTheme();
  const styles = useStyles();
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
      <ThemeProvider value={navigationTheme(scheme, colors)}>
        {/* Dark icons on a light screen, light icons on a dark one. */}
        <StatusBar style="auto" />
        <View style={styles.container}>
          <OfflineBanner />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.background },
            }}
          />
        </View>
      </ThemeProvider>
    </PersistQueryClientProvider>
  );
}

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
}));
