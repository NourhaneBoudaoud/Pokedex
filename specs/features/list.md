# Browse the list

## Goal

Scroll through every Pokémon in a two-column grid, as in the design, so I can spot one and open it.

## Constraints

- Home screen, `src/app/(tabs)/index.tsx`, inside bottom tabs Pokémons / Favorites (`src/app/(tabs)/_layout.tsx`).
- `GET /pokemon?limit=20&offset=N` with `useInfiniteQuery`: the next page loads when the end of the list is near.
  The id comes from the `url` field; the sprite URL is built from the id. No extra request per card.
- One shared card component in `src/components/` (search and favorites reuse it).
- Colours, spacing and font from `src/constants/theme.ts`. Design: `docs/design/Home.png`, `Options.png`.
- `FlatList` with `numColumns={2}`. No new list library.

## Acceptance Criteria

- [ ] A search field at the top (placeholder "Search for Pokémon..") and the title "All Pokémon".
- [ ] Two columns of cards: number badge ("001"), sprite, name with a capital letter, ⋮ button.
- [ ] Scrolling to the bottom loads the next 20, with a small spinner at the end of the list.
- [ ] Tapping a card opens its detail.
- [ ] ⋮ opens an action sheet with "Open Pokémon" and "Share" (shares the name and its PokeAPI link) and Cancel.
- [ ] First load shows a loading state; a failure shows a message and a Retry button that refetches.

## Out of Scope

- Searching: tapping the search field only navigates to the search screen (see [search](./search.md)).
- "Add to favorites" in the menu (see [favorites](./favorites.md)).
- Filtering or sorting by type, generation or anything else.
- Pull to refresh.
