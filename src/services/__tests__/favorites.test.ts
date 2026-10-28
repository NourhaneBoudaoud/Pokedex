import { addFavorite, getFavorites, removeFavorite } from '@/services/favorites';

// The real database needs the phone. Only the two methods the service calls are faked.
const mockGetAllAsync = jest.fn();
const mockRunAsync = jest.fn();

jest.mock('@/services/database', () => ({
  getDatabase: () => Promise.resolve({ getAllAsync: mockGetAllAsync, runAsync: mockRunAsync }),
}));

// For the real getDatabase below: expo-sqlite is faked, the file on the phone is what keeps favourites across launches.
const mockOpenDatabaseAsync = jest.fn();
const mockGetFirstAsync = jest.fn();
const mockExecAsync = jest.fn();

jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: (name: string) => mockOpenDatabaseAsync(name),
}));

// A fresh copy of the real module, so each test starts with no open connection.
function loadRealGetDatabase() {
  let getDatabase: typeof import('@/services/database').getDatabase = () => Promise.reject(new Error('not loaded'));
  jest.isolateModules(() => {
    getDatabase = jest.requireActual<typeof import('@/services/database')>('@/services/database').getDatabase;
  });
  return getDatabase;
}

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('getFavorites', () => {
  it('reads the favourites, newest first', async () => {
    mockGetAllAsync.mockResolvedValueOnce([{ id: 25, name: 'pikachu' }]);

    const favorites = await getFavorites();

    expect(mockGetAllAsync).toHaveBeenCalledWith('SELECT id, name FROM favorites ORDER BY created_at DESC');
    expect(favorites).toEqual([{ id: 25, name: 'pikachu' }]);
  });
});

describe('addFavorite', () => {
  it('inserts the Pokémon with bound values', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(1700000000000);

    await addFavorite({ id: 25, name: 'pikachu' });

    expect(mockRunAsync).toHaveBeenCalledWith(
      'INSERT OR REPLACE INTO favorites (id, name, created_at) VALUES (?, ?, ?)',
      25,
      'pikachu',
      1700000000000,
    );
  });

  it('never writes a value into the SQL', async () => {
    await addFavorite({ id: 25, name: "farfetch'd" });

    const [sql] = mockRunAsync.mock.calls[0];
    expect(sql).not.toContain('25');
    expect(sql).not.toContain('farfetch');
  });
});

describe('removeFavorite', () => {
  it('deletes the Pokémon with a bound id', async () => {
    await removeFavorite(25);

    expect(mockRunAsync).toHaveBeenCalledWith('DELETE FROM favorites WHERE id = ?', 25);
  });
});

describe('getDatabase', () => {
  beforeEach(() => {
    mockOpenDatabaseAsync.mockResolvedValue({ getFirstAsync: mockGetFirstAsync, execAsync: mockExecAsync });
  });

  it('creates the favourites table on the first launch', async () => {
    mockGetFirstAsync.mockResolvedValueOnce({ user_version: 0 });

    await loadRealGetDatabase()();

    expect(mockOpenDatabaseAsync).toHaveBeenCalledWith('pokedex.db');
    expect(mockExecAsync).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE IF NOT EXISTS favorites'));
    expect(mockExecAsync).toHaveBeenCalledWith('PRAGMA user_version = 1');
  });

  it('keeps the existing table on the next launches', async () => {
    mockGetFirstAsync.mockResolvedValueOnce({ user_version: 1 });

    await loadRealGetDatabase()();

    expect(mockExecAsync).not.toHaveBeenCalled();
  });

  it('opens the database only once', async () => {
    mockGetFirstAsync.mockResolvedValue({ user_version: 1 });
    const getDatabase = loadRealGetDatabase();

    const [first, second] = await Promise.all([getDatabase(), getDatabase()]);

    expect(first).toBe(second);
    expect(mockOpenDatabaseAsync).toHaveBeenCalledTimes(1);
  });

  it('tries again after a failed open', async () => {
    mockOpenDatabaseAsync.mockRejectedValueOnce(new Error('disk full'));
    mockGetFirstAsync.mockResolvedValue({ user_version: 1 });
    const getDatabase = loadRealGetDatabase();

    await expect(getDatabase()).rejects.toThrow('disk full');
    await expect(getDatabase()).resolves.toBeDefined();
    expect(mockOpenDatabaseAsync).toHaveBeenCalledTimes(2);
  });
});
