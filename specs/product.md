# Pokédex

A mobile Pokédex for Pokémon fans: browse every Pokémon, find one by name, read its stats and evolutions,
keep favourites and compare two side by side. Runs on the public [PokeAPI](https://pokeapi.co/docs/v2) and
follows the course Figma design (see [design.md](./design.md)).

## Core action

Look up a Pokémon.

## Features

1. [Browse the list](./features/list.md)
2. [Search by name](./features/search.md)
3. [Pokémon detail](./features/detail.md)
4. [Favorites](./features/favorites.md)
5. [Compare two Pokémon](./features/compare.md)

## Data

- **API**: PokeAPI, `https://pokeapi.co/api/v2`. No key, no login.
- **Endpoints**:
  - `GET /pokemon?limit=20&offset=N`: the list, page by page.
  - `GET /pokemon?limit=100000`: every name and URL at once, for search.
  - `GET /pokemon/{id}`: types, stats, height, weight, base experience, abilities, artwork.
  - `GET /pokemon-species/{id}`: link to the evolution chain.
  - `GET /evolution-chain/{id}`: the chain.
  - Sprites come from the PokeAPI sprites repo: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`.
- **Stored on the phone**: table `favorites` with `id INTEGER PRIMARY KEY` (Pokémon id), `name TEXT NOT NULL`,
  `created_at INTEGER NOT NULL` (ms timestamp, newest first).

## Technical choices

- **Stored in SQLite**: the favourites (id and name). Alternative: cache the whole API response in SQLite.
  Why not: TanStack Query already caches API data during a session; what has to survive a restart is the
  user's own choice, and id + name is enough to draw a card (the sprite URL is built from the id).
- **Native feature**: haptics (`expo-haptics`) when a favourite is added or removed, on the detail heart and in
  the card menu. Alternative: Share. The design also has Share in the card menu, so it is built too
  (`Share` from React Native), but haptics is the one the spec relies on.

## Technical core

- [ ] Runs in Expo Go
- [ ] Live data through TanStack Query
- [ ] At least 2 screens with Expo Router
- [ ] Something in SQLite that survives a restart
- [ ] Loading and error state on every load
- [ ] One native feature: haptics on favourite toggle (detail and card menu)
- [ ] TypeScript and ESLint without errors
- [ ] UI, data and logic in separate files

## Optional

- [ ] Pagination: the list loads 20 at a time while you scroll
- [ ] Clean TypeScript: no `any`, no `as` casts, no `@ts-ignore` (enforced by ESLint)
- [ ] No warnings: no `console.log` (enforced by ESLint), none in the terminal or on screen
- [ ] Three different Reanimated animations, each with a purpose
- [ ] Tests: one per feature on the logic, `npm test` passes
- [ ] CI: lint and tsc on every push

## Out of scope

- Accounts, sync between devices.
- A web version.
- Any API other than PokeAPI.
- Languages other than English.
- Moves, items, locations, games.
