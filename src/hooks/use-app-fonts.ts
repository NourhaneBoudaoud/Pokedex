import { useFonts } from 'expo-font';

import { fontFamily } from '@/constants/theme';

export function useAppFonts() {
  const [loaded, error] = useFonts({
    [fontFamily.regular]: require('@/assets/fonts/Rubik-Regular.ttf'),
    [fontFamily.medium]: require('@/assets/fonts/Rubik-Medium.ttf'),
    [fontFamily.title]: require('@/assets/fonts/CabinetGrotesk-Extrabold.otf'),
    [fontFamily.number]: require('@/assets/fonts/CabinetGrotesk-Regular.otf'),
  });

  return { loaded, error };
}
