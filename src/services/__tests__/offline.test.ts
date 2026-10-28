import { QueryClient } from '@tanstack/react-query';
import { persistQueryClientRestore, persistQueryClientSave } from '@tanstack/react-query-persist-client';

import { isOffline } from '@/services/network';
import { CACHE_MAX_AGE, queryClient, queryPersister } from '@/services/query-client';

// expo-sqlite's kv-store needs the phone: an in-memory copy with the same async API.
const mockStore = new Map<string, string>();

jest.mock('expo-sqlite/kv-store', () => ({
  __esModule: true,
  default: {
    getItem: (key: string) => Promise.resolve(mockStore.get(key) ?? null),
    setItem: (key: string, value: string) => Promise.resolve(void mockStore.set(key, value)),
    removeItem: (key: string) => Promise.resolve(void mockStore.delete(key)),
  },
}));

const BULBASAUR = { id: 1, name: 'bulbasaur', types: ['grass', 'poison'] };

beforeEach(() => {
  mockStore.clear();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

// Restores the saved cache into a fresh client, as after a restart.
async function restore(buster: string) {
  const client = new QueryClient();
  await persistQueryClientRestore({ queryClient: client, persister: queryPersister, maxAge: CACHE_MAX_AGE, buster });
  return client;
}

describe('isOffline', () => {
  it('is offline when the phone has no connection', () => {
    expect(isOffline({ isConnected: false, isInternetReachable: false })).toBe(true);
  });

  it('is offline when connected but the internet cannot be reached', () => {
    expect(isOffline({ isConnected: true, isInternetReachable: false })).toBe(true);
  });

  it('is online when connected', () => {
    expect(isOffline({ isConnected: true, isInternetReachable: true })).toBe(false);
  });

  it('counts an unknown state as online, so the banner does not flash at start', () => {
    expect(isOffline({ isConnected: undefined, isInternetReachable: undefined })).toBe(false);
  });
});

describe('saved query cache', () => {
  // One test: the persister throttles its writes with a clock of its own, which fake timers reset between tests.
  it('restores the data saved before a restart, unless another version of the app saved it', async () => {
    const before = new QueryClient();
    before.setQueryData(['pokemon', 'detail', 1], BULBASAUR);
    await persistQueryClientSave({ queryClient: before, persister: queryPersister, buster: '1.0.0' });
    await jest.runAllTimersAsync();

    expect((await restore('1.0.0')).getQueryData(['pokemon', 'detail', 1])).toEqual(BULBASAUR);
    expect((await restore('2.0.0')).getQueryData(['pokemon', 'detail', 1])).toBeUndefined();
    // The outdated copy is removed from the phone.
    expect(mockStore.size).toBe(0);
  });

  it('keeps queries long enough to be saved, and does not wait for the network', () => {
    const { queries, mutations } = queryClient.getDefaultOptions();
    expect(queries?.gcTime).toBe(CACHE_MAX_AGE);
    expect(queries?.networkMode).toBe('always');
    expect(mutations?.networkMode).toBe('always');
  });
});
