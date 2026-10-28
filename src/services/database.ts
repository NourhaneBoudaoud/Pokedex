import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';

const DATABASE_NAME = 'pokedex.db';
// Raise this and add a step in migrate() when the schema changes.
const SCHEMA_VERSION = 1;

async function migrate(db: SQLiteDatabase) {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const version = row?.user_version ?? 0;
  if (version >= SCHEMA_VERSION) {
    return;
  }
  if (version < 1) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        created_at INTEGER NOT NULL
      );
    `);
  }
  await db.execAsync(`PRAGMA user_version = ${SCHEMA_VERSION}`);
}

let database: Promise<SQLiteDatabase> | null = null;

// The one database. Opened and migrated on first use, then the same connection for the whole app.
export function getDatabase(): Promise<SQLiteDatabase> {
  if (!database) {
    database = openDatabaseAsync(DATABASE_NAME).then(async (db) => {
      await migrate(db);
      return db;
    });
    // A failed open is not kept, so the next call (Retry) tries again.
    database.catch(() => {
      database = null;
    });
  }
  return database;
}
