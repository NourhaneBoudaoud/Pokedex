import { getDatabase } from '@/services/database';
import type { PokemonSummary } from '@/services/pokemon';

// Every favourites query. Values are always bound with ?, never written into the SQL.

export async function getFavorites(): Promise<PokemonSummary[]> {
  const db = await getDatabase();
  return db.getAllAsync<PokemonSummary>('SELECT id, name FROM favorites ORDER BY created_at DESC');
}

export async function addFavorite(pokemon: PokemonSummary): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    'INSERT OR REPLACE INTO favorites (id, name, created_at) VALUES (?, ?, ?)',
    pokemon.id,
    pokemon.name,
    Date.now(),
  );
}

export async function removeFavorite(id: number): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM favorites WHERE id = ?', id);
}
