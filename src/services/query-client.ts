import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import Constants from 'expo-constants';
import Storage from 'expo-sqlite/kv-store';

// How long data loaded once stays usable offline, in memory and in the saved copy.
export const CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

// The one query client, provided in src/app/_layout.tsx.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      // Kept until saved: the default 5 min would drop inactive queries before they reach the phone's storage.
      gcTime: CACHE_MAX_AGE,
      // Offline, a request fails at once instead of pausing: the screen shows saved data, or the error state with Retry.
      networkMode: 'always',
    },
    mutations: {
      // Favourites are local (SQLite): they must not wait for the network.
      networkMode: 'always',
    },
  },
});

// The query cache saved on the phone (expo-sqlite kv-store, the same SQLite as favourites) and restored at start.
export const queryPersister = createAsyncStoragePersister({
  storage: Storage,
  key: 'pokedex-query-cache',
});

// A cache saved by another version of the app may not match its data shapes: it is dropped.
export const cacheBuster = Constants.expoConfig?.version ?? '';
