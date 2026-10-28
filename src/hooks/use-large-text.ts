import { useWindowDimensions } from 'react-native';

import { largeTextScale } from '@/constants/theme';

// True when the user picked a large system text size: grids and two-column rows switch to one column.
export function useLargeText() {
  return useWindowDimensions().fontScale >= largeTextScale;
}
