# Favorites

## Goal

Keep the Pokémon I like on their own screen, still there after I close the app.

## Constraints

- Screen `src/app/(tabs)/favorites.tsx`, second bottom tab.
- SQLite with `expo-sqlite`: table `favorites (id INTEGER PRIMARY KEY, name TEXT NOT NULL, created_at INTEGER NOT NULL)`.
  One database, opened in `src/services/database.ts`. SQL only in `src/services/`.
- Read and write through TanStack Query (`useQuery` + `useMutation`), invalidating the favorites queries after a write.
- Haptic feedback (`expo-haptics`) on every add or remove.
- Reuse the list card. Design: `docs/design/Favorites.png`, `Detail-1.png` (filled heart).

## Acceptance Criteria

- [ ] The heart on the detail screen adds or removes the Pokémon; filled `favorite` red when it is a favourite.
- [ ] The card menu shows "Add to favorites" or "Remove from favorites" and does it.
- [ ] Each add or remove gives a light haptic.
- [ ] "My favorites" shows the favourites as cards, newest first; tapping one opens its detail.
- [ ] No favourites shows an empty state: "No favorites yet" and a hint to tap the heart.
- [ ] After closing and reopening the app, the favourites are still there.

## Out of Scope

- Reordering, folders or notes.
- Sync between devices.
- Storing API data for offline use.
