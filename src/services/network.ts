import { onlineManager } from '@tanstack/react-query';
import { addNetworkStateListener, type NetworkState } from 'expo-network';

// Offline only when the phone says so: an unknown state (still loading) counts as online.
export function isOffline(state: Pick<NetworkState, 'isConnected' | 'isInternetReachable'>): boolean {
  return state.isConnected === false || state.isInternetReachable === false;
}

// Tells TanStack Query when the network comes back, so queries that failed offline load again.
export function connectOnlineManager() {
  onlineManager.setEventListener((setOnline) => {
    const subscription = addNetworkStateListener((state) => setOnline(!isOffline(state)));
    return () => subscription.remove();
  });
}
