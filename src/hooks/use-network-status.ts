import { useNetworkState } from 'expo-network';

import { isOffline } from '@/services/network';

export function useNetworkStatus() {
  const state = useNetworkState();
  return { offline: isOffline(state) };
}
